import { useContext, useEffect, useState } from 'react'
import styles from '../styles/pages/Notifications.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import contextApi from '../StateManager';
import HeaderMobile from '../components/HeaderMobile';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import Header from '../components/Header';
import HeaderMobileSub from '../sub-components/HeaderMobileSub';
import NotificationSearch from '../layout/Notifications/NotificationSearch';
import FilterSection from '../layout/Notifications/FilterSection';
import { serverTimestamp } from 'firebase/firestore';

export default function Notifications() {

  const { theme, screenWidth, isNavOpen } = useContext(contextApi)
  const [selectedFilter, setSelectedFilter] = useState("clients")

  const MAIN_STYLE = {
    backgroundColor: theme === "dark" ? "#242731" : "#fff",
    paddingTop: screenWidth > 480 ? "0px" : "80px",
    minWidth: screenWidth > 480 && isNavOpen ? "800px" : screenWidth > 480 && !isNavOpen ? "670px" : ""
  }

  const CONTAINER_STYLE = {
    width: isNavOpen && screenWidth > 480 ? "calc(100% - 220px)"
      : !isNavOpen && screenWidth > 480
        ? "calc(100% - 80px)" : "100%",
    transform: isNavOpen && screenWidth <= 480 ? "translateX(65%)" : "translateX(0%)", //! motion.div edende bu islemir, bunu animate attributunda vermek lazim gelecek...
    color: theme === "dark" ? "#fff" : "#11142D",
    paddingTop: screenWidth > 480 && "40px"
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const notificationModel = {
    ytrduxyi6do87p9f8v: {
      id: 1,
      userAvatar: null,
      username: "Glenn Greer",
      notiType: "comment", //todo comment || purchase || like
      time: serverTimestamp(),
      text: "Love this so much! What tools do you use to create your 3d illustrations?",
      image: null,
      reaction: true, //todo true || false || null
    }
  }

  return (
    <main className={styles.main} style={MAIN_STYLE}>

      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position fixed ve ya stickydi */}
      <motion.div className={styles.container} initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}> {/*///todo BUNU DEYISMEK LAZIMDI */}

        {screenWidth > 480 ? <Header screenWidthRestriction={true} text={"notifications"} /> : <HeaderMobileSub text={"notifications"} />} {/* position static ve ya fixeddi */}

        <NotificationSearch />
        <FilterSection selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />


      </motion.div>
    </main>
  )
}
