import { memo, useContext, useState } from 'react'
import styles from './styles/MessageBox.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaComment, FaStar } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { db } from '../../firebase-config'
import { doc, updateDoc } from 'firebase/firestore'

function MessageBox({ selectedFilter, mainContainer, conversations }) {

    const { theme, translation } = useContext(contextApi)

    // console.log(conversations)

    const history = useHistory();
    const { key } = useParams();
    const [openedMoreOptionMenuIndex, setOpenMoreOptionMenuIndex] = useState(null)

    const handleUserBlockClick = (clickedKey) => {

        if (clickedKey === key) {
            history.push('/inbox')
        } else {
            history.push(`/inbox/${clickedKey}`)
            mainContainer.current.scrollTo(0, 0)
        }
    }

    const handleMoreOptionMenu = (element, clickedKey) => {
        element.stopPropagation()
        if (clickedKey === openedMoreOptionMenuIndex) {
            setOpenMoreOptionMenuIndex(null)
        } else {
            setOpenMoreOptionMenuIndex(clickedKey)
        }
    }

    const handleStarred = async (element, keyX, isStarred) => {

        element.stopPropagation()
        setOpenMoreOptionMenuIndex(null)

        const documentId = keyX;
        const documentRef = doc(db, 'conversations', documentId);

        try {
            await updateDoc(documentRef, {
                isStarred: !isStarred,
            });

            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    };

    const handleArchived = async (element, keyX, isArchived) => {

        element.stopPropagation()
        setOpenMoreOptionMenuIndex(null)

        const documentId = keyX;
        const documentRef = doc(db, 'conversations', documentId);

        try {
            await updateDoc(documentRef, {
                isArchived: !isArchived,
            });

            console.log('Document successfully updated!');
        } catch (error) {
            console.error('Error updating document: ', error);
        }
    }

    const formatTime = (timestamp) => {
        let formattedTime = ""

        if (formattedTime !== "") {
            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);

            // Extract hours and minutes
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');

            // Combine hours and minutes
            formattedTime = `${hours}:${minutes}`;
        }

        return formattedTime;
    };


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
            <ul className={styles.innerContainer}>
                <AnimatePresence>
                    {conversations && conversations.map(child => (
                        <motion.li
                            className={styles.userBlock}
                            onClick={() => handleUserBlockClick(child.key)}
                            layout
                            initial={{
                                opacity: 0,
                                background: child.key === key ? "rgba(108,93,211,1)" : "rgba(108,93,211,0)",
                                color: child.key === key ? "#fff" : "#808191"
                            }}
                            animate={{
                                opacity: 1,
                                background: child.key === key ? "rgba(108,93,211,1)" : "rgba(108,93,211,0)",
                                color: child.key === key ? "#fff" : "#808191"
                            }}
                            exit={{
                                opacity: 0,
                                background: child.key === key ? "rgba(108,93,211,1)" : "rgba(108,93,211,0)",
                                color: child.key === key ? "#fff" : "#808191"
                            }}
                            key={child.key}
                        >
                            <div className={styles.avatarSection}>
                                <img src={child.data.userAvatar ? child.data.userAvatar : uploadAvatarNull} alt="userAvatar.png" />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.topSection}>
                                    <div className={styles.userName}>{child.data.userName}</div>
                                    <div className={styles.time}>{formatTime(child.data.modifiedTime)}</div>
                                </div>
                                <div className={styles.middleSection}>
                                    {child.data.messages[0].text.length < 46 ? child.data.messages[0].text : `${child.data.messages[0].text.slice(0, 46)}...`}
                                </div>
                                <div className={styles.actionSection}>
                                    <button><FaComment color={child.key === key ? "#A79EE5" : "#808191"} /></button>
                                    <button onClick={(element) => handleStarred(element, child.key, child.data.isStarred)}><FaStar color={child.data.isStarred ? "#FDCC0D" : child.key === key ? "#A79EE5" : "#808191"} /></button>
                                    <button onClick={(element) => handleMoreOptionMenu(element, child.key)} tabIndex={0} onBlur={() => setOpenMoreOptionMenuIndex(null)}><BsThreeDots color={child.key === key ? "#A79EE5" : "#808191"} />
                                        <AnimatePresence>
                                            {openedMoreOptionMenuIndex === child.key &&
                                                <motion.ul
                                                    className={styles.moreOptionMenu}
                                                    initial={{
                                                        transform: "translateX(50%) translateY(-20%)",
                                                        opacity: 0,
                                                        background: theme === "dark" ? "#242731" : "#fff",
                                                        border: theme === "dark" ? "rgb(228,228,228)" : "rgba(228,228,228,0.1)",
                                                        color: theme === "dark" ? "#fff" : "rgb(17,20,45)"
                                                    }}
                                                    animate={{
                                                        transform: "translateX(50%) translateY(0%)",
                                                        opacity: 1,
                                                        background: theme === "dark" ? "#242731" : "#fff",
                                                        border: theme === "dark" ? "rgb(228,228,228)" : "rgba(228,228,228,0.1)",
                                                        color: theme === "dark" ? "#fff" : "rgb(17,20,45)"
                                                    }}
                                                    exit={{
                                                        transform: "translateX(50%) translateY(-20%)",
                                                        opacity: 0,
                                                        background: theme === "dark" ? "#242731" : "#fff",
                                                        border: theme === "dark" ? "rgb(228,228,228)" : "rgba(228,228,228,0.1)",
                                                        color: theme === "dark" ? "#fff" : "rgb(17,20,45)"
                                                    }}
                                                >
                                                    <li className={`${theme === "dark" ? styles.dark : ""}`} onClick={(element) => handleArchived(element, child.key, child.data.isArchived)}>{child.data.isArchived ? translation.remove_from_archive : translation.add_to_archive}</li>
                                                    <li className={`${theme === "dark" ? styles.dark : ""}`}>{translation.delete}</li>
                                                </motion.ul>
                                            }
                                        </AnimatePresence>
                                    </button>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </motion.div>
    )
}

export default memo(MessageBox)