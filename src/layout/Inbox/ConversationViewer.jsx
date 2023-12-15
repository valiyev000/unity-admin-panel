import { memo, useEffect, useContext, useState } from 'react'
import styles from './styles/ConversationViewer.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from '../../StateManager';
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import ConversationInput from './ConversationInput';
import { db } from '../../firebase-config';
import { doc, getDoc } from 'firebase/firestore';


function ConversationViewer() {

    const history = useHistory();
    const { key } = useParams();
    const { screenWidth, translation, theme, user } = useContext(contextApi)


    const [documentData, setDocumentData] = useState(null);

    useEffect(() => {
        // Reference to your document
        const docRef = doc(db, 'conversations', key);

        // Retrieve document data
        const fetchData = async () => {
            try {
                const docSnapshot = await getDoc(docRef);
                if (docSnapshot.exists()) {
                    // Document exists, set the data in state
                    setDocumentData(docSnapshot.data());
                } else {
                    console.log('Document does not exist!');
                    history.push('/inbox')
                }
            } catch (error) {
                console.error('Error getting document:', error);
            }
        };

        fetchData();
    }, [key]);

    useEffect(() => { console.log(documentData) }, [documentData])



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
                <button className={styles.delete}>{translation.delete}</button>
                <button className={styles.archive}>{translation.archive}</button>
            </div>
            <div className={styles.history}>
                <ConversationInput />
                {documentData && documentData.messages.map((message, index) => (
                    <motion.div
                        className={styles.message}
                        key={index}
                        layout
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                    >
                        <img className={styles.avatar} src={message.senderIsMe === true ? user.photoURL : uploadAvatarNull} alt="avatar.png" />
                        <div className={styles.inner}>
                            <div className={styles.userNameAndDate}>
                                <div className={styles.userName}>Joel Becker</div>
                                <div className={styles.date}>19:43</div>
                            </div>
                            <div className={styles.messageText}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non recusandae doloribus minima quos omnis saepe officia inventore voluptatum amet aliquid.
                            </div>
                            <div className={styles.imgs}>
                                <div className={styles.imgViewer} style={{ width: screenWidth > 1200 ? "45%" : "100%", background: theme === "dark" ? "rgba(255,255,255,0.1)" : "	rgba(207,200,255,0.5)" }}>
                                    <img src={uploadAvatarNull} alt="uploadedimg" />
                                    <div className={styles.description}>
                                        <div className={styles.imgName} style={{ color: theme === "dark" ? "#fff" : "#5F7EEE" }}>Attachment.png</div>
                                        <div className={styles.imgSize} style={{ color: theme === "dark" ? "#fff" : "#11142D" }}>3.6Mb</div>
                                    </div>
                                </div>
                                <div className={styles.imgViewer} style={{ width: screenWidth > 1200 ? "45%" : "100%", background: theme === "dark" ? "rgba(255,255,255,0.1)" : "	rgba(207,200,255,0.5)" }}>
                                    <img src={uploadAvatarNull} alt="uploadedimg" />
                                    <div className={styles.description}>
                                        <div className={styles.imgName} style={{ color: theme === "dark" ? "#fff" : "#5F7EEE" }}>Attachment.png</div>
                                        <div className={styles.imgSize} style={{ color: theme === "dark" ? "#fff" : "#11142D" }}>3.6Mb</div>
                                    </div>
                                </div>
                                <div className={styles.imgViewer} style={{ width: screenWidth > 1200 ? "45%" : "100%", background: theme === "dark" ? "rgba(255,255,255,0.1)" : "	rgba(207,200,255,0.5)" }}>
                                    <img src={uploadAvatarNull} alt="uploadedimg" />
                                    <div className={styles.description}>
                                        <div className={styles.imgName} style={{ color: theme === "dark" ? "#fff" : "#5F7EEE" }}>Attachment.png</div>
                                        <div className={styles.imgSize} style={{ color: theme === "dark" ? "#fff" : "#11142D" }}>3.6Mb</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))
                }
            </div>

        </motion.div>
    )
}

export default memo(ConversationViewer)

