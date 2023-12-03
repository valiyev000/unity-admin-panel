import { memo, useContext } from "react"
import styles from './styles/InboxFilter.module.scss'
import contextApi from "../../StateManager"
import { motion } from 'framer-motion'

function InboxFilter({ selectedFilter, setSelectedFilter }) {

    const { screenWidth, translation } = useContext(contextApi)

    const handleChangeFilter = (value) => {
        setSelectedFilter(value)
    }

    return (
        <motion.div
            className={styles.filterMain}
            initial={{
                marginTop: screenWidth > 480 ? "24px" : "16px"
            }}
            animate={{
                marginTop: screenWidth > 480 ? "24px" : "16px"
            }}
            layout
        >
            <motion.button layout onClick={() => handleChangeFilter("your_inbox")} style={{ background: selectedFilter === "your_inbox" ? "#6C5DD3" : "transparent", color: selectedFilter === "your_inbox" ? "#fff" : "unset", border: selectedFilter === "your_inbox" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.your_inbox}</motion.button>
            <motion.button layout onClick={() => handleChangeFilter("archives")} style={{ background: selectedFilter === "archives" ? "#6C5DD3" : "transparent", color: selectedFilter === "archives" ? "#fff" : "unset", border: selectedFilter === "archives" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.archives}</motion.button>
            <motion.button layout onClick={() => handleChangeFilter("done")} style={{ background: selectedFilter === "done" ? "#6C5DD3" : "transparent", color: selectedFilter === "done" ? "#fff" : "unset", border: selectedFilter === "done" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.done}</motion.button>
            <motion.button layout onClick={() => handleChangeFilter("saved")} style={{ background: selectedFilter === "saved" ? "#6C5DD3" : "transparent", color: selectedFilter === "saved" ? "#fff" : "unset", border: selectedFilter === "saved" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.saved}</motion.button>
        </motion.div>
    )
}

export default memo(InboxFilter)