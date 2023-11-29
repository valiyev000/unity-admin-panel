import { memo, useContext } from "react"
import styles from './styles/Banner.module.scss'
import SettingImgHuge from '../../images/slideImgForSettingHuge.png'
import contextApi from "../../StateManager"
import { motion } from 'framer-motion'

function Banner() {

    const { screenWidth, translation, theme, setIsSettingOpen } = useContext(contextApi)

    return (
        <motion.div layout className={styles.main} style={{ margin: screenWidth > 480 ? "40px 0 40px 0" : "0 0 40px 0", height: screenWidth < 480 ? "540px" : "256px" }}>
            <motion.div layout className={styles.left} style={{marginTop: screenWidth < 480 ? "256px" : "0px" , alignItems: screenWidth < 480 ? "center" : "flex-start"}}>
                <div className={styles.title}>{translation.your_products}</div>
                <div className={styles.content}>{translation.Create_your_product_dashboard_in_minutes}</div>
                <motion.button layout className={styles.btn} initial={{transform: "scale(1)"}} animate={{transform: "scale(1)"}} whileHover={{transform: "scale(0.95)"}} onClick={() => setIsSettingOpen(true)} style={{ background: theme === "dark" ? '#242731' : "#fff", color: theme === "dark" ? '#fff' : "#11142D" }}>{translation.check_all_setting}</motion.button>
            </motion.div>
            <img
                className={styles.img}
                style={{
                    bottom: screenWidth > 1200 ? "-230px" : screenWidth <= 1200 && screenWidth > 480 ? "40px" : "50%",
                    right: screenWidth > 1200 ? "70px" : screenWidth <= 1200 && screenWidth > 480 ? "54px" : "50%",
                    height: screenWidth > 1200 ? "180%" : screenWidth <= 1200 && screenWidth > 480 ? "70%" : "40%",
                    transform: screenWidth <= 480 && "translateX(50%)"
                }}
                src={SettingImgHuge}
                alt=""
            />
        </motion.div>
    )
}


export default memo(Banner)