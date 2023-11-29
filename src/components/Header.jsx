import { memo, useContext } from 'react'
import styles from '../styles/components/Header.module.scss'
import contextApi from '../StateManager'
import { motion } from 'framer-motion'
import ForSearch from '../sub-components/ForSearch'

function Header({ screenWidthRestriction, text }) {

  const { translation, screenWidth, theme, testForNotification, user } = useContext(contextApi)

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <motion.div style={{ fontSize: screenWidth >= 1024 ? "24px" : "18px" }} className={styles.hi} layout>{translation.hi} {user.displayName},</motion.div><br />
        <motion.div style={{ fontSize: screenWidth >= 1024 ? "48px" : "40px" }} className={styles.welcome} layout>{translation[text]}</motion.div>
      </div>
      {screenWidthRestriction &&
        <motion.div layout className={styles.right}>
          <ForSearch />
        </motion.div>
      }
    </header>
  )
}


export default memo(Header)