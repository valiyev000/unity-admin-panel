import { memo, useContext, useEffect, useState } from 'react'
import styles from './styles/ActiveUsers.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import volumeImg from '../../images/volumeImg.png'
import percentageArrow from '../../images/percentageArrow.png'
import LittleSmoothLine from './LittleSmoothLine'
import ActiveUsersBar from './ActiveUsersBar'
import usersIcon from '../../images/usersIcon.png'
import clicksIcon from '../../images/clicksIcon.png'
import salesIcon from '../../images/salesIcon.png'
import itemsIcon from '../../images/itemsIcon.png'
import StatusGridChild from './StatusGridChild'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function ActiveUsers() {

    const { theme, translation, screenWidth, axiosGet } = useContext(contextApi)

    const [activeUserLineChartData,setActiveUserLineChartData] = useState(null)
    const [activeUserCount,setActiveUserCount] = useState(null)
    const [activeUsersBar,setActiveUsersBar] = useState(null)
    const [currentStatusData,setCurrentStatusData] = useState(null)

    useEffect(()=>{
        axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/activeUsers/activeUserLineChart.json", setActiveUserLineChartData)
        axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/activeUsers/activeUserCount.json", setActiveUserCount)
        axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/activeUsers/activeUsersBar.json", setActiveUsersBar)
        axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/activeUsers/currentStatus.json", setCurrentStatusData)
    },[])



    return (
        <motion.div
            className={styles.main}
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            exit={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            layout
        >
            <motion.div layout className={styles.header}>{translation.active_users_right_now}</motion.div>
            <motion.div
                className={styles.chartSection}
                initial={{
                    flexDirection: screenWidth > 480 ? "row" : "column"
                }}
                animate={{
                    flexDirection: screenWidth > 480 ? "row" : "column"
                }}
            >
                <motion.div className={styles.chartLeft} initial={{ width: screenWidth > 480 ? "20%" : "100%", flexDirection: screenWidth > 480 ? "column" : "row", marginBottom: screenWidth < 480 && "32px" }} animate={{ width: screenWidth > 480 ? "20%" : "100%", flexDirection: screenWidth > 480 ? "column" : "row", marginBottom: screenWidth < 480 && "32px" }}>
                    <motion.div
                        className={styles.flexChildLeft}
                        initial={{ width: screenWidth > 480 ? "100%" : "50%" }}
                        animate={{ width: screenWidth > 480 ? "100%" : "50%" }}
                        layout
                    >
                        {activeUserCount ? <motion.div className={styles.activeUserCount} layout initial={{opacity: 0}} animate={{opacity: 1}}>{activeUserCount}</motion.div>
                            : <Skeleton style={{ height: "56px", width: "100%", borderRadius: 10 }} />
                        }
                        <motion.div layout className={styles.pageViewsPer}>
                            <img src={volumeImg} alt="volumeImg.png" />
                            <motion.p layout>{translation.page_views_per_minute}</motion.p>
                        </motion.div>
                    </motion.div>
                    {screenWidth > 480 && <motion.hr layout style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.1)" : "1px solid #E4E4E4" }} />}
                    <motion.div
                        className={styles.flexChildRight}
                        initial={{ width: screenWidth > 480 ? "100%" : "50%" }}
                        animate={{ width: screenWidth > 480 ? "100%" : "50%" }}
                    >
                        {activeUserLineChartData ? <motion.div layout className={styles.singleLineBox}>
                            <LittleSmoothLine styles={styles} data={activeUserLineChartData} />
                            <div className={styles.percentageRate}>
                                <img src={percentageArrow} alt="percentageArrow.png" />
                                <span>6%</span>
                            </div>
                        </motion.div>
                            : <Skeleton style={{ height: "64px", width: "100%", borderRadius: 10 }} />
                        }
                        <motion.p layout className={styles.updateSetting}>{translation.update_your_payout_method_in_settings}</motion.p>
                    </motion.div>
                </motion.div>
                {activeUsersBar ? <motion.div className={styles.chartItself} initial={{ transform: "scale(1.2)", width: screenWidth > 480 ? "75%" : "100%" }} animate={{ transform: "scale(1.0)", width: screenWidth > 480 ? "75%" : "100%" }}>
                    <ActiveUsersBar styles={styles} data={activeUsersBar} />
                </motion.div>
                    : <div style={{ width: screenWidth > 480 ? "75%" : "100%", height: 214 }}> <Skeleton style={{ height: "100%", width: "100%", borderRadius: 16 }} /> </div>
                }
            </motion.div>
            {currentStatusData ? <motion.div
                className={styles.status}
                initial={{
                    border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4",
                    transform: "scale(1.2)"
                }}
                animate={{
                    border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4",
                    transform: "scale(1.0)"
                }}
                style={{
                    gridTemplateColumns: screenWidth > 480 ? "repeat(4 , 1fr)" : "repeat(2 , 1fr)"
                }}
            >
                <StatusGridChild
                    styles={styles}
                    icon={usersIcon}
                    mainText={"users"}
                    progressLineColor={"#6C5DD3"}
                    value={currentStatusData[0].value}
                    target={currentStatusData[0].target}
                    border={{ borderRight: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4", borderBottom: screenWidth < 480 ? (theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4") : "none" }}
                />
                <StatusGridChild
                    styles={styles}
                    icon={clicksIcon}
                    mainText={"clicks"}
                    progressLineColor={"#FFA2C0"}
                    value={currentStatusData[1].value}
                    target={currentStatusData[1].target}
                    border={{ borderRight: screenWidth > 480 ? (theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4") : "none", borderBottom: screenWidth < 480 ? (theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4") : "none" }}
                />
                <StatusGridChild
                    styles={styles}
                    icon={salesIcon}
                    mainText={"sales"}
                    progressLineColor={"#7FBA7A"}
                    value={currentStatusData[2].value}
                    target={currentStatusData[2].target}
                    currency={true}
                    border={{ borderRight: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4" }}
                />
                <StatusGridChild
                    styles={styles}
                    icon={itemsIcon}
                    mainText={"items"}
                    progressLineColor={"#FF9A7B"}
                    value={currentStatusData[3].value}
                    target={currentStatusData[3].target}
                />
            </motion.div>
            : <Skeleton style={{ height: screenWidth < 480 ? "270px" : "135px", width: "100%", borderRadius: 16, marginTop: 30 }} />
            }
        </motion.div>
    )
}


export default memo(ActiveUsers)