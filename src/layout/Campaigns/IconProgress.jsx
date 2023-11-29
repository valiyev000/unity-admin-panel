import { useContext, useEffect, useState } from 'react'
import styles from './styles/IconProgress.module.scss'
import { motion } from 'framer-motion'
import contextApi from '../../StateManager'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import imgProductNull from '../../images/imgProductNull.png'

export default function IconProgress({iconData}) {

    const { theme, screenWidth, translation, lang } = useContext(contextApi)
    const [buttonText, setButtonText] = useState(translation.discover_more);

    function progressCircleTemplate(value, strokeColor) {
        return (
            <CircularProgressbar
                className={styles.rightCircular}
                value={value}
                maxValue={1}
                text={`${value * 100}%`}
                strokeWidth={11}
                styles={buildStyles({
                    pathTransitionDuration: 0.5,
                    pathColor: strokeColor,
                    textColor: `${theme === "dark" ? "#fff" : "#11142D"}`,
                    trailColor: `${theme === "dark" ? "#E4E4E41A" : "#e4e4e4"}`,
                })}
            />
        )
    }

    useEffect(() => {
        setButtonText(translation.discover_more)
    }, [translation])

    function handleClick() {
        if (lang === "en") {
            setButtonText('Coming soon...');
        } else {
            setButtonText("Tezliklə...")
        }

        setTimeout(() => {
            setButtonText(translation.discover_more);
        }, 1000);
    }

    return (
        <motion.div
            className={styles.main}
            layoutId='iconProgress'
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
            <motion.div layout className={styles.title}>{translation.icon_progress}</motion.div>
            <ul>
                {iconData && iconData.map(product => (
                    <li key={product.id} className={theme === "dark" ? styles.dark : ""} onClick={handleClick}>
                        <div className={styles.left}>
                            <img src={product.img === undefined ? imgProductNull : product.img} alt="imgTest.png" />
                            <div className={styles.container}>
                                <div className={styles.name}>{product[`name_${lang}`]}</div>
                                <div className={styles.category}>{product[`category_${lang}`]}</div>
                            </div>
                        </div>
                        <div className={styles.progressCircleBg}>{progressCircleTemplate(product.value, product.strokeColor)}</div>
                    </li>
                ))}
            </ul>
            <div className={styles.buttonContainer}>
                <button onClick={handleClick}><motion.div layout>{buttonText}</motion.div></button>
            </div>
        </motion.div>
    )
}
