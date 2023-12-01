import { useContext, useEffect } from 'react'
import contextApi from '../StateManager'
import { AnimatePresence, motion } from 'framer-motion'
import HeaderMobile from '../components/HeaderMobile'
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import Header from '../components/Header'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import ForSearch from '../sub-components/ForSearch'
import styles from '../styles/pages/Inbox.module.scss'

export default function Inbox() {

  const { screenWidth, theme, isNavOpen, testForNotification, axiosGet } = useContext(contextApi)

  const MAIN_STYLE = {
    paddingTop: screenWidth > 480 ? "0px" : "80px",
    overflow: screenWidth > 480 ? "unset" : "hidden" //! Yuxari olcude hidden verildikde navbar scroll olmur. sebebini bilmirem
  }

  const CONTAINER_STYLE = {
    width: isNavOpen && screenWidth > 480 ? "calc(100% - 220px)"
      : !isNavOpen && screenWidth > 480
        ? "calc(100% - 80px)" : "100%",
    transform: isNavOpen && screenWidth <= 480 ? "translateX(65%)" : "translateX(0%)", //! motion.div edende bu islemir, bunu animate attributunda vermek lazim gelecek...
    color: theme === "dark" ? "#fff" : "#11142D"
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <main className={`${styles.main} ${theme === "dark" && styles.dark}`} style={MAIN_STYLE}>
      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position sticky ve ya fixeddi */}

      <motion.div className={styles.container} initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}>
        <div className={styles.left} style={{ width: screenWidth >= 1200 ? "50%" : "100%", paddingTop: screenWidth > 480 && "40px", minWidth: screenWidth > 480 && 480 }}>

          {screenWidth > 480 ? <Header screenWidthRestriction={screenWidth < 1200} text={"welcome_back"} /> : <HeaderMobileSub text={"welcome_back"} />} {/* position static ve ya fixeddi */}

        </div>
        <AnimatePresence>
          {screenWidth >= 1200 &&
            <motion.div
              className={`${styles.right} ${theme === "dark" ? styles.dark : ""}`}
              initial={{ transform: "translateX(100%)" }}
              animate={{ transform: "translateX(0%)" }}
              layout
            >
              <div className={styles.rightTop}>
                <ForSearch />
              </div>
            </motion.div>
          }
        </AnimatePresence>
        </motion.div>
    </main>
  )
}
