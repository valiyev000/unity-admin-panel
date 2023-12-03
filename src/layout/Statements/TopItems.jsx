import { memo, useContext, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import styles from './styles/TopItems.module.scss'
import imgProductNull from '../../images/imgProductNull.png'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { IoIosArrowForward } from "react-icons/io";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function TopItems() {

    const { theme, screenWidth, translation, axiosGet, lang } = useContext(contextApi)

    const [data, setData] = useState(null)

    useEffect(() => {
        axiosGet("https://unity-admin-panel-default-rtdb.firebaseio.com/db/products.json", setData)
    }, [])

    return (
        <motion.div
            className={styles.main}
            layoutId='topItems'
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "65px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 && screenWidth < 1200 ? "48%" : "100%"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "65px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 && screenWidth < 1200 ? "48%" : "100%",
            }}
        >
            <motion.div className={styles.title} layout>{translation.your_top_items}</motion.div>
            {data ?
                <motion.ul
                    initial={{
                        transform: "scale(1.2)"
                    }}
                    animate={{
                        transform: "scale(1.0)"
                    }}
                >
                    {Object.keys(data).slice(0, 4).map(key => (
                        <li key={key}>
                            <Link to="/products" style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>
                                <div className={styles.imgBox}>
                                    <img src={data[key].img ? data[key].img : imgProductNull} alt="demo.png" />
                                </div>
                                <div className={styles.details}>
                                    <motion.div className={styles.name} layout>{data[key][`name_${lang}`].length > 12 ? `${data[key][`name_${lang}`].slice(0, 12)}...` : data[key][`name_${lang}`]}</motion.div>
                                    <motion.div className={styles.category} layout>{data[key][`category_${lang}`]}</motion.div>
                                    <button className={styles.price}>{data[key].currency}{data[key].price}</button>
                                </div>
                                <IoIosArrowForward className={styles.arrowIcon} />
                            </Link>
                            <div className={styles.shadow}></div>
                        </li>
                    ))}
                </motion.ul>
                :
                <Skeleton style={{ height: "444px", width: "100%", borderRadius: 12, marginTop: "20px" }} />
            }
        </motion.div>
    )
}

export default memo(TopItems)