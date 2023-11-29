import { memo, useContext, useEffect, useRef, useState } from 'react'
import styles from './styles/EarningsReport.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from '../../StateManager'
import { IoIosArrowDown } from 'react-icons/io'
import totalEarningImg from '../../images/totalEarningImg.png'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import LittleSmoothLine from './LittleSmoothLine'
import percentageArrow from '../../images/percentageArrow.png'
import ReactECharts from 'echarts-for-react';
import CountUp from 'react-countup';
import StatusGridChild from '../Campaigns/StatusGridChild'
import usersIcon from '../../images/usersIcon.png'
import clicksIcon from '../../images/clicksIcon.png'
import salesIcon from '../../images/salesIcon.png'


function EarningsReport() {

    const { theme, screenWidth, translation, axiosGet } = useContext(contextApi)
    const [selectedCollection, setSelectedCollection] = useState("Collection 1")
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)
    const [earningsLineChartData, setEarningsLineChartData] = useState(null)
    const [earningsBarChartData, setEarningsBarChartData] = useState(null)
    const [totalValue, setTotalValue] = useState(null)
    const [currentEarningStatusData, setCurrentEarningStatusData] = useState(null)


    useEffect(() => {
        let collectionName = "";
        switch (selectedCollection) {
          case "Collection 1":
            collectionName = "collection1"
            break;
          case "Collection 2":
            collectionName = "collection2"
            break;
          default:
            console.log("Have a bug... Check out!");
            break;
        }
        axiosGet(`https://unity-admin-panel-default-rtdb.firebaseio.com/statements/earningsReport/${collectionName}/earningsLineChart.json`, setEarningsLineChartData)
        axiosGet(`https://unity-admin-panel-default-rtdb.firebaseio.com/statements/earningsReport/${collectionName}/totalEarningsCount.json`, setTotalValue)
        axiosGet(`https://unity-admin-panel-default-rtdb.firebaseio.com/statements/earningsReport/${collectionName}/earningsBarChart.json`, setEarningsBarChartData)
        axiosGet(`https://unity-admin-panel-default-rtdb.firebaseio.com/statements/earningsReport/${collectionName}/currentEarningStatusData.json`, setCurrentEarningStatusData)
    }, [selectedCollection])

    const chartRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getSmoothedBarChartOptions = () => {
        return {
            backgroundColor: "transparent",
            xAxis: {
                type: 'category',
                data: earningsBarChartData.map(e => e.label),
                axisLabel: {
                    //Customize the style of the x-axis labels
                    textStyle: {
                        color: theme === "dark" ? "#fff" : "#808191",
                        fontfamily: "Inter",
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 18
                    },
                    formatter: '{value}',
                },
                axisLine: {
                    show: false, // Hide the axis line
                },
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                interval: 20,
                min: 0,
                axisLabel: {
                    //Customize the style of the x-axis labels
                    textStyle: {
                        color: theme === "dark" ? "#fff" : "#808191",
                        fontfamily: "Inter",
                        fontSize: 13,
                        fontWeight: 600,
                        lineHeight: 18
                    },
                    formatter: '{value}'
                },
                axisLine: {
                    show: false, // Hide the axis line
                },
                splitLine: {
                    show: false, // Hide the axis line
                }
            },
            series: [
                {
                    type: 'bar',
                    data: earningsBarChartData.map(e => e.value_1),
                    smooth: true, // Enable smooth line
                    emphasis: {
                        focus: 'self', // Enable focus effect on series
                    },
                    itemStyle: {
                        color: '#6C5DD3', // Set the bar color to blue
                    }
                },
                {
                    type: 'bar',
                    data: earningsBarChartData.map(e => e.value_2),
                    smooth: true, // Enable smooth line
                    emphasis: {
                        focus: 'self', // Enable focus effect on series
                    },
                    itemStyle: {
                        color: '#A0D7E7', // Set the bar color to blue
                    }
                }
            ],
            tooltip: {
                trigger: 'axis', // Show tooltip on hover over multiple points
                axisPointer: {
                    type: 'shadow', // Use a line as axis pointer
                    animation: true, // Disable animation of the line
                },
            },
            grid: {
                containLabel: true,
                left: '3%',
                right: '0%',
                top: '15%',
                bottom: '0%'
            }
        }
    }

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
            <div className={styles.titleBar}>
                <motion.div layout className={styles.title}>{translation.earnings_report}</motion.div>
                <motion.div layout className={styles.filterSection}>
                    <div className={styles.filter} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 0.3)" }} tabIndex={0} onBlur={() => setIsDropDownMenuOpen(false)}>
                        <div className={styles.selected} onClick={() => setIsDropDownMenuOpen(prev => !prev)}>
                            <span>{selectedCollection}</span>
                            <IoIosArrowDown size={20} color={theme === "dark" ? "#fff" : "#000"} />
                        </div>
                        <AnimatePresence>
                            {isDropDownMenuOpen &&
                                <motion.div
                                    className={styles.dropDown}
                                    initial={{
                                        opacity: 0,
                                        transform: "translateY(-10px)"
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transform: "translateY(0px)"
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transform: "translateY(-10px)"
                                    }}
                                    style={{
                                        background: theme === "dark" ? "#1F2128" : "#fff",
                                        borderColor: theme === "dark" ? "#3a3a3a" : "#ededed"
                                    }}
                                >
                                    <div
                                        className={styles.option}
                                        style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                        onClick={() => { setSelectedCollection("Collection 1"); setIsDropDownMenuOpen(false) }}
                                    >
                                        Collection 1
                                    </div>
                                    <div
                                        className={styles.option}
                                        style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                        onClick={() => { setSelectedCollection("Collection 2"); setIsDropDownMenuOpen(false) }}
                                    >
                                        Collection 2
                                    </div>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
            <div className={styles.chartSection}>
                <div className={styles.left} style={{ width: screenWidth > 480 ? "25%" : "100%", maxWidth: screenWidth < 480 ? "220px" : "190px" }}>
                    {totalValue ? <motion.div className={styles.totalValue} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}><CountUp end={totalValue} />$</motion.div>
                        : <Skeleton style={{ height: "56px", width: "100%", borderRadius: 10 }} />
                    }
                    <motion.div layout className={styles.totalEarningSection}>
                        <div className={styles.imgContainer}>
                            <img src={totalEarningImg} alt="productImg.png" />
                        </div>
                        <motion.p layout>{translation.your_total_earning}</motion.p>
                    </motion.div>
                    <motion.hr layout style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.1)" : "1px solid #E4E4E4" }} />
                    <motion.div className={styles.lineSection}>
                        {earningsLineChartData ? <motion.div layout className={styles.singleLineBox}>
                            <LittleSmoothLine styles={styles} data={earningsLineChartData} />
                            <div className={styles.percentageRate}>
                                <img src={percentageArrow} alt="percentageArrow.png" />
                                <span>6%</span>
                            </div>
                        </motion.div>
                            : <Skeleton style={{ height: "64px", width: "100%", borderRadius: 10 }} />
                        }
                        <motion.p layout className={styles.updateSetting}>{translation.update_your_payout_method_in_settings}</motion.p>
                    </motion.div>
                </div>
                <div className={styles.right} style={{ width: screenWidth > 480 ? "70%" : "100%" }}>
                    {earningsBarChartData ?
                        <ReactECharts
                            ref={chartRef}
                            option={getSmoothedBarChartOptions()}
                            style={{ height: '205px', width: "100%" }}
                            className={styles.chart}
                        /> :
                        <div style={{ width: "100%", height: 205, margin: "-5px 0 5px 0" }}><Skeleton style={{ height: "100%", width: "100%", borderRadius: 16 }} /></div>
                    }
                </div>
            </div>
            {currentEarningStatusData ? <motion.div
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
                    gridTemplateColumns: screenWidth > 480 ? "repeat(3 , 1fr)" : "repeat(1 , 1fr)"
                }}
            >
                <StatusGridChild
                    styles={styles}
                    icon={usersIcon}
                    mainText={"total_earnings"}
                    progressLineColor={"#6C5DD3"}
                    value={currentEarningStatusData[0].value}
                    target={currentEarningStatusData[0].target}
                    currency={true}
                    border={{ borderRight: screenWidth > 480 ? (theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4") : "none", borderBottom: screenWidth < 480 ? (theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4") : "none" }}
                    
                />
                <StatusGridChild
                    styles={styles}
                    icon={clicksIcon}
                    mainText={"item_earnings"}
                    progressLineColor={"#FFA2C0"}
                    value={currentEarningStatusData[1].value}
                    target={currentEarningStatusData[1].target}
                    currency={true}
                    border={{ borderRight: screenWidth > 480 ? (theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4") : "none", borderBottom: screenWidth < 480 ? (theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : " 1px solid #E4E4E4") : "none" }}
                />
                <StatusGridChild
                    styles={styles}
                    icon={salesIcon}
                    mainText={"tax_withheld"}
                    progressLineColor={"#7FBA7A"}
                    value={currentEarningStatusData[2].value}
                    target={currentEarningStatusData[2].target}
                    currency={true}
                />
            </motion.div>
                : <Skeleton style={{ height: screenWidth < 480 ? "402px" : "135px", width: "100%", borderRadius: 16, marginTop: 30 }} />
            }
        </motion.div>
    )
}


export default memo(EarningsReport)