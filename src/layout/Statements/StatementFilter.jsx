import { memo, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './styles/StatementFilter.module.scss'
import contextApi from '../../StateManager'

function StatementFilter({ labelData, selectedMonth, setSelectedMonth }) {

    const { screenWidth, lang } = useContext(contextApi)

    return (
        <AnimatePresence>
            <motion.div
                className={styles.wrapper}
                initial={{
                    marginTop: screenWidth < 1200 ? "57px" : "28px",
                    transform: "scale(1.2)"
                }}
                animate={{
                    marginTop: screenWidth < 1200 ? "57px" : "28px",
                    transform: "scale(1.0)"
                }}
                exit={{
                    marginTop: screenWidth < 1200 ? "57px" : "28px",
                    transform: "scale(1.2)"
                }}
                layout
            >
                {labelData.map(label => (
                    <button onClick={(() => setSelectedMonth(label.queryPath))} key={label.queryPath}>
                        <span style={{ color: selectedMonth === label.queryPath ? "#fff" : "#808191" }}>{label[`name_${lang}`]}</span>
                        {selectedMonth === label.queryPath &&
                            <AnimatePresence>
                                <motion.div layoutId='layer' className={styles.layer} initial={{ background: "#808080" }} animate={{ background: label.bgColor }} exit={{ background: "#808080" }}></motion.div>
                            </AnimatePresence>
                        }
                    </button>
                ))}
            </motion.div>
        </AnimatePresence>
    )
}

export default memo(StatementFilter)