import { memo, useContext, useEffect, useRef } from 'react'
import styles from './styles/Affiliate.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import ReactECharts from 'echarts-for-react';

function Affiliate({affiliateData}) {

    const { theme, screenWidth, translation , lang } = useContext(contextApi)

    const chartRef = useRef(null);


    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize); //todo resize ederken aninda olcunu tutmasi ucun resize eventi mutleq olmalidi

        setTimeout(() => {
            //todo resize edende bezen duzgun olmayan olcude daynirdi, ona gore yarimsaniye sonra duzletme meqsedile chart yeniden render olunur
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
                data: affiliateData.map(e => e[`label_${lang}`]),
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
                    margin: 30
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
                interval: 25,
                max: 100,
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
                    formatter: '{value}k'
                },
                axisLine: {
                    show: false, // Hide the axis line
                },
                splitLine: {
                    show: true, // Hide the axis line
                }
            },
            series: [
                {
                    type: 'bar',
                    data: affiliateData.map(e => e.value_1),
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
                    data: affiliateData.map(e => e.value_2),
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
                left: '1%',
                right: '1%',
                top: '5%',
                bottom: '0%'
            },
        }
    }


    return (
        <motion.div
            className={styles.main}
            layoutId="Affiliate"
            initial={{
                transform: "scale(1.1)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth <= 480 || screenWidth >= 1200 ? "100%" : "48%",
                marginTop: screenWidth >= 1200 ? "45px" : "20px"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth <= 480 || screenWidth >= 1200 ? "100%" : "48%",
                marginTop: screenWidth >= 1200 ? "45px" : "20px"
            }}
            transition={{
                duration: 0.5, ease: "easeInOut"
            }}
        >
            <motion.div className={styles.title} layout>{translation.affiliate_impressions}</motion.div>
            <ReactECharts
                ref={chartRef}
                option={getSmoothedBarChartOptions()}
                style={{ height: "calc(100% - 56px)", width: "100%" }}
                className={styles.chart}
            />
        </motion.div>
    )
}


export default memo(Affiliate)