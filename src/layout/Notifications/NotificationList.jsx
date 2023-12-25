import { memo, useContext } from 'react'
import styles from './styles/NotificationList.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'


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
                    <div className={styles.imgSection}>
                        <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
                        <img className={styles.positionAbs} src="https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png" alt="tinyBlockAlt" />
                    </div>
                    <div className={styles.mainSection}>
                        <div className={styles.userNameAndSurname}>Glenn Grerr</div>
                        <div className={styles.aboutType}>
                            <div className={styles.type}>Commented on</div>
                            <div className={styles.productName}>Collab</div>
                            <div className={styles.whenCome}>11h</div>
                        </div>
                        <div className={styles.innerText}>"Love this so much! What tools do you use to create your 3d illustrations?"</div>
                        <div className={styles.btnsSection}>
                            <button>L</button>
                            <button>D</button>
                            <button>Del</button>
                        </div>
                    </div>
                    <div className={styles.imgSectionBg}>
                        <img className={styles.avatar} src={uploadAvatarNull} alt="notiImgAlt" />
                    </div>
                </li>
                <li>
                    <div className={styles.imgSection}>
                        <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
                        <div className={styles.positionAbs}>img</div>
                    </div>
                    <div className={styles.mainSection}>
                        <div className={styles.userNameAndSurname}>Glenn Grerr</div>
                        <div className={styles.aboutType}>
                            <div className={styles.type}>Commented on</div>
                            <div className={styles.productName}>Collab</div>
                            <div className={styles.whenCome}>11h</div>
                        </div>
                        <div className={styles.innerText}>"Love this so much! What tools do you use to create your 3d illustrations?"</div>
                        <div className={styles.btnsSection}>
                            <button>L</button>
                            <button>D</button>
                            <button>Del</button>
                        </div>
                    </div>
                    <div className={styles.imgSectionBg}>
                        <img src={uploadAvatarNull} alt="notiImgAlt" />
                    </div>
                </li>
            </ul>
        </motion.div>
    )
}

export default memo(NotificationList)