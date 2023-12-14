import { memo, useState, useContext, useRef } from 'react'
import styles from './styles/ConversationInput.module.scss'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaBold, FaItalic } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase-config';

function ConversationInput() {

    const { theme, translation } = useContext(contextApi)
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

    return (
        <div className={styles.main}>
            <div className={styles.textAreaBox} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 1)" }}>
                <div className={styles.actionSection} style={{ borderBottom: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid rgba(203, 203, 203, 1)" }}>
                    <div className={styles.left}>
                        <button onClick={() => setBold(prev => !prev)} style={{ background: bold ? "#000" : "#fff", color: bold ? "#fff" : "#000", }}><FaBold /></button>
                        <button onClick={() => setItalic(prev => !prev)} style={{ background: italic ? "#000" : "#fff", color: italic ? "#fff" : "#000", }}><FaItalic /></button>
                    </div>
                    <div className={styles.right}>
                        <input type="file" onChange={(e) => handleInputFile(e)} name="imgInput" id="imgInput" accept=".jpg, .jpeg, .png, .gif" />
                        <label htmlFor="imgInput"><FaPlus color='#fff' size={14} /></label>
                    </div>
                </div>
                <textarea
                    name="input"
                    id="input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    style={{
                        fontWeight: bold ? "700" : "400",
                        fontStyle: italic ? "italic" : "normal"
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
