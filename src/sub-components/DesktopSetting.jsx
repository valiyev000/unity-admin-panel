import { memo, useContext } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose } from "react-icons/io5"
import contextApi from "../StateManager"
import uploadAvatarNull from '../images/uploadAvatarNull.png'
import SettingInput from "./SettingInput"
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';


function DesktopSetting({ styles, formData, setFormData, handleInputFile, handleLogOut, handleUpdate, updateText, email, setEmail, password, setPassword }) {

    const { isSettingOpen, setIsSettingOpen, translation, theme } = useContext(contextApi)

    return (
        <motion.div
            className={styles.backgroundDesktop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setIsSettingOpen(false)}
        >
            <AnimatePresence>
                {isSettingOpen &&
                    <motion.div
                        className={styles.content}
                        initial={{ transform: "scale(1.2)", opacity: 0, background: theme === "dark" ? "#242731" : "#fff", color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}
                        animate={{ transform: "scale(1.0)", opacity: 1, background: theme === "dark" ? "#242731" : "#fff", color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}
                        exit={{ transform: "scale(1.2)", opacity: 0, background: theme === "dark" ? "#242731" : "#fff", color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <motion.div className={styles.headerBar} layout>
                            <motion.div className={styles.header} layout>{translation.account_setting}</motion.div>
                            <div className={styles.buttonDiv} style={{ boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)" }} onClick={() => setIsSettingOpen(false)}><IoClose size={22} /></div>
                        </motion.div>
                        {formData ?
                            <div className={styles.wrapperForAnimation}>
                                <motion.div
                                    className={styles.innerContent}
                                    initial={{
                                        transform: "translateY(150px)",
                                    }}
                                    animate={{
                                        transform: "translateY(0px)",
                                    }}
                                >
                                    <div className={styles.avatarSection} style={{ borderBottom: theme === "light" ? "2px solid #E4E4E4" : "2px solid #E4E4E41A" }}>
                                        <motion.div className={styles.preview}>
                                            <div className={styles.yourAvatar}>{translation.your_avatar}</div>
                                            <div className={styles.imgBox}>
                                                <img src={formData.avatar ? formData.avatar : uploadAvatarNull} alt="avatar.png" />
                                            </div>
                                        </motion.div>
                                        <div className={styles.actionBtnSection}>
                                            <div className={styles.btnsSection}>
                                                <input type="file" name="avatarUploader" id="avatarUploader" onChange={(e) => handleInputFile(e)} />
                                                <label htmlFor="avatarUploader">{translation.upload_new}</label>
                                                <button onClick={() => handleInputFile("delCommand")}>{translation.delete_avatar}</button>
                                            </div>
                                            <div className={styles.text}>{translation.avatar_help_your_teammates_recognize_you_in_unity}</div>
                                        </div>
                                    </div>
                                    <div className={styles.gridContainer}>
                                    <SettingInput
                                        styles={styles}
                                        label={"your_full_name"}
                                        objectKey={"fullName"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                    <SettingInput
                                        styles={styles}
                                        label={"display_name"}
                                        objectKey={"displayName"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                    <SettingInput
                                        styles={styles}
                                        label={"role"}
                                        objectKey={"role"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                    <SettingInput
                                        styles={styles}
                                        label={"location"}
                                        objectKey={"location"}
                                        formData={formData}
                                        setFormData={setFormData}
                                    />
                                    <SettingInput
                                        styles={styles}
                                        label={"email"}
                                        objectKey={"email"}
                                        formData={formData}
                                        setFormData={setFormData}
                                        email={email}
                                        setEmail={setEmail}
                                        disabled={true}
                                    />
                                    <SettingInput
                                        styles={styles}
                                        label={"password"}
                                        objectKey={"password"}
                                        formData={formData}
                                        setFormData={setFormData}
                                        password={password}
                                        setPassword={setPassword}
                                        isPassword={true}
                                    />
                                        <div className={`${styles.inputBox} ${styles.textAreaBox}`}>
                                            <label className={styles.label} htmlFor="bio">{translation.bio}</label>
                                            <div className={styles.inputRelative}>
                                                <textarea
                                                    className={styles.input}
                                                    name="bio"
                                                    id="bio"
                                                    cols="30"
                                                    rows="10"
                                                    onFocus={(e) => {
                                                        e.target.style.background = "transparent"
                                                        e.target.style.border = "2px solid #6C5DD3"
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.background = theme === "dark" ? "#E4E4E41A" : "#E4E4E4"
                                                        e.target.style.border = "2px solid transparent"
                                                    }}
                                                    style={{ background: theme === "dark" ? "#E4E4E41A" : "#E4E4E4", color: theme === "dark" ? "#fff" : "#11142D" }}
                                                    value={formData.bio}
                                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className={styles.btnSection}>
                                            <motion.button layout onClick={(handleUpdate)}>{translation[updateText]}</motion.button>
                                            <button onClick={handleLogOut}>{translation.log_out}</button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            : <motion.div className={styles.loading}>
                                <UseAnimations animation={loading} strokeColor={theme === "dark" ? "#fff" : "#000"} size={56} />
                            </motion.div>
                        }
                    </motion.div>
                }
            </AnimatePresence >
        </motion.div >
    )
}

export default memo(DesktopSetting)