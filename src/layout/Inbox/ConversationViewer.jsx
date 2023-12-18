import { memo, useEffect, useContext, useState } from 'react'
import styles from './styles/ConversationViewer.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from '../../StateManager';
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import ConversationInput from './ConversationInput';
import { db } from '../../firebase-config';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';



function ConversationViewer() {

    const history = useHistory();
    const { key } = useParams();
    const { screenWidth, translation, theme, user } = useContext(contextApi)

    const [documentData, setDocumentData] = useState(null);

    useEffect(() => {
        // Reference to your document
        const docRef = doc(db, 'conversations', key);

        // Function to handle document changes
        const handleSnapshot = (docSnapshot) => {
            if (docSnapshot.exists()) {
                // Document exists, set the data in state
                setDocumentData(docSnapshot.data());
            } else {
                console.log('Document does not exist!');
                history.push('/inbox');
            }
        };

        // Add onSnapshot listener
        const unsubscribe = onSnapshot(docRef, handleSnapshot);

        // Cleanup the listener when component unmounts or key changes
        return () => unsubscribe();

        // Run this effect only when the 'key' changes
    }, [key]);

    const formatTime = (timestamp) => {
        let formattedTime = ""
        if (timestamp) {
            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
            // Extract hours and minutes
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            // Combine hours and minutes
            formattedTime = `${hours}:${minutes}`;
        }
        return formattedTime;
    };

    const handleDelete = async () => {
        try {
            setOpenMoreOptionMenuIndex(null)

            const documentId = key;
            const documentRef = doc(db, 'conversations', documentId);

            // Delete the document
            await deleteDoc(documentRef);

            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
    };

    const handleArchived = async (isArchived) => {

        const documentId = key;
        const documentRef = doc(db, 'conversations', documentId);

        try {
            await updateDoc(documentRef, {
                isArchived: !isArchived,
            });

            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    }

    return (
        <motion.div
            className={styles.viewerMain}
            initial={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                height: screenWidth > 480 ? "80vh" : "80vh",
                maxHeight: screenWidth > 480 ? "500px" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
                opacity: 0,
                transform: "scale(1.2)",
            }}
            animate={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                height: screenWidth > 480 ? "80vh" : "80vh",
                maxHeight: screenWidth > 480 ? "500px" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
                opacity: 1,
                transform: "scale(1)",
            }}
        >
            <div className={styles.goBack} onClick={() => history.push('/inbox')}><IoMdArrowRoundBack size={24} /></div>
            <div className={styles.actionBtns}>
                <button className={styles.delete} onClick={handleDelete}>{translation.delete}</button>
                <button className={styles.archive} onClick={()=>handleArchived(documentData?.isArchived)} disabled={documentData?.isArchived}>{translation.archive}</button>
            </div>
            <motion.div className={styles.history} layout>
                <ConversationInput documentData={documentData} setDocumentData={setDocumentData} />
                {documentData && documentData.messages.map((message, index) => (
                    <motion.div
                        className={styles.message}
                        key={index}
                        layoutId={index}
                        initial={{ // motion islemedi. Animationlar olmadi. flex direction column-reverse oldugundan qaynaglana biler
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1,
                        }}
                    >
                        <img className={styles.avatar} src={message.senderIsMe && user.photoURL ? user.photoURL : !message.senderIsMe && documentData.userAvatar ? documentData.userAvatar : uploadAvatarNull} alt="avatar.png" />
                        <div className={styles.inner}>
                            <div className={styles.userNameAndDate}>
                                <div className={styles.userName}>{message.senderIsMe ? user.displayName : documentData.userName}</div>
                                <div className={styles.date}>{formatTime(message.whenSent)}</div>
                            </div>
                            <div className={styles.messageText} style={{ fontWeight: message.isBold ? 700 : 400, fontStyle: message.isItalic ? "italic" : "unset" }}>{message.text}</div>
                            <div className={styles.imgs}>
                                {message.photoArr.length !== 0 && message.photoArr.map((photo, index) => (
                                    <div key={index} className={styles.imgViewer} style={{ width: screenWidth > 1200 ? "45%" : "100%", background: theme === "dark" ? "rgba(255,255,255,0.1)" : "	rgba(207,200,255,0.5)" }}>
                                        <img src={photo.imgURL} alt="uploadedimg" />
                                        <div className={styles.description}>
                                            <div className={styles.imgName} style={{ color: theme === "dark" ? "#fff" : "#5F7EEE" }}>{photo.imgName.length > 12 ? `${photo.imgName.slice(0, 12)}...` : photo.imgName}</div>
                                            <div className={styles.imgSize} style={{ color: theme === "dark" ? "#fff" : "#11142D" }}>{photo.imgSize}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))
                }
            </motion.div>

        </motion.div>
    )
}

export default memo(ConversationViewer)

