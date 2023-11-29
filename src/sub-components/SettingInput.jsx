import { useContext, useState } from "react"
import { memo } from "react"
import contextApi from "../StateManager"
import UseAnimations from "react-useanimations";
import visibility from 'react-useanimations/lib/visibility';

function SettingInput({ styles, objectKey, label, formData, setFormData, password, setPassword, email, setEmail, isPassword, disabled }) {

    const { theme, translation } = useContext(contextApi)
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className={styles.inputBox}>
            <label className={styles.label} htmlFor={objectKey ? objectKey : null}>{translation[label]}</label>
            <div className={styles.inputRelative}>
                <input
                    type={isPassword && !isVisible ? "password" : "text"}
                    name={objectKey ? objectKey : null}
                    id={objectKey ? objectKey : null}
                    disabled={disabled ? true : false}
                    onFocus={(e) => {
                        e.target.style.background = "transparent"
                        e.target.style.border = "2px solid #6C5DD3"
                    }}
                    onBlur={(e) => {
                        e.target.style.background = theme === "dark" ? "#E4E4E41A" : "#E4E4E4"
                        e.target.style.border = "2px solid transparent"
                    }}
                    style={{ background: theme === "dark" ? "#E4E4E41A" : "#E4E4E4", color: theme === "dark" ? "#fff" : "#11142D" }}
                    value={objectKey === "password" ? password : objectKey === "email" ? email : formData[objectKey]}
                    onChange={(e) => {
                        if (objectKey === "password") {
                            setPassword(e.target.value)
                        } else if (objectKey === "email") {
                            setEmail(e.target.value)
                        } else {
                            setFormData(prev => ({ ...prev, [objectKey]: e.target.value }))
                        }
                    }}
                    placeholder={objectKey === "password" ? "Type here if you wanna update the password" : "You can type me ;)"}
                />
                {isPassword && <div className={styles.icon} onClick={() => setIsVisible(!isVisible)}>
                    <UseAnimations animation={visibility} reverse={!isVisible} strokeColor={theme === "dark" ? "#fff" : "#000"} />
                </div>}
            </div>
        </div>
    )
}

export default memo(SettingInput)