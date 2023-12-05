import { memo } from 'react'
import styles from './styles/ConversationViewer.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react';
import contextApi from '../../StateManager';
import uploadAvatarNull from '../../images/uploadAvatarNull.png'


function ConversationViewer() {

    const history = useHistory();
    const { key } = useParams();
    const { screenWidth, translation } = useContext(contextApi)

    return (
        <motion.div
            className={styles.viewerMain}
            initial={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                height: screenWidth > 480 ? "80vh" : "unset",
                maxHeight: screenWidth > 480 ? "500px" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
                opacity: 0,
                transform: "scale(1.2)",
            }}
            animate={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                height: screenWidth > 480 ? "80vh" : "unset",
                maxHeight: screenWidth > 480 ? "500px" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
                opacity: 1,
                transform: "scale(1)",
            }}
        >
            <div className={styles.actionBtns}>
                <button className={styles.delete}>Delete</button>
                <button className={styles.archive}>Archive</button>
            </div>
            <div className={styles.history}>
                <div className={styles.message}>
                    <img className={styles.avatar} src={uploadAvatarNull} alt="avatar.png" />
                    <div className={styles.inner}>
                        <div className={styles.userNameAndDate}>
                            <div className={styles.userName}>Joel Becker</div>
                            <div className={styles.date}>19:43</div>
                        </div>

                    </div>
                </div>
            </div>

        </motion.div>
    )
}

export default memo(ConversationViewer)

{/* <div onClick={() => history.push('/inbox')}>Hello world</div> */ }