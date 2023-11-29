import { useContext } from 'react'
import Navbar from '../components/Navbar'
import styles from '../styles/pages/Home.module.scss'
import contextApi from '../StateManager'
import NavbarMobile from '../components/NavbarMobile'
import HeaderMobile from '../components/HeaderMobile'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '../components/Header'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import Slider from '../layout/Home/Slider'
import { useEffect } from 'react'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SliderMobile from '../layout/Home/SliderMobile'
import EarningByItems from '../layout/Home/EarningByItems'
import Earning from '../layout/Home/Earning'
import EarningMonth from '../layout/Home/EarningMonth'
import Affiliate from '../layout/Home/Affiliate'
import ForSearch from '../sub-components/ForSearch'

export default function Home() {

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

  const [slides, setSlides] = useState([])
  const [earningByItemsData, setEarningByItemsData] = useState(null)
  const [earningData, setEarningData] = useState(null)
  const [earningMonthly, setEarningMonthly] = useState(null)
  const [affiliateData, setAffiliateData] = useState([])


  useEffect(() => {

    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/home/slider.json", setSlides)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/db/products.json", setEarningByItemsData)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/home/earning/.json", setEarningData)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/home/earning_monthly/total.json", setEarningMonthly)
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/home/affiliate.json", setAffiliateData)
    window.scrollTo(0, 0);

  }, [])

  return (
    <div className={`${styles.main} ${theme === "dark" && styles.dark}`} style={MAIN_STYLE}>

      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position sticky ve ya fixeddi */}

      <motion.div className={styles.container} initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}>
        <div className={styles.left} style={{ width: screenWidth >= 1200 ? "65%" : "100%", paddingTop: screenWidth > 480 && "40px", minWidth: screenWidth > 480 && 480 }}>

          {screenWidth > 480 ? <Header screenWidthRestriction={screenWidth < 1200} text={"welcome_back"} /> : <HeaderMobileSub text={"welcome_back"} />} {/* position static ve ya fixeddi */}

          {slides.length && screenWidth > 480 ? <Slider slides={slides} />
            : slides.length && screenWidth <= 480 ? <SliderMobile slides={slides} />
              : !slides.length && screenWidth > 480 ? <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: "100%" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24, margin: "40px 0px" }} /> </motion.div>
                : !slides.length && screenWidth <= 480 ? <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: "100%" }}><Skeleton style={{ height: "540px", width: "100%", borderRadius: 24 }} /></motion.div>
                  : ""
          }

          {earningByItemsData ? <EarningByItems data={earningByItemsData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", margin: screenWidth <= 480 ? "20px 0 0 0" : "" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div>}

          {earningData ? <Earning earningData={earningData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} exit={{ transform: "scale(1.1)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", margin: screenWidth <= 480 ? "20px 0 0 0" : "" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div>}

          {earningMonthly && screenWidth < 1200 ? <EarningMonth earningMonthly={earningMonthly} /> : !earningMonthly && screenWidth < 1200 ? <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} style={{ width: screenWidth <= 480 ? "100%" : "48%", marginTop: "20px" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div> : ""}

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

              {earningMonthly ? <EarningMonth earningMonthly={earningMonthly} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} style={{ width: "100%", marginTop: "95px" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div>}
              {affiliateData.length ? <Affiliate affiliateData={affiliateData} /> : <motion.div initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1.0)" }} style={{ width: "100%", marginTop: "40px" }}><Skeleton style={{ height: "379px", width: "100%", borderRadius: 24 }} /> </motion.div>}

            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
