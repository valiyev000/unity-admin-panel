import {memo, useContext} from 'react'
import styles from './styles/MessageBox.module.scss'
import {motion} from 'framer-motion'
import contextApi from '../../StateManager'

function MessageBox({selectedFilter}) {

    const {theme, translation} = useContext(contextApi)

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
    </motion.div>
  )
}

export default memo(MessageBox)