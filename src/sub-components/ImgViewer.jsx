import { createPortal } from 'react-dom'
import styles from '../styles/sub-components/ImgViewer.module.scss'
import { useContext, useEffect } from 'react'
import contextApi from '../StateManager'
import { MdCloseFullscreen } from "react-icons/md";
import { AnimatePresence, motion } from 'framer-motion'

export default function ImgViewer({ imgSrc, setImgSrc }) {

  const { theme } = useContext(contextApi)

  useEffect(() => {
    function handleKeyUp(e) {
      if (e.key === "Escape") setImgSrc(null);
    }
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    }
  }, [])

  return (
    createPortal(
      <motion.div
        className={styles.viewerMainBg}
        initial={{
          backdropFilter: "blur(0px)",
          background: "rgba(0, 0, 0, 0)"
        }}
        animate={{
          backdropFilter: "blur(3px)",
          background: "rgba(0, 0, 0, 0.2)"
        }}
        exit={{
          backdropFilter: "blur(0px)",
          background: "rgba(0, 0, 0, 0)"
        }}
        onClick={() => setImgSrc(null)}
      >
          <motion.div
            className={styles.container}
            initial={{
              opacity: 0,
              transform: "scale(0.8)",
              background: theme === "dark" ? "rgb(36, 39, 49)" : "#fff"
            }}
            animate={{
              opacity: 1,
              transform: "scale(1)",
              background: theme === "dark" ? "rgb(36, 39, 49)" : "#fff"
            }}
            exit={{
              opacity: 0,
              transform: "scale(0.8)",
              background: theme === "dark" ? "rgb(36, 39, 49)" : "#fff"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={imgSrc} alt="openedImgAsView" />
            <MdCloseFullscreen className={styles.icon} size={22} color='#fff' onClick={() => setImgSrc(null)} />
            <div className={styles.shadow}></div>
          </motion.div>
      </motion.div>,
      portal
    )
  )
}
