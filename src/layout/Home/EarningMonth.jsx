import { memo, useContext } from "react"
import contextApi from "../../StateManager"
import styles from './styles/EarningMonth.module.scss'
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { motion, spring } from 'framer-motion'


function EarningMonth({earningMonthly}) {

  const { translation, theme, screenWidth } = useContext(contextApi)


  return (
    <motion.div
      className={styles.main}
      layoutId="earningMonth"
      initial={{
        transform: "scale(1.1)",
        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
        width: screenWidth <= 480 || screenWidth >= 1200 ? "100%" : "48%",
        marginTop: screenWidth >= 1200 ? "95px" : "20px",
        background: theme === "dark" ? "#1F2128" : "#fff",
        padding: screenWidth >= 1200 ? "55px 10%" : "29px 7%"
      }}
      animate={{
        transform: "scale(1.0)",
        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
        width: screenWidth <= 480 || screenWidth >= 1200 ? "100%" : "48%",
        marginTop: screenWidth >= 1200 ? "95px" : "20px",
        background: theme === "dark" ? "#1F2128" : "#fff",
        padding: screenWidth >= 1200 ? "55px 10%" : "29px 7%"
      }}
      transition={{
        duration: 0.5, ease: "easeInOut"
      }}
    >
      <motion.div layout className={styles.title}>{translation.your_earning_this_month}</motion.div>
      <motion.div layout className={styles.data}>{earningMonthly}</motion.div>
      <motion.div layout className={styles.description}>{translation.update_your_payout_method_in_settings}</motion.div>
      <Link className={`${styles.btn} ${theme === "dark" ? styles.dark : ""}`} to="/payouts">
        <motion.div layout>{translation.withdraw_all_earning}</motion.div>
      </Link>
    </motion.div>
  )
}


export default memo(EarningMonth)