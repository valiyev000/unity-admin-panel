import { memo, useContext, useState } from 'react'
import styles from './styles/MessageBox.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaComment, FaStar } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'

function MessageBox({ selectedFilter, mainContainer }) {

    const { theme, translation } = useContext(contextApi)

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

    const testData = ["6457d685c7ov8p", "4udci7o87iuvo", "uy6id7oc8pvu", "uritcoyvpuibq22"]

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
                {testData && testData.map(e => (
                    <motion.li
                        className={styles.userBlock}
                        onClick={() => handleUserBlockClick(e)}
                        initial={{
                            opacity: 0,
                            background: e === key ? "rgba(108,93,211,1)" : "rgba(108,93,211,0)",
                            color: e === key ? "#fff" : "#808191"
                        }}
                        animate={{
                            opacity: 1,
                            background: e === key ? "rgba(108,93,211,1)" : "rgba(108,93,211,0)",
                            color: e === key ? "#fff" : "#808191"
                        }}
                        key={e}
                    >
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
                                <button><FaComment color={e === key ? "#A79EE5" : "#808191"} /></button>
                                <button><FaStar color={e === key ? "#A79EE5" : "#808191"} /></button>
                                <button onClick={(element) => handleMoreOptionMenu(element, e)} tabIndex={0} onBlur={() => setOpenMoreOptionMenuIndex(null)}><BsThreeDots color={e === key ? "#A79EE5" : "#808191"} />
                                    <AnimatePresence>
                                        {openedMoreOptionMenuIndex === e &&
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
                                                <li className={`${theme === "dark" ? styles.dark : ""}`}>Add to Archive</li>
                                                <li className={`${theme === "dark" ? styles.dark : ""}`}>Delete</li>
                                            </motion.ul>
                                        }
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    )
}

export default memo(MessageBox)