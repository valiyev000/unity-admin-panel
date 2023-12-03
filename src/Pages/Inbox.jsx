import { useContext, useEffect, useState } from 'react'
import contextApi from '../StateManager'
import { AnimatePresence, motion, transform } from 'framer-motion'
import HeaderMobile from '../components/HeaderMobile'
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import Header from '../components/Header'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import ForSearch from '../sub-components/ForSearch'
import styles from '../styles/pages/Inbox.module.scss'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase-config'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function Inbox() {

  const { screenWidth, theme, isNavOpen, testForNotification } = useContext(contextApi)

  const { key } = useParams()
  const history = useHistory();
  console.log(key)

  const MAIN_STYLE = {
    paddingTop: screenWidth > 480 ? "0px" : "80px",
    overflow: screenWidth > 480 ? "unset" : "hidden", //! Yuxari olcude hidden verildikde navbar scroll olmur. sebebini bilmirem
    minWidth: screenWidth > 480 && isNavOpen ? "900px" : screenWidth > 480 && !isNavOpen ? "770px" : ""
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
        <AnimatePresence>
          {(screenWidth > 480 || (screenWidth < 480 && !key)) &&
            <motion.div
              className={styles.left}
              initial={{
                width: screenWidth >= 480 ? "50%" : "100%",
                paddingTop: screenWidth > 480 && "40px",
                opacity: screenWidth < 480 && 0,
              }}
              animate={{
                width: screenWidth >= 480 ? "50%" : "100%",
                paddingTop: screenWidth > 480 && "40px",
                opacity: screenWidth < 480 && 1,
              }}
              exit={{
                width: screenWidth >= 480 ? "50%" : "100%",
                paddingTop: screenWidth > 480 && "40px",
                opacity: screenWidth < 480 && 0,
              }}
            >

              {screenWidth > 480 ? <Header screenWidthRestriction={false} text={"your_inbox"} /> : <HeaderMobileSub text={"welcome_back"} />} {/* position static ve ya fixeddi */}

              <Link to="/inbox/46">Go to 46</Link>

            </motion.div>
          }
        </AnimatePresence>
        <AnimatePresence>
          {(screenWidth >= 480 || (screenWidth < 480 && key)) &&
            <motion.div
              className={`${styles.right} ${theme === "dark" ? styles.dark : ""}`}
              initial={{ 
                transform: screenWidth > 480 && "translateX(100%)",
                width: screenWidth >= 480 ? "50%" : "100%",
                opacity: screenWidth < 480 && 0,
              }}
              animate={{ 
                transform: screenWidth > 480 && "translateX(0%)",
                width: screenWidth >= 480 ? "50%" : "100%",
                opacity: screenWidth < 480 && 1,
              }}
              exit={{
                width: screenWidth >= 480 ? "50%" : "100%",
                opacity: screenWidth < 480 && 0,
              }}
              layout
            >
              {screenWidth > 480 &&
                <div className={styles.rightTop}>
                  <ForSearch />
                </div>
              }
              {key && <div>Key is {key}</div>}
              <div onClick={()=>history.push("/inbox")}>Go back</div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </main>
  )
}
