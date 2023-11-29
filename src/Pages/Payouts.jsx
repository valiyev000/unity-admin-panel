import { memo, useEffect, useState, useContext } from 'react'
import styles from '../styles/pages/Payouts.module.scss'
import contextApi from '../StateManager'
import { AnimatePresence, motion } from 'framer-motion'
import HeaderMobile from '../components/HeaderMobile'
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import Header from '../components/Header'
import Payment from '../layout/Payouts/Payment'
import EarningMonth from '../layout/Payouts/EarningMonth'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import WithdrawHistory from '../layout/Payouts/WithdrawHistory'

function Payouts() {

  const { theme, screenWidth, isNavOpen, axiosGet } = useContext(contextApi)
  const [earningMonthly, setEarningMonthly] = useState(null)
  const [payoutsData, setPayoutsData] = useState(null)

  useEffect(() => {
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/home/earning_monthly.json", setEarningMonthly)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/db/payouts.json", setPayoutsData)
    window.scrollTo(0, 0);
  }, [])

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

  return (
    <main className={styles.main} style={MAIN_STYLE}>

      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position fixed ve ya stickydi */}

      <motion.div className={styles.container} initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}> {/*///todo BUNU DEYISMEK LAZIMDI */}

        {screenWidth > 480 ? <Header screenWidthRestriction={true} text={"your_payouts"} /> : <HeaderMobileSub text={"your_payouts"} />} {/* position static ve ya fixeddi */}

        <div className={styles.topSection}>
          <div className={styles.left} style={{ width: screenWidth > 1200 ? "60%" : "100%" }}>
            <Payment />
          </div>
          <div className={styles.right} style={{ width: screenWidth > 1200 ? "30%" : "100%" }}>
            {earningMonthly ? <EarningMonth data={earningMonthly} />
              : screenWidth > 1200 || screenWidth < 480 ? <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: "100%", height: screenWidth < 480 ? "420px" : "407px", margin: screenWidth > 480 ? "40px 0px" : "0 0 40px 0" }}><Skeleton style={{ height: "100%", width: "100%", borderRadius: 24 }} /></motion.div>
                : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: "100%" }}><Skeleton style={{ height: "310px", width: "100%", borderRadius: 24, marginBottom: "40px" }} /></motion.div>
            }
          </div>
        </div>
        {screenWidth > 1200 && <hr style={{ border: theme === "light" ? "1px solid #E4E4E4" : "1px solid #E4E4E41A" }} />}
        <WithdrawHistory data={payoutsData} setData={setPayoutsData} />


      </motion.div>
    </main>
  )
}

export default memo(Payouts)