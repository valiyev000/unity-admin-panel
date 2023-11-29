import { memo, useContext } from 'react'
import styles from './styles/EarningByItems.module.scss'
import contextApi from '../../StateManager'
import { motion } from 'framer-motion'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import imgProductNull from '../../images/imgProductNull.png'


function EarningByItems({ data }) {

    const { translation, theme, lang, screenWidth } = useContext(contextApi)


    return (
        <motion.div
            layoutId='EarningByItems'
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
            className={styles.main}
        >
            <motion.div layout className={styles.title}>{translation.earning_by_items}</motion.div>
            <ul className={styles.ul}>
                {Object.keys(data).slice(0, 3).map(key => (
                    <li className={styles.li} key={key}>
                        <Link to="/products" className={`${theme === "dark" ? styles.dark : ""}`}>
                            <div className={styles.left}>
                                <div className={styles.imgBox}>
                                    <img src={data[key].img === undefined ? imgProductNull : data[key].img} alt="demo.png" />
                                </div>
                                <div className={styles.content}>
                                    <motion.div layout className={styles.name}>{data[key][`name_${lang}`].length > 15 ? `${data[key][`name_${lang}`].slice(0, 10)}...` : data[key][`name_${lang}`]}</motion.div>
                                    <motion.div layout className={styles.category}>{data[key][`category_${lang}`]}</motion.div>
                                </div>
                            </div>
                            <IoIosArrowForward className={styles.icon} color={theme === "dark" ? "#fff" : "#11142D"} size={20} />
                        </Link>
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}


export default memo(EarningByItems)