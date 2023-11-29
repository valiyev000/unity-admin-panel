import { memo, useContext } from 'react'
import styles from './styles/LatestSales.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import { HiArrowSmRight } from "react-icons/hi";
import { Link } from 'react-router-dom/cjs/react-router-dom';
import imgProductNull from '../../images/imgProductNull.png'

function LatestSales() {

    const { theme, screenWidth, translation, lang } = useContext(contextApi)

    const salesData = [
        {
            id: 1,
            name_az: "Pixel Pro Kamera",
            name_en: "Pixel Pro Camera",
            category_az: "Fotografiya",
            category_en: "Photography",
            img: "https://i.ibb.co/M2nSCjw/product2-Img-Done.png",
            soldPrice: 35,
            currency: "$"
        },
        {
            id: 2,
            name_az: "Akıllı Saat",
            name_en: "Smart Watch",
            category_az: "Aksesuar",
            category_en: "Accessory",
            soldPrice: 25,
            currency: "₼"
        },
        {
            id: 3,
            name_az: "Enerji Verimliliği Lambası",
            name_en: "Energy Efficient Lamp",
            category_az: "Ev Gereçleri",
            category_en: "Household",
            img: "https://i.ibb.co/cXNT7Q2/product3-Img-Done.png",
            soldPrice: 59,
            currency: "$"
        }
    ]

    return (
        <motion.div
            className={styles.main}
            layoutId='latestSales'
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "40px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 ? "48%" : "100%"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "40px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 ? "48%" : "100%"
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
        >
            <Link to='/statements' className={styles.title}>
                <motion.div layout className={styles.titleLeft}>{translation.latest_sales}</motion.div>
                <HiArrowSmRight />
            </Link>
            <ul>
                {salesData && salesData.map(product => (
                    <Link to='/statements' key={product.id} className={theme === "dark" ? styles.dark : ""}>
                        <div className={styles.left}>
                            <img src={product.img === undefined ? imgProductNull : product.img} alt="imgTest.png" />
                            <div className={styles.container}>
                                <div className={styles.name}>{product[`name_${lang}`]}</div>
                                <div className={styles.category}>{product[`category_${lang}`]}</div>
                            </div>
                        </div>
                        <div className={styles.right}>+{product.currency}{product.soldPrice}</div>
                    </Link>
                ))}
            </ul>
            <div className={styles.buttonContainer}>
                <Link to='/statements' className={styles.btn}><motion.div layout>{translation.show_all_report}</motion.div></Link>
            </div>
        </motion.div>
    )
}

export default memo(LatestSales)