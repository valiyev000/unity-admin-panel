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


function NotificationList({ data }) {

    const { theme, screenWidth, translation } = useContext(contextApi)

    function stringLimiter(str) {
        if (str.length > 14) {
            return `${str.slice(0,14)}...`
        } else {
            return str
        }
    }

    console.log(data)

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
        >
            <motion.div layout className={styles.title}>{translation.recent_notification}</motion.div>
            <motion.ul>
                {data.map(noti => (
                    <motion.li 
                    className={`${theme === "dark" ? styles.dark : ""}`}
                    layout 
                    key={noti.key} 
                    initial={{
                        opacity: 0,
                        transform: "translateY(10px)"
                    }}
                    animate={{
                        opacity: 1,
                        transform: "translateY(0px)"
                    }}
                    >
                        {console.log(noti.data)}
                        <div className={styles.left}>
                            <div className={styles.imgSection}>
                                <img className={styles.avatar} src={noti.data.userAvatar ? noti.data.userAvatar : uploadAvatarNull} alt="avatar.png" />
                                <img className={styles.positionAbs} src={noti.data.notiType === "purchase" ? purchaseIcon : noti.data.notiType === "comment" ? commentIcon : likeIcon} alt="tinyBlockAlt" />
                            </div>
                            <div className={styles.mainSection}>
                                <div className={styles.userNameAndSurname}>{noti.data.username}</div>
                                <div className={styles.aboutType}> <span className={styles.type}>{noti.data.notiType === "purchase" ? translation.purchased : noti.data.notiType === "comment" ? translation.commented_on : translation.liked}</span> <span className={styles.productName}>{stringLimiter(noti.data.productName)}</span> <span className={styles.whenCome}>11h</span></div>
                                <div className={styles.innerText}>{noti.data.text}</div>
                                <div className={styles.btnsSection}>
                                    <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidLike color={noti.data.reaction === true ? "rgb(49, 139, 255)" : "rgb(128, 129, 145)"} size={20} /></button>
                                    <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidDislike color={noti.data.reaction === false ? "rgb(233, 75, 75)" : "rgb(128, 129, 145)"} size={20} /></button>
                                    <button style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><MdDelete color={'rgb(128, 129, 145)'} size={20} /></button>
                                </div>
                            </div>
                        </div>
                        {screenWidth > 480 && noti.data.productImage &&
                            <motion.div layout className={styles.imgSectionBg}>
                                <img className={styles.productImage} src={noti.data.productImage} alt="notiImgAlt" />
                            </motion.div>
                        }
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    )
}

export default memo(NotificationList)