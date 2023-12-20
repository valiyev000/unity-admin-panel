import { memo, useState, useContext, useRef, useEffect } from 'react'
import styles from './styles/ConversationInput.module.scss'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaBold, FaItalic } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function ConversationInput({ documentData, setDocumentData }) {

    const { theme, translation } = useContext(contextApi)
    const [newMessageData, setNewMessageData] = useState({
        isBold: false,
        isItalic: false,
        photoArr: [],
        senderIsMe: true,
        text: "",
        wasRead: false,
        //todo Mesaj gonderilen zaman serverTimeStamp ve ya new Date() isledilmelidir
    })
    const { key } = useParams()
    const sendMessageBtn = useRef(null)

    function handleInputFile(element, id) { //* elde olunan sekili base64 formatina cevirir ve ya (else vasitesile) silir

        if (element !== "delCommand" && element.target.files[0]) {

            const img = element.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(img)

            reader.onload = (e) => {
                newMessageData.photoArr.push({
                    id: Math.random(),
                    imgName: img.name,  // Accessing the name property of the File object
                    imgSize: formatFileSize(img.size),  // Accessing the size property of the File object
                    imgURL: e.target.result
                });
                setNewMessageData({ ...newMessageData })
                element.target.value = null
            };
        } else {
            newMessageData.photoArr = newMessageData.photoArr.filter(image => image.id != id)
            setNewMessageData({ ...newMessageData })
        }
    }

    function handleUserInput(type, objectKey, value = '') { //todo type--> hansi terz deyisiklik olacagini qebul edir. switch case'de ferq edir, objectKey--> state'in daxilinde hansi deyeri hansi key'e daxil edeceyini aydinlasdirir, value--> string tipli value'nu ozunde eks etdirir
        switch (type) {
            case "style":
                newMessageData[objectKey] = !newMessageData[objectKey]
                break;
            case "typing":
                newMessageData[objectKey] = value
                break;
            default:
                console.log("Something wrong on the handleUserInput func...")
                break;
        }
        setNewMessageData({ ...newMessageData })
    }

    function formatFileSize(size) {
        const kilobytes = size / 1024;
        if (kilobytes < 1024) {
            return kilobytes.toFixed(2) + " KB";
        } else {
            const megabytes = kilobytes / 1024;
            return megabytes.toFixed(2) + " MB";
        }
    }

    function getBackToInitialState() {
        setNewMessageData({
            isBold: false,
            isItalic: false,
            photoArr: [],
            senderIsMe: true,
            text: "",
            wasRead: false,
            //todo Mesaj gonderilen zaman serverTimeStamp ve ya new Date() isledilmelidir
        })
    }

    useEffect(() => { getBackToInitialState() }, [key])

    const sendMessage = async () => {
        //todo bu btnu disabled etmek lazimdi
        newMessageData.whenSent = new Date()
        documentData.modifiedTime = serverTimestamp()
        documentData.messages.unshift(newMessageData)
        try {
            // Replace 'yourCollection' and 'yourDocumentId' with your actual collection and document names
            const docRef = doc(db, 'conversations', key);
            // Update the document with the new array
            await updateDoc(docRef, documentData);
            console.log("The document updated succesfully;)")
            getBackToInitialState()
        } catch (error) {
            console.error('Error updating document:', error);
        }
    };

    return (
        <div className={styles.main}>
            <motion.div layout className={styles.textAreaBox} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 1)" }}>
                <div className={styles.actionSection} style={{ borderBottom: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid rgba(203, 203, 203, 1)" }}>
                    <div className={styles.left}>
                        <button onClick={() => handleUserInput("style", "isBold")} style={{ background: newMessageData.isBold ? "#000" : "#fff", color: newMessageData.isBold ? "#fff" : "#000", }}><FaBold /></button>
                        <button onClick={() => handleUserInput("style", "isItalic")} style={{ background: newMessageData.isItalic ? "#000" : "#fff", color: newMessageData.isItalic ? "#fff" : "#000", }}><FaItalic /></button>
                    </div>
                    <div className={styles.right}>
                        <input type="file" onInput={(e) => handleInputFile(e)} name="imgInput" id="imgInput" accept=".jpg, .jpeg, .png, .gif" />
                        <label htmlFor="imgInput"><FaPlus color='#fff' size={14} /></label>
                    </div>
                </div>
                <motion.textarea
                    layout
                    name="input"
                    id="input"
                    value={newMessageData.text}
                    onChange={(e) => handleUserInput("typing", "text", e.target.value)}
                    style={{
                        fontWeight: newMessageData.isBold ? "700" : "400",
                        fontStyle: newMessageData.isItalic ? "italic" : "normal",
                        color: theme === "dark" ? "#fff" : "#11142D"
                    }}
                >
                </motion.textarea>
                {newMessageData.photoArr.length !== 0 &&
                    <motion.div layout className={styles.imgsSection}>
                        <AnimatePresence>
                            {newMessageData.photoArr.map(image => (
                                <motion.div
                                    className={styles.imgBox}
                                    key={image.id}
                                    layoutId={image.id}
                                    initial={{
                                        opacity: 0
                                    }}
                                    animate={{
                                        opacity: 1
                                    }}
                                    exit={{
                                        opacity: 0
                                    }}
                                >
                                    <img src={image.imgURL} alt="img" />
                                    <button className={styles.deleteBtn} onClick={() => handleInputFile("delCommand", image.id)}><IoClose /></button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                }
            </motion.div>
            <button className={styles.reply} ref={sendMessageBtn} onClick={sendMessage}>{translation.send_message}</button>
        </div >
    )
}

export default memo(ConversationInput)
