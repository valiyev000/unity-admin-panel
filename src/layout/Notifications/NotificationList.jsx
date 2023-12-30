import { memo, useContext } from 'react'
import styles from './styles/NotificationList.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import commentIcon from '../../images/commentIcon.svg'
import likeIcon from '../../images/likeIcon.svg'
import purchaseIcon from '../../images/purchaseIcon.svg'


function NotificationList() {

    const { theme, screenWidth, translation } = useContext(contextApi)

    return (
        <motion.div
            className={styles.main}
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            exit={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            layout
        >
            <motion.div layout className={styles.title}>{translation.recent_notification}</motion.div>
            <ul>
                <li>
                    <div className={styles.left}>
                        <div className={styles.imgSection}>
                            <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
                            <img className={styles.positionAbs} src={commentIcon} alt="tinyBlockAlt" />
                        </div>
                        <div className={styles.mainSection}>
                            <div className={styles.userNameAndSurname}>Glenn Grerr</div>
                            <div className={styles.aboutType}> <span className={styles.type}>Commented on</span> <span className={styles.productName}>Collab</span> <span className={styles.whenCome}>11h</span></div>
                            <div className={styles.innerText}>Love this so much! What tools do you use to create your 3d illustrations?</div>
                            <div className={styles.btnsSection}>
                                <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidLike color={theme === "dark" ? 'rgba(255,255,255,0.4)' : 'rgba(27,29,33,0.4)'} size={20} /></button>
                                <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidDislike color={theme === "dark" ? 'rgba(255,255,255,0.4)' : 'rgba(27,29,33,0.4)'} size={20} /></button>
                                <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><MdDelete color={theme === "dark" ? 'rgba(255,255,255,0.4)' : 'rgba(27,29,33,0.4)'} size={20} /></button>
                            </div>
                        </div>
                    </div>
                    {screenWidth > 480 &&
                        <motion.div layout className={styles.imgSectionBg}>
                            <img className={styles.avatar} src={uploadAvatarNull} alt="notiImgAlt" />
                        </motion.div>
                    }
                </li>
                <li>
                    <div className={styles.left}>
                        <div className={styles.imgSection}>
                            <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
                            <img className={styles.positionAbs} src={commentIcon} alt="tinyBlockAlt" />
                        </div>
                        <div className={styles.mainSection}>
                            <div className={styles.userNameAndSurname}>Glenn Grerr</div>
                            <div className={styles.aboutType}> <span className={styles.type}>Commented on</span> <span className={styles.productName}>Collab</span> <span className={styles.whenCome}>11h</span></div>
                            <div className={styles.innerText}>Love this so much! What tools do you use to create your 3d illustrations?</div>
                            <div className={styles.btnsSection}>
                                <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidLike color={theme === "dark" ? 'rgba(255,255,255,0.4)' : 'rgba(27,29,33,0.4)'} size={20} /></button>
                                <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidDislike color={theme === "dark" ? 'rgba(255,255,255,0.4)' : 'rgba(27,29,33,0.4)'} size={20} /></button>
                                <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><MdDelete color={theme === "dark" ? 'rgba(255,255,255,0.4)' : 'rgba(27,29,33,0.4)'} size={20} /></button>
                            </div>
                        </div>
                    </div>
                    {screenWidth > 480 &&
                        <motion.div layout className={styles.imgSectionBg}>
                            <img className={styles.avatar} src={uploadAvatarNull} alt="notiImgAlt" />
                        </motion.div>
                    }
                </li>
            </ul>
        </motion.div>
    )
}

export default memo(NotificationList)