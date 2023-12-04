import { memo, useContext } from 'react'
import styles from './styles/MessageBox.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaComment, FaStar } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

function MessageBox({ selectedFilter }) {

    const { theme, translation } = useContext(contextApi)

    return (
        <motion.div
            className={styles.MessageBoxMain}
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
            }}
            exit={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
            }}
            layout
        >
            <motion.div className={styles.title} layout>
                {selectedFilter === "your_inbox" ? translation.recent_messages
                    : selectedFilter === "archives" ? translation.archives_messages
                        : selectedFilter === "done" ? translation.done_messages
                            : selectedFilter === "saved" ? translation.saved_messages : ""
                }
            </motion.div>
            <div className={styles.innerContainer}>
                <div className={styles.userBlock}>
                    <div className={styles.avatarSection}>
                        <img src={uploadAvatarNull} alt="userAvatar.png" />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.topSection}>
                            <div className={styles.userName}>Joel Becker</div>
                            <div className={styles.time}>17:43</div>
                        </div>
                        <div className={styles.middleSection}>
                            When is the Sketch version available for download?
                        </div>
                        <div className={styles.actionSection}>
                            <button><FaComment color='#1B1D21' /></button>
                            <button><FaStar color='#1B1D21' /></button>
                            <button><BsThreeDots color='#1B1D21' /></button>
                        </div>
                    </div>
                </div>
                <div className={styles.userBlock}>
                    <div className={styles.avatarSection}>
                        <img src={uploadAvatarNull} alt="userAvatar.png" />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.topSection}>
                            <div className={styles.userName}>Joel Becker</div>
                            <div className={styles.time}>17:43</div>
                        </div>
                        <div className={styles.middleSection}>
                            When is the Sketch version available for download?
                        </div>
                        <div className={styles.actionSection}>
                            <button><FaComment color='#1B1D21' /></button>
                            <button><FaStar color='#1B1D21' /></button>
                            <button><BsThreeDots color='#1B1D21' /></button>
                        </div>
                    </div>
                </div>
                <div className={styles.userBlock}>
                    <div className={styles.avatarSection}>
                        <img src={uploadAvatarNull} alt="userAvatar.png" />
                    </div>
                    <div className={styles.details}>
                        <div className={styles.topSection}>
                            <div className={styles.userName}>Joel Becker</div>
                            <div className={styles.time}>17:43</div>
                        </div>
                        <div className={styles.middleSection}>
                            When is the Sketch version available for download?
                        </div>
                        <div className={styles.actionSection}>
                            <button><FaComment color='#1B1D21' /></button>
                            <button><FaStar color='#1B1D21' /></button>
                            <button><BsThreeDots color='#1B1D21' /></button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default memo(MessageBox)