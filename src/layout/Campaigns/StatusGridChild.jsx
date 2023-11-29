import {motion} from 'framer-motion'
import { useContext } from 'react'
import contextApi from '../../StateManager'
import LinearRange from '../../components/LinearRange'

export default function StatusGridChild({styles, icon, mainText, value, target, border, progressLineColor, currency}) {

    const {theme,  translation, convertValue, screenWidth} = useContext(contextApi)

    return (
        <motion.div layout className={styles.gridChild} initial={{...border ,padding: screenWidth < 360 ? "14px" : "24px"}} animate={{...border, padding: screenWidth < 360 ? "14px" : "24px"}}>
            <div className={styles.iconAndName}>
                <img src={icon} alt="usersIcon.png" />
                <motion.div layout className={styles.name} animate={{ color: theme === "dark" ? "#fff" : "#808191" }}>{translation[mainText]}</motion.div>
            </div>
            <div className={styles.value}>{`${convertValue(value)}${currency ? "$" : ""}`}</div>
            <LinearRange
                width={"100%"}
                height={3}
                progressLineColor={progressLineColor}
                value={value}
                target={target}
            />
        </motion.div>
    )
}
