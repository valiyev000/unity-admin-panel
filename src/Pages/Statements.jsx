import { motion, AnimatePresence } from 'framer-motion'
import { useContext, useEffect, useState } from 'react'
import styles from '../styles/pages/Statements.module.scss'
import contextApi from '../StateManager'
import HeaderMobile from '../components/HeaderMobile'
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import ForSearch from '../sub-components/ForSearch'
import Header from '../components/Header'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import EarningsReport from '../layout/Statements/EarningsReport'
import EarningsByItem from '../layout/Statements/EarningsByItem'
import TopItems from '../layout/Statements/TopItems'
import StatementFilter from '../layout/Statements/StatementFilter'
import StatementList from '../layout/Statements/StatementList'

export default function Statements() {

  const { screenWidth, theme, isNavOpen, axiosGet } = useContext(contextApi)

  const [earningsByItemData, setEarningsByItemData] = useState(null)
  const [selectedMonth, setSelectedMonth] = useState("last30")
  const [labelData, setLabelData] = useState(null)
  const [statementsData, setStatementsData] = useState(null)

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
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/statements/earningsByItem.json", setEarningsByItemData)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/db/statements/range.json", setLabelData)
  }, [])

  return (
    <div className={`${styles.main} ${theme === "dark" && styles.dark}`} style={MAIN_STYLE}>

      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position sticky ve ya fixeddi */}

      <motion.div className={styles.container} initial={{ transform: "scale(1.2)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}>
        <div className={styles.left} style={{ width: screenWidth >= 1200 ? "65%" : "100%", paddingTop: screenWidth > 480 && "40px", minWidth: screenWidth > 480 && 480 }}>

          {screenWidth > 480 ? <Header screenWidthRestriction={screenWidth < 1200} text={"earnings_report"} /> : <HeaderMobileSub text={"earnings_report"} />} {/* ikiside position staticdi  */}

          <EarningsReport />

          {screenWidth < 1200 && earningsByItemData ? <EarningsByItem data={earningsByItemData} />
            : screenWidth < 1200 ? <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: screenWidth < 480 ? "100%" : "48%", margin: "20px 0 0 0" }}><Skeleton style={{ height: "565px", width: "100%", borderRadius: 24 }} /> </motion.div>
              : null}
          {screenWidth < 1200 && <TopItems />}
          {labelData && screenWidth > 480 ? <StatementFilter labelData={labelData} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} /> : screenWidth > 480 ? <motion.div initial={{ marginTop: screenWidth < 1200 ? "57px" : "28px", width: "40%", transform: "scale(1.1)" }} animate={{ marginTop: screenWidth < 1200 ? "57px" : "28px", width: "40%", transform: "scale(1.0)" }} layout><Skeleton style={{ height: "48px", width: "100%", borderRadius: 24 }} /> </motion.div> : null}
          <StatementList data={statementsData} setData={setStatementsData} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} labelData={labelData} />

        </div>
        <AnimatePresence>
          {screenWidth >= 1200 &&
            <motion.div
              className={`${styles.right} ${theme === "dark" ? styles.dark : ""}`}
              initial={{ transform: "translateX(100%)" }}
              animate={{ transform: "translateX(0%)" }}
            >
              <div className={styles.rightTop}>
                <ForSearch />
                {earningsByItemData ? <EarningsByItem data={earningsByItemData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} style={{ width: "100%", margin: "100px 0 0 0" }}><Skeleton style={{ height: "565px", width: "100%", borderRadius: 24 }} /> </motion.div>}
                <TopItems />
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>

    </div>
  )
}
