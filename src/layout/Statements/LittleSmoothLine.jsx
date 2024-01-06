import ReactECharts from 'echarts-for-react';
import { useEffect, useRef } from 'react';

export default function LittleSmoothLine({ styles, data }) {

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
                data: data.map(e=>e.hour),
                axisLabel: {
                    show: false,
                    //Customize the style of the x-axis labels
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
                    data: data.map(e=>e.value),
                    type: 'line',
                    smooth: true, // Enable smooth line
                    emphasis: {
                        focus: 'self', // Enable focus effect on series
                    },
                    symbolSize: 1
                }
            ],
            grid: {
                containLabel: true,
                left: '-5%',
                right: '-5%',
                top: '10%',
                bottom: '5%'
            },
        };
    };

    return (
        <ReactECharts
            ref={chartRef}
            className={styles.LineChart}
            option={getSmoothedLineChartOptions()}
            style={{ height: '64px', width: "60%" }}
        />
    )
}
