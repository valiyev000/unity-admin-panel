import { memo } from 'react'
import styles from './styles/ConversationViewer.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react';
import contextApi from '../../StateManager';
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import ConversationInput from './ConversationInput';


function ConversationViewer() {

    const history = useHistory();
    const { key } = useParams();
    const { screenWidth, translation, theme } = useContext(contextApi)

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
                <div className={styles.message}>
                    <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
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
                </div>
                <div className={styles.message}>
                    <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
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
                </div>
                <div className={styles.message}>
                    <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
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
                </div>
            </div>

        </motion.div>
    )
}

export default memo(ConversationViewer)

