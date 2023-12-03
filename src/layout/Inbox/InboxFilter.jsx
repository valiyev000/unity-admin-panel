import { memo, useContext } from "react"
import styles from './styles/InboxFilter.module.scss'
import contextApi from "../../StateManager"
import {motion} from 'framer-motion'

function InboxFilter() {

    const {theme, screenWidth} = useContext(contextApi)

  return (
    <motion.div
    className={styles.filterMain}
    initial={{
        marginTop: screenWidth > 480 ? "24px" : "16px"
    }}
    >
        <button>Your Inbox</button>
        <button>Archives</button>
        <button>Done</button>
        <button>Saved</button>
    </motion.div>
  )
}

export default memo(InboxFilter)