import { useContext, memo } from "react"
import contextApi from "../StateManager"
import { motion, useDragControls } from 'framer-motion'
import { IoClose } from "react-icons/io5"
import uploadAvatarNull from '../images/uploadAvatarNull.png'
import SettingInput from "./SettingInput"
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading';

function DragSetting({ styles, formData, setFormData, handleInputFile, handleLogOut, handleUpdate, updateText, password, setPassword, email, setEmail }) {

    const { setIsSettingOpen, theme, translation, screenWidth } = useContext(contextApi)
    const controls = useDragControls()
    // console.log(formData)
    return (
        <motion.div
            className={styles.background}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setIsSettingOpen(false)}
        >
            <motion.div
                className={styles.content}
                initial={{ top: "60%", opacity: 0, background: theme === "dark" ? "#242731" : "#fff", color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}
                animate={{ top: "15%", opacity: 1, background: theme === "dark" ? "#242731" : "#fff", color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}
                exit={{ top: "100%", opacity: 0, background: theme === "dark" ? "#242731" : "#fff", color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}
                transition={{ type: "spring", stiffness: 50 }}
                dragSnapToOrigin="true"
                drag="y"
                dragConstraints={{ top: 0 }} //todo content'in yuxari qaldirilmasinin qarsisini alir
                dragElastic={0.1}
                onDragEnd={(event, info) => event.clientY / document.documentElement.clientHeight > 0.5 ? setIsSettingOpen(false) : null}
                onMouseDown={(e) => e.stopPropagation()}
                dragControls={controls} //todo Bu islemedi((( onDrag onPointerDown onTouch ve s. controls nan biryerde hec bir formada alinmadi
                dragListener={true}
            >
                <div className={styles.contentInner}>
                    <motion.div className={styles.headerBar} layout>
                        <motion.div className={styles.header} layout>{translation.account_setting}</motion.div>
                        <div className={styles.buttonDiv} style={{ boxShadow: theme === "dark" ? "-3px 6px 11px -2px rgba(8,8,8,1)" : "-3px 6px 11px -2px rgba(219,219,219,1)" }} onClick={() => setIsSettingOpen(false)}><IoClose size={22} /></div>
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
                                <div className={styles.avatarSection} style={{ borderBottom: theme === "light" ? "2px solid #E4E4E4" : "2px solid #E4E4E41A", height: screenWidth < 480 ? "230px" : "161px"}}>
                                    <div className={styles.top} style={{gap: screenWidth < 480 ? "0px" : "40px"}}>
                                        <motion.div className={styles.preview} style={{ alignItems: screenWidth < 480 ? "flex-start" : "center" }}>
                                            <div className={styles.yourAvatar}>{translation.your_avatar}</div>
                                            <div className={styles.imgBox} style={{ height: screenWidth < 480 ? "80px" : "64px", width: screenWidth < 480 ? "80px" : "64px", }}>
                                                <img src={formData.avatar ? formData.avatar : uploadAvatarNull} alt="avatar.png" />
                                            </div>
                                        </motion.div>
                                        <div className={styles.actionBtnSection} style={{marginTop: screenWidth > 480 ? "40px" : "0px"}}>
                                            <div className={styles.btnsSection} style={{flexDirection: screenWidth < 480 ? "column" : "row", gap: screenWidth < 480 ? "0px" : "17px", marginTop: screenWidth < 480 ? "42px" : "0px"}}>
                                                <input type="file" name="avatarUploader" id="avatarUploader" onChange={(e) => handleInputFile(e)} />
                                                <label htmlFor="avatarUploader" style={{width: screenWidth < 480 ? "166px" : "166px", height: screenWidth < 480 ? "40px" : "40px"}}>{translation.upload_new}</label>
                                                <button onClick={() => handleInputFile("delCommand")}>{translation.delete_avatar}</button>
                                            </div>
                                            {screenWidth > 480 && <div className={styles.text}>{translation.avatar_help_your_teammates_recognize_you_in_unity}</div>}
                                        </div>
                                    </div>
                                    {screenWidth < 480 &&
                                        <div className={styles.bottom}>
                                            <div className={styles.text}>{translation.avatar_help_your_teammates_recognize_you_in_unity}</div>
                                        </div>
                                    }
                                </div>
                                <div className={styles.gridContainer} data-width={screenWidth < 480 ? "phone" : "tablet"} >
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
                </div>
                <div className={styles.absolute}>
                    <div className={styles.absoluteInner}></div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default memo(DragSetting)