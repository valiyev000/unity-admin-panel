import { memo, useContext, useEffect, useRef } from 'react'
import styles from './styles/Earning.module.scss'
import contextApi from '../../StateManager'
import { motion } from 'framer-motion'
import ReactECharts from 'echarts-for-react';
import { Link } from 'react-router-dom'

function Earning({ earningData }) {

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

    const getSmoothedLineChartOptions = () => {
        return {
            backgroundColor: "transparent",
            xAxis: {
                type: 'category',
                data: earningData.categories,
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
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                max: 60,
                interval: 20,
                axisLabel: {
                    //Customize the style of the x-axis labels
                    textStyle: {
                        color: theme === "dark" ? "#fff" : "#808191",
                        fontfamily: "Inter",
                        fontSize: 13,
                        fontWeight: 600,
                        lineHeight: 18
                    }
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
                    data: earningData.values_1,
                    type: 'line',
                    smooth: true, // Enable smooth line
                    emphasis: {
                        focus: 'self', // Enable focus effect on series
                    },
                    symbolSize: 1
                },
                {
                    data: earningData.values_2,
                    type: 'line',
                    smooth: true, // Enable smooth line
                    emphasis: {
                        focus: 'self', // Enable focus effect on series
                    },
                    symbolSize: 1
                },
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
                left: '5%',
                right: '0%',
                top: '10%',
                bottom: '0%'
            }
        };
    };


    return (
        <motion.div
            className={styles.container}
            layoutId='earning'
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.95)",
                width: screenWidth <= 480 ? "100%" : "48%",
                background: theme === "light" ? "#ffebf6" : "#3f8cff",
                margin: screenWidth <= 480 ? "20px 0 0 0" : ""
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                width: screenWidth <= 480 ? "100%" : "48%",
                background: theme === "light" ? "#ffebf6" : "#3f8cff",
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
            <motion.div layout className={styles.title}>{translation.earning}</motion.div>
            <div className={styles.innerContainer} style={{ background: theme === "dark" ? "#1F2128" : "#FFF" }}>
                <ReactECharts
                    ref={chartRef}
                    option={getSmoothedLineChartOptions()}
                    style={{ height: '205px', width: "100%" }}
                    className={styles.chart}
                />
                <Link className={styles.btn} to="/campaigns">{translation.go_analytics}</Link>
            </div>
        </motion.div>
    )
}


export default memo(Earning)