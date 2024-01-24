import { memo, useContext } from "react"
import styles from './styles/Banner.module.scss'
import SettingImgHuge from '../../images/slideImgForSettingHuge.png'
import contextApi from "../../StateManager"
import { motion } from 'framer-motion'

function Banner() {

    const { screenWidth, translation, theme, setIsSettingOpen } = useContext(contextApi)

    return (
        <motion.div
            className={styles.main}
            layout
            style={{
                margin: screenWidth > 480 ? "40px 0 40px 0" : "0 0 40px 0",
                padding: screenWidth > 480 ? "40px 54px" : "40px 0",
                height: screenWidth < 480 ? "unset" : "256px",
                justifyContent: screenWidth > 480 ? "space-between" : "center"
            }}
        >
            <motion.div layout className={styles.left} style={{ marginTop: screenWidth < 480 ? "256px" : "0px", alignItems: screenWidth < 480 ? "center" : "flex-start" }}>
                <div className={styles.title}>{translation.your_products}</div>
                <div className={styles.content}>{translation.Create_your_product_dashboard_in_minutes}</div>
                <motion.button
                    className={styles.btn}
                    layout
                    initial={{ transform: "scale(1)" }}
                    animate={{ transform: "scale(1)" }}
                    whileHover={{ transform: "scale(0.95)" }}
                    onClick={() => setIsSettingOpen(true)}
                    style={{
                        background: theme === "dark" ? '#242731' : "#fff",
                        color: theme === "dark" ? '#fff' : "#11142D",
                        marginBottom: "15px"
                    }}
                >
                    {translation.check_all_setting}
                </motion.button>
                {/* <motion.button
                    className={styles.btn}
                    layout
                    initial={{ transform: "scale(1)" }}
                    animate={{ transform: "scale(1)" }}
                    whileHover={{ transform: "scale(0.95)" }}
                    onClick={() => setIsSettingOpen(true)}
                    style={{
                        background: theme === "dark" ? '#242731' : "#fff",
                        color: theme === "dark" ? '#fff' : "#11142D"
                    }}
                >
                    {translation.add_new_product}
                </motion.button> */}
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