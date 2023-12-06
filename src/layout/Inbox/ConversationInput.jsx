import { memo } from 'react'
import styles from './styles/ConversationInput.module.scss'
import { useContext } from 'react'
import contextApi from '../../StateManager'
import { useState } from 'react'
import { useEffect } from 'react'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaBold, FaItalic } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function ConversationInput() {

    const { theme } = useContext(contextApi)
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [inputValue, setInputValue] = useState("")

    // useEffect(() => {
    //     console.log(inputValue)
    // }, [inputValue])

    return (
        <div className={styles.main}>
            <div className={styles.textAreaBox} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 1)" }}>
                <div className={styles.actionSection}>
                    <div className={styles.left}>
                        <button onClick={() => setBold(prev => !prev)} style={{ background: bold ? "#000" : "#fff", color: bold ? "#fff" : "#000", }}><FaBold /></button>
                        <button onClick={() => setItalic(prev => !prev)} style={{ background: italic ? "#000" : "#fff", color: italic ? "#fff" : "#000", }}><FaItalic /></button>
                    </div>
                    <div className={styles.right}>
                        <FaPlus />
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
                {/* <img src={uploadAvatarNull} alt="" /> */}
            </div>
            <div className={styles.reply}>Reply</div>
        </div >
    )
}

export default memo(ConversationInput)
