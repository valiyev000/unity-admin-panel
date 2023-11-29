import { memo, useContext, useEffect, useRef } from 'react'
import styles from './styles/EarningMonth.module.scss'
import contextApi from '../../StateManager'
import { AnimatePresence, motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react';

function EarningMonth({data}) {

    const { theme, screenWidth, translation, lang } = useContext(contextApi)
    const chartRef = useRef(null);


    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize); //todo resize ederken aninda olcunu tutmasi ucun resize eventi mutleq olmalidi

        setTimeout(() => {
            //todo Resize edende bezen duzgun olmayan olcude daynirdi, ona gore yarimsaniye sonra duzletme meqsedile chart yeniden render olunur
            try {
                chartRef.current.getEchartsInstance().resize()
            } catch (error) {
                console.log(error)
            }
        }, 1000);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    const getSmoothedBarChartOptions = () => {
        return {
            backgroundColor: "transparent",
            xAxis: {
                type: 'category',
                data: ["", "", "", "", ""],
                axisLabel: {
                    //Customize the style of the x-axis labels
                    show: false,
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
                axisLabel: {
                    //Customize the style of the x-axis labels
                    show: false
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
                    data: data.chart,
                    smooth: true, // Enable smooth line
                    emphasis: {
                        itemStyle: {
                            color: '#0049C6'
                        }
                    },
                    barWidth: screenWidth > 1200 || screenWidth < 480 ? 21 : 30,
                    itemStyle: {
                        color: '#A0D7E7',
                        borderRadius: [4, 4, 4, 4]
                    }
                }
            ],
            tooltip: {
                show: true,
                trigger: "item",
            },
            grid: {
                containLabel: true,
                left: '1%',
                right: '1%',
                top: '5%',
                bottom: '0%',
            }
        }
    }

    const handleClick = (e) => {
        if (lang === "en") {
            e.target.innerHTML = "Coming soon..."
        } else {
            e.target.innerHTML = "Tezliklə..."
        }

        setTimeout(() => {
            e.target.innerHTML = translation.withdraw_all_earning
        }, 1500);
    }

    return (
        <>
            {screenWidth > 1200 || screenWidth < 480 ?
                <motion.div
                    className={styles.main}
                    initial={{
                        transform: "scale(1.2)",
                        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                        height: screenWidth < 480 ? "420px" : "407px",
                        marginTop: screenWidth > 1200 ? "40px" : "",
                        marginBottom: "40px"
                    }}
                    animate={{
                        transform: "scale(1.0)",
                        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                        height: screenWidth < 480 ? "420px" : "407px",
                        marginTop: screenWidth > 1200 ? "40px" : "",
                        marginBottom: "40px"
                    }}
                    exit={{
                        transform: "scale(1.2)",
                        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                        height: screenWidth < 480 ? "420px" : "407px",
                        marginTop: screenWidth > 1200 ? "40px" : "",
                        marginBottom: "40px"
                    }}
                    layoutId='earningMonth'
                >
                    <ReactECharts
                        ref={chartRef}
                        option={getSmoothedBarChartOptions()}
                        style={{ minHeight: "100px", height: "100px", width: "130px" }}
                        className={styles.chart}
                    />
                    <motion.p layout className={styles.title}>{translation.your_earning_this_month}</motion.p>
                    <motion.div layout className={styles.value}>{data.total}</motion.div>
                    <motion.div layout className={styles.description}>{translation.update_your_payout_method_in_settings}</motion.div>
                    <button className={styles.btn} onClick={(e) => handleClick(e)}>{translation.withdraw_all_earning}</button>
                </motion.div>
                : <motion.div
                    className={styles.mainTablet}
                    initial={{
                        transform: "scale(1.2)",
                        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                        marginBottom: "40px",
                        height: "310px"
                    }}
                    animate={{
                        transform: "scale(1.0)",
                        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                        marginBottom: "40px",
                        height: "310px"
                    }}
                    exit={{
                        transform: "scale(1.2)",
                        boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                        marginBottom: "40px",
                        height: "310px"
                    }}
                    layoutId='earningMonthTablet'
                >
                    <motion.div className={styles.title} layout>{translation.your_earning_this_month}</motion.div>
                    <div className={styles.content}>
                        <motion.div className={styles.left} layout>
                            <ReactECharts
                                ref={chartRef}
                                option={getSmoothedBarChartOptions()}
                                style={{ height: "80%", width: "200px" }}
                                className={styles.chart}
                            />
                        </motion.div>
                        <motion.div className={styles.right} layout>
                            <motion.div layout className={styles.value}>{data.total}</motion.div>
                            <motion.div layout className={styles.description}>{translation.update_your_payout_method_in_settings}</motion.div>
                            <button className={styles.btn} onClick={(e) => handleClick(e)}>{translation.withdraw_all_earning}</button>
                        </motion.div>
                    </div>
                </motion.div>
            }
        </>
    )
}

export default memo(EarningMonth)