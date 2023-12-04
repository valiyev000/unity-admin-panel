import { memo, useContext } from 'react'
import styles from './styles/MessageBox.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import uploadAvatarNull from '../../images/uploadAvatarNull.png'
import { FaComment, FaStar } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'

function MessageBox({ selectedFilter, mainContainer }) {

    const { theme, translation } = useContext(contextApi)

    const history = useHistory();
    const {key} = useParams();

    const handleUserBlockClick = (clickedKey) =>{
        
        if (clickedKey === key) {
            history.push('/inbox')
        } else {
            history.push(`/inbox/${clickedKey}`)
            mainContainer.current.scrollTo(0, 0)
        }
    }

    const testData = ["6457d685c7ov8p","4udci7o87iuvo","uy6id7oc8pvu","uritcoyvpuibq22"]

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
                {testData && testData.map(e=>(
                <div key={e} className={styles.userBlock} onClick={()=>handleUserBlockClick(e)}>
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
                ))}
            </div>
        </motion.div>
    )
}

export default memo(MessageBox)