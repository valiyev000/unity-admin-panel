import { memo, useContext, useEffect, useRef } from 'react'
import styles from './styles/Income.module.scss'
import contextApi from '../../StateManager'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react';
import { Link } from 'react-router-dom'

function Earning({ incomeData }) {

    const { theme, screenWidth, translation } = useContext(contextApi)

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
                data: incomeData.map(e=>e.label),
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
                    data: incomeData.map(e=>e.value_1),
                    smooth: true, // Enable smooth line
                    emphasis: {
                        focus: 'self', // Enable focus effect on series
                    },
                    barWidth: 20,
                    itemStyle: {
                        color: '#6C5DD3', // Set the bar color to blue
                    }
                },
                {
                    type: 'bar',
                    data: incomeData.map(e=>e.value_2),
                    smooth: true, // Enable smooth line
                    emphasis: {
                        focus: 'self', // Enable focus effect on series
                    },
                    barWidth: 20,
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
                left: '10%',
                right: '10%',
                top: '15%',
                bottom: '0%'
            },
        }
    }


    return (
        <motion.div
            className={styles.container}
            layoutId='earning'
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.95)",
                width: screenWidth <= 480 ? "100%" : "48%",
                margin: screenWidth <= 480 ? "20px 0 0 0" : ""
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                width: screenWidth <= 480 ? "100%" : "48%",
                margin: screenWidth <= 480 ? "20px 0 0 0" : ""
            }}
            exit={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)"
            }}
            transition={{
                duration: 0.5, ease: "easeInOut"
            }}
        >
            <motion.div layout className={styles.title}>{translation.income}</motion.div>
            <div className={styles.innerContainer} style={{ background: theme === "dark" ? "#1F2128" : "#FFF" }}>
                <ReactECharts
                    ref={chartRef}
                    option={getSmoothedBarChartOptions()}
                    style={{ height: '205px', width: "100%" }}
                    className={styles.chart}
                />
                <Link className={styles.btn} to="/payouts"><motion.div layout>{translation.withdraw_earning}</motion.div></Link>
            </div>
        </motion.div>
    )
}


export default memo(Earning)