import Navbar from '../components/Navbar'
import { useContext, useEffect, useState } from 'react'
import contextApi from '../StateManager'
import { AnimatePresence } from 'framer-motion'
import HeaderMobile from '../components/HeaderMobile'
import NavbarMobile from '../components/NavbarMobile'
import styles from '../styles/pages/Products.module.scss'
import Header from '../components/Header'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import { motion } from 'framer-motion'
import Banner from '../layout/Products/Banner'
import ProductTable from '../layout/Products/ProductTable'

export default function Products() {

  const { theme, screenWidth, isNavOpen, axiosGet } = useContext(contextApi)

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

  const [data, setData] = useState(null)

  function getData() {
    axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/db/products.json", setData)
  }

  useEffect(() => {
    getData()
    window.scrollTo(0, 0);
  }, [])

  return (
    <main className={styles.main} style={MAIN_STYLE}>

      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position fixed ve ya stickydi */}
      <motion.div className={styles.container} initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}> {/*///todo BUNU DEYISMEK LAZIMDI */}

        {screenWidth > 480 ? <Header screenWidthRestriction={true} text={"welcome_back"} /> : <HeaderMobileSub text={"welcome_back"} />} {/* position static ve ya fixeddi */}

        <Banner />

        <ProductTable data={data} setData={setData} getData={getData} />
        
      </motion.div>
    </main>
  )
}
