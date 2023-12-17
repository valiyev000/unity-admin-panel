import { memo, useState, useContext, useRef, useEffect } from 'react'
import styles from './styles/ConversationInput.module.scss'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaBold, FaItalic } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase-config';

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
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const sendMessageBtn = useRef(null)

    function handleInputFile(e) { //* elde olunan sekili base64 formatina cevirir ve ya (else vasitesile) silir

        if (e !== "delCommand" && e.target.files[0]) {

            const img = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(img)

            reader.onload = (e) => {
                formData.avatar = e.target.result
                setFormData({ ...formData })
            };

        } else {
            setFormData({ ...formData, avatar: null })
        }

    }

    function handleUserInput(type, objectKey, value='') { //todo type--> hansi terz deyisiklik olacagini qebul edir. switch case'de ferq edir, objectKey--> state'in daxilinde hansi deyeri hansi key'e daxil edeceyini aydinlasdirir, value--> string tipli value'nu ozunde eks etdirir
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
        setNewMessageData({...newMessageData})
    }

    // useEffect(()=>{console.log(newMessageData)},[newMessageData])

    return (
        <div className={styles.main}>
            <div className={styles.textAreaBox} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 1)" }}>
                <div className={styles.actionSection} style={{ borderBottom: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid rgba(203, 203, 203, 1)" }}>
                    <div className={styles.left}>
                        <button onClick={() => handleUserInput("style","isBold")} style={{ background: newMessageData.isBold ? "#000" : "#fff", color: newMessageData.isBold ? "#fff" : "#000", }}><FaBold /></button>
                        <button onClick={() => handleUserInput("style","isItalic")} style={{ background: newMessageData.isItalic ? "#000" : "#fff", color: newMessageData.isItalic ? "#fff" : "#000", }}><FaItalic /></button>
                    </div>
                    <div className={styles.right}>
                        <input type="file" onChange={(e) => handleInputFile(e)} name="imgInput" id="imgInput" accept=".jpg, .jpeg, .png, .gif" />
                        <label htmlFor="imgInput"><FaPlus color='#fff' size={14} /></label>
                    </div>
                </div>
                <textarea
                    name="input"
                    id="input"
                    value={newMessageData.text}
                    onChange={(e) => handleUserInput("typing", "text", e.target.value)}
                    style={{
                        fontWeight: newMessageData.isBold ? "700" : "400",
                        fontStyle: newMessageData.isItalic ? "italic" : "normal"
                    }}
                >
                </textarea>
                {false &&
                    <div className={styles.imgsSection}>
                        <div className={styles.imgBox}>
                            <img src={uploadAvatarNull} alt="img" />
                            <button className={styles.deleteBtn}><IoClose /></button>
                        </div>
                        <div className={styles.imgBox}>
                            <img src={uploadAvatarNull} alt="img" />
                            <button className={styles.deleteBtn}><IoClose /></button>
                        </div>
                    </div>
                }
            </div>
            <button className={styles.reply} ref={sendMessageBtn}>{translation.send_message}</button>
        </div >
    )
}

export default memo(ConversationInput)
