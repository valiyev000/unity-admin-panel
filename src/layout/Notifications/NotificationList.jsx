import { memo, useContext, useRef, useState } from 'react'
import styles from './styles/NotificationList.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import commentIcon from '../../images/commentIcon.svg'
import likeIcon from '../../images/likeIcon.svg'
import purchaseIcon from '../../images/purchaseIcon.svg'
import { MdImage } from "react-icons/md";
import ImgViewer from '../../sub-components/ImgViewer'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase-config'
import DeleteModal from './DeleteModal'

function NotificationList({ data, setLimiter }) {

    const { theme, screenWidth, translation, isNavOpen } = useContext(contextApi)
    const [imgSrc, setImgSrc] = useState(null)
    const [isDelModalOpen, setIsDelModalOpen] = useState(false)
    const awaitingPromiseRef = useRef(null)

    function stringLimiter(str) {
        if (str.length > 14) {
            return `${str.slice(0, 14)}...`
        } else {
            return str
        }
    }

    const formatTime = (timestamp) => {
        let formattedTime = ""
        if (timestamp) {
            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
            // Extract hours and minutes
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            // Combine hours and minutes
            formattedTime = `${hours}:${minutes}`;
        }
        return formattedTime;
    };

    const handleAction = async (keyX, currentValue, userRequest) => {
        let reaction
        if (currentValue === userRequest) {
            reaction = null
        } else {
            reaction = userRequest
        }
        const documentId = keyX;
        const documentRef = doc(db, 'notifications', documentId);
        try {
            await updateDoc(documentRef, {
                reaction,
            });
            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    }

    const handleDel = async (keyX) => {
        setIsDelModalOpen(true)

        return new Promise((resolve, reject) => {
            awaitingPromiseRef.current = { resolve, reject };
        })
            .then(async (res) => {
                const documentId = keyX;
                const documentRef = doc(db, 'notifications', documentId);
                try {
                    await deleteDoc(documentRef);
                    console.log("Document deleted succesfully")
                } catch (error) {
                    console.error('Error updating document: ', error)
                }
            })
            .catch(err => console.log("Deleting operation cancelled"))
    }

    const handleConfirm = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.resolve();
        }
        setIsDelModalOpen(false);
    };

    const handleClose = () => {
        if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.reject();
        }
        setIsDelModalOpen(false);
    };

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
                {data.length !== 0 ? data.map(noti => (
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
                        <div className={styles.left}>
                            <div className={styles.imgSection}>
                                <img className={styles.avatar} src={noti.data.userAvatar ? noti.data.userAvatar : uploadAvatarNull} alt="avatar.png" />
                                <img className={styles.positionAbs} src={noti.data.notiType === "purchase" ? purchaseIcon : noti.data.notiType === "comment" ? commentIcon : likeIcon} alt="tinyBlockAlt" />
                            </div>
                            <div className={styles.mainSection}>
                                <div className={styles.userNameAndSurname}>{noti.data.username}</div>
                                <div className={styles.aboutType}>
                                    <span className={styles.type}>{noti.data.notiType === "purchase" ? translation.purchased : noti.data.notiType === "comment" ? translation.commented_on : translation.liked}</span>
                                    <Link to='/products' className={styles.productName}>{stringLimiter(noti.data.productName)}</Link>
                                    <span className={styles.whenCome}>{formatTime(noti.data.time)}</span>
                                </div>
                                <div className={styles.innerText}>{noti.data.text}</div>
                                <div className={styles.btnsSection}>
                                    <button onClick={() => handleAction(noti.key, noti.data.reaction, true)} style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidLike color={noti.data.reaction === true ? "rgb(49, 139, 255)" : "rgb(128, 129, 145)"} size={20} /></button>
                                    <button onClick={() => handleAction(noti.key, noti.data.reaction, false)} style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidDislike color={noti.data.reaction === false ? "rgb(233, 75, 75)" : "rgb(128, 129, 145)"} size={20} /></button>
                                    <button onClick={() => handleDel(noti.key)} style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><MdDelete color={'rgb(128, 129, 145)'} size={20} /></button>
                                </div>
                            </div>
                        </div>
                        {noti.data.productImage && screenWidth > 480 ?
                            <motion.div layout className={styles.imgSectionBg}>
                                <img className={styles.productImage} src={noti.data.productImage} onClick={() => setImgSrc(noti.data.productImage)} alt="notiImgAlt" />
                            </motion.div>
                            : noti.data.productImage && screenWidth < 480 ? <div onClick={() => setImgSrc(noti.data.productImage)}><MdImage /></div>
                                : ""
                        }
                    </motion.li>
                )) :
                    <div className={styles.empty}>
                        <motion.div initial={{transform: "translateY(30px)", opacity: 0}} animate={{transform: "translateY(0px)", opacity: 1}} className={styles.inner}>{translation.there_is_no_notification_for_show}</motion.div>
                    </div>
                }
                {data.length !== 0 &&
                    <div className={styles.loadMoreBg}>
                        <motion.button
                            onClick={() => setLimiter(prev => prev + 5)}
                            style={{
                                width: isNavOpen ? "166px" : "306px"
                            }}
                            layout
                        >
                            {translation.load_more}
                        </motion.button>
                    </div>
                }
            </motion.ul>
            <AnimatePresence>
                {imgSrc && <ImgViewer imgSrc={imgSrc} setImgSrc={setImgSrc} />}
            </AnimatePresence>
            <AnimatePresence>
                {isDelModalOpen &&
                    <DeleteModal
                        styles={styles}
                        setIsDelModalOpen={setIsDelModalOpen}
                        handleClose={handleClose}
                        handleConfirm={handleConfirm}
                    />
                }
            </AnimatePresence>
        </motion.div>
    )
}

export default memo(NotificationList)
