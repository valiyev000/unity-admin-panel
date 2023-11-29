import { memo, useContext, useEffect, useRef, useState } from "react"
import styles from './styles/EarningsByItem.module.scss'
import { motion } from 'framer-motion'
import contextApi from "../../StateManager"
import ReactECharts from 'echarts-for-react';
import CountUp from 'react-countup';


function EarningsByItem({data}) {

    const { translation, theme, lang, screenWidth } = useContext(contextApi)

    const chartRef = useRef(null);
    const [totalEarning, setTotalEarning] = useState(null)

    useEffect(() => {
        const handleResize = () => {
            if (chartRef.current) {
                chartRef.current.getEchartsInstance().resize();
            }
        };

        window.addEventListener('resize', handleResize);

        setTimeout(() => {
            //todo resize edende bezen duzgun olmayan olcude daynirdi, ona gore yarimsaniye sonra duzletme meqsedile chart yeniden render olunur
            try {
                chartRef.current.getEchartsInstance().resize()
            } catch (error) {
                console.log(error)
            }
        }, 1000);

        setTotalEarning(data.reduce((accumulator, item) => accumulator + item.value, 0))

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getSmoothedBarChartOptions = () => {
        return {
            series: [
                {
                    type: 'pie',
                    data: data && data.map(item => ({
                        value: item.value,
                        name: item[`name_${lang}`],
                        itemStyle: {
                            color: item.background
                        }
                    })),
                    radius: ['65%', '95%'],
                    emphasis: {
                        scale: true,
                        show: true,
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }

                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                }
            ],
        }
    }

    return (
        <motion.div
            className={styles.main}
            layoutId='EarningsByItem'
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "100px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 && screenWidth < 1200 ? "48%" : "100%"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "100px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 && screenWidth < 1200 ? "48%" : "100%",
            }}
        >
            <ReactECharts
                ref={chartRef}
                option={getSmoothedBarChartOptions()}
                style={{ height: '250px', width: "100%" }}
                className={styles.chart}
            />
            <motion.div layout className={styles.title}>{translation.earnings_by_item}</motion.div>
            <motion.div layout className={styles.totalEarning}><CountUp end={totalEarning}/></motion.div>
            <motion.div layout className={styles.updateSetting}>{translation.update_your_payout_method_in_settings}</motion.div>
            <motion.div layout className={styles.nameBar}>
                {data && data.map((e, i) => (
                    <motion.div layout className={styles.section} key={i}>
                        <motion.div layout className={styles.color} style={{background: e.background}}></motion.div>
                        <motion.div layout className={styles.name}>{e[`name_${lang}`]}</motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    )
}


export default memo(EarningsByItem)