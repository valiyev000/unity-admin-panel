import { useContext, useEffect, useState } from 'react'
import styles from '../styles/pages/Campaigns.module.scss'
import contextApi from '../StateManager'
import { AnimatePresence, motion } from 'framer-motion'
import HeaderMobile from '../components/HeaderMobile'
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import ForSearch from '../sub-components/ForSearch'
import Header from '../components/Header'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import ActiveUsers from '../layout/Campaigns/ActiveUsers'
import Users from '../layout/Campaigns/Users'
import Income from '../layout/Campaigns/Income'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import IconProgress from '../layout/Campaigns/IconProgress'
import LatestSales from '../layout/Campaigns/LatestSales'
import Goal from '../layout/Campaigns/Goal'
import Affiliate from '../layout/Home/Affiliate'

export default function Campaigns() {

  const { screenWidth, theme, isNavOpen, axiosGet } = useContext(contextApi)
  const [incomeData, setIncomeData] = useState(null)
  const [iconData, setIconData] = useState(null)
  const [goalData, setGoalData] = useState(null)  
  const [affiliateData, setAffiliateData] = useState([])

  const MAIN_STYLE = {
    paddingTop: screenWidth > 480 ? "0px" : "80px",
    overflow: screenWidth > 480 ? "unset" : "hidden", //! Yuxari olcude hidden verildikde navbar scroll olmur. sebebini bilmirem
    minWidth: screenWidth > 480 && isNavOpen ? "800px" : screenWidth > 480 && !isNavOpen ? "670px" : ""
  }

  const CONTAINER_STYLE = {
    width: isNavOpen && screenWidth > 480 ? "calc(100% - 220px)"
      : !isNavOpen && screenWidth > 480
        ? "calc(100% - 80px)" : "100%",
    transform: isNavOpen && screenWidth <= 480 ? "translateX(65%)" : "translateX(0%)", //! motion.div edende bu islemir, bunu animate attributunda vermek lazim gelecek...
    color: theme === "dark" ? "#fff" : "#11142D"
  }

  useEffect(()=>{
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/income.json",setIncomeData)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/iconProgress.json",setIconData)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/goalData.json",setGoalData)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/home/affiliate.json", setAffiliateData)
    window.scrollTo(0, 0);
  },[])

  return (
    <div className={`${styles.main} ${theme === "dark" && styles.dark}`} style={MAIN_STYLE}>
      
      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position sticky ve ya fixeddi */}

      <motion.div className={styles.container} initial={{ transform: "scale(1.2)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}>
        <div className={styles.left} style={{ width: screenWidth >= 1200 ? "65%" : "100%", paddingTop: screenWidth > 480 && "40px", minWidth: screenWidth > 480 && 480 }}>

          {screenWidth > 480 ? <Header screenWidthRestriction={screenWidth < 1200} text={"campaigns"} /> : <HeaderMobileSub text={"campaigns"} />} {/* ikiside position staticdi  */}

          <ActiveUsers />
          <Users />
          {incomeData ? <Income incomeData={incomeData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", margin: screenWidth <= 480 ? "20px 0 0 0" : "" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div>}
          {iconData ? <IconProgress iconData={iconData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", margin: screenWidth >= 1200 ? "40px 0 0 0" : "20px 0 0 0"}}><Skeleton style={{ height: "445px", width: "100%", borderRadius: 24 }} /> </motion.div>}
          {true ? <LatestSales /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", margin: screenWidth >= 1200 ? "40px 0 0 0" : "20px 0 0 0"}}><Skeleton style={{ height: "445px", width: "100%", borderRadius: 24 }} /> </motion.div>}
          {screenWidth < 1200 && goalData ? <Goal data={goalData} /> : screenWidth < 1200 ? <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", margin: screenWidth >= 1200 ? "100px 0 0 0" : "20px 0 0 0"}}><Skeleton style={{ height: "600px", width: "100%", borderRadius: 24 }} /> </motion.div> : ""}
          {affiliateData.length && screenWidth < 1200 ? <Affiliate affiliateData={affiliateData} /> : !affiliateData.length && screenWidth < 1200 ? <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", marginTop: "20px" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div> : ""}

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
              {goalData ? <Goal data={goalData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: "100%", margin: screenWidth >= 1200 ? "100px 0 0 0" : "20px 0 0 0"}}><Skeleton style={{ height: "600px", width: "100%", borderRadius: 24 }} /> </motion.div>}
              {affiliateData.length ? <Affiliate affiliateData={affiliateData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} style={{ width: "100%", marginTop: "40px" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div>}

            </motion.div>
          }
        </AnimatePresence>
      </motion.div>

    </div>
  )
}
