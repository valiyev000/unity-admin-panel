import { memo, useContext, useEffect, useRef, useState } from 'react'
import styles from './styles/Users.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import ReactECharts from 'echarts-for-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

function Users() {

    const { theme, screenWidth, translation, setIsSettingOpen, axiosGet, convertValue } = useContext(contextApi)

    const chartRef1 = useRef(null);
    const chartRef2 = useRef(null);
    const [newUserChart1, setNewUserChart1] = useState(null)
    const [newUserChart2, setNewUserChart2] = useState(null)
    const [totalValue1, setTotalValue1] = useState(0)
    const [totalValue2, setTotalValue2] = useState(0)

    useEffect(() => {
        const handleResize = () => {
            if (chartRef1.current) {
                chartRef1.current.getEchartsInstance().resize();
            }
            if (chartRef2.current) {
                chartRef2.current.getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize); //todo resize ederken aninda olcunu tutmasi ucun resize eventi mutleq olmalidi

        // setTimeout(() => {
        //     //todo Resize edende bezen duzgun olmayan olcude daynirdi, ona gore yarimsaniye sonra duzletme meqsedile chart yeniden render olunur
        //     try {
        //         chartRef1.current.getEchartsInstance().resize()
        //         chartRef2.current.getEchartsInstance().resize()
        //     } catch (error) {
        //         console.log(error)
        //     }
        // }, 1000);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    useEffect(()=>{
        axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/users/bar1Chart.json",setNewUserChart1)
        axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/campaigns/users/bar2Chart.json",setNewUserChart2)
    },[])

    const getSmoothedBar1ChartOptions = () => {
        return {
            backgroundColor: "transparent",
            xAxis: {
                type: 'category',
                data: newUserChart1.map(e=>e.month),
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
                    data: newUserChart1.map(e=>e.value),
                    smooth: true, // Enable smooth line
                    emphasis: {
                        itemStyle: {
                            color: '#0049C6'
                        }
                    },
                    barWidth: 21,
                    itemStyle: {
                        color: '#A0D7E7',
                        borderRadius: [4, 4, 4, 4]
                    }
                }
            ],
            // tooltip: {
            // },
            grid: {
                containLabel: true,
                left: '1%',
                right: '1%',
                top: '5%',
                bottom: '0%'
            },
        }
    }
    const getSmoothedBar2ChartOptions = () => {
        return {
            backgroundColor: "transparent",
            xAxis: {
                type: 'category',
                data: newUserChart2.map(e=>e.month),
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
                    data: newUserChart2.map(e=>e.value),
                    smooth: true, // Enable smooth line
                    emphasis: {
                        itemStyle: {
                            color: '#6C5DD3'
                        }
                    },
                    barWidth: 21,
                    itemStyle: {
                        color: '#CFC8FF',
                        borderRadius: [4, 4, 4, 4]
                    }
                }
            ],
            // tooltip: {
            // },
            grid: {
                containLabel: true,
                left: '1%',
                right: '1%',
                top: '5%',
                bottom: '0%'
            },
        }
    }


    useEffect(()=>{
        if (newUserChart1 !== null && newUserChart2 !== null) {
            setTotalValue1(newUserChart1.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0))
            setTotalValue2(newUserChart2.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0))
        }
    },[newUserChart1, newUserChart2])

    return (
        <motion.div
            className={styles.main}
            layoutId='users'
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
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <motion.div layout className={styles.title}>{translation.users}</motion.div>
            {newUserChart1 ?
                <motion.div
                    className={styles.chartSection}
                    initial={{
                        transform: "scale(1.2)",
                        boxShadow: theme === "dark" ? "0px -1px 0px 0px rgba(228, 228, 228, 0.1) inset" : "0px -1px 0px 0px #E4E4E4 inset"
                    }}
                    animate={{
                        transform: "scale(1.0)",
                        boxShadow: theme === "dark" ? "0px -1px 0px 0px rgba(228, 228, 228, 0.1) inset" : "0px -1px 0px 0px #E4E4E4 inset"
                    }}
                >
                    <motion.div layout className={styles.left}>
                        <motion.div layout className={styles.newUsers}>{translation.new_users}</motion.div>
                        <motion.div layout className={styles.count}>{convertValue(totalValue1)}</motion.div>
                        <motion.div layout className={styles.percentage} style={{color: newUserChart1[newUserChart1.length-1].value/newUserChart1[0].value*100-100 >= 0 ? "#7FBA7A" : "#EE5353"}}>{newUserChart1[newUserChart1.length-1].value/newUserChart1[0].value*100-100}%</motion.div>
                    </motion.div>
                    <motion.div layout className={styles.right}>
                        <ReactECharts
                            ref={chartRef1}
                            option={getSmoothedBar1ChartOptions()}
                            style={{ height: "100px", width: "100%" }}
                            className={styles.chart}
                        />
                    </motion.div>
                </motion.div>
                : <div className={styles.skeleton}><Skeleton style={{ height: screenWidth < 480 ? "140px" : "135px", width: "100%", borderRadius: 16 }} /></div>
            }
            {newUserChart2 ?
                <motion.div
                    className={styles.chartSection}
                    initial={{
                        transform: "scale(1.2)",
                        boxShadow: theme === "dark" ? "0px -1px 0px 0px rgba(228, 228, 228, 0.1) inset" : "0px -1px 0px 0px #E4E4E4 inset"
                    }}
                    animate={{
                        transform: "scale(1.0)",
                        boxShadow: theme === "dark" ? "0px -1px 0px 0px rgba(228, 228, 228, 0.1) inset" : "0px -1px 0px 0px #E4E4E4 inset"
                    }}
                >
                    <motion.div layout className={styles.left}>
                        <motion.div layout className={styles.newUsers}>{translation.new_users}</motion.div>
                        <motion.div layout className={styles.count}>{convertValue(totalValue2)}</motion.div>
                        <motion.div layout className={styles.percentage} style={{color: newUserChart2[newUserChart2.length-1].value/newUserChart2[0].value*100-100 >= 0 ? "#7FBA7A" : "#EE5353"}}>{newUserChart2[newUserChart2.length-1].value/newUserChart2[0].value*100-100}%</motion.div>
                    </motion.div>
                    <motion.div layout className={styles.right}>
                        <ReactECharts
                            ref={chartRef2}
                            option={getSmoothedBar2ChartOptions()}
                            style={{ height: "100px", width: "100%" }}
                            className={styles.chart}
                        />
                    </motion.div>
                </motion.div>
                : <div className={styles.skeleton}><Skeleton style={{ height: screenWidth < 480 ? "140px" : "135px", width: "100%", borderRadius: 16 }} /></div>
            }
            <button className={styles.btn} onClick={() => setIsSettingOpen(true)}><motion.div layout>{translation.go_to_setting}</motion.div></button>
        </motion.div>
    )
}


export default memo(Users)