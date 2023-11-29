import ReactECharts from 'echarts-for-react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default function ActiveUsersBar({ styles, data }) {

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

    const getBarChartOptions = () => {
        return {
            backgroundColor: "#3F8CFF",
            xAxis: {
                type: 'category',
                data: data.map(e=>e.day),
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
                    show: true,
                    //Customize the style of the x-axis labels
                    textStyle: {
                        color: "#fff",
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
                    data: data.map(e=>e.value),
                    type: 'bar',
                    showBackground: true,
                    color: "white",
                    backgroundStyle: {
                        color: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: [10, 10, 10, 10], // Set border-radius for top-left and top-right corners
                    },
                    barWidth: 5,
                    itemStyle: {
                        borderRadius: [10, 10, 10, 10], // Set border-radius for top-left and top-right corners
                    },
                    markLine: {
                        silent: false,
                        symbol: 'none', // You can customize the symbol
                        label: {
                            show: false,
                        },
                        lineStyle: {
                            color: 'rgba(255,255,255,0.2)', // You can customize the line color
                            type: 'solid', // You can customize the line type
                        },
                        data: [
                            {
                                type: 'average',
                                name: 'Average Value',
                            },
                        ],
                    },
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
                right: "5%",
                bottom: "9%",
                top: "15%",
                left: "15%"
            },
        }
    }

    return (
        <ReactECharts
        ref={chartRef}
            className={styles.barChart}
            option={getBarChartOptions()}
            style={{height: 214, width: "100%"}}
        />
    )
}
