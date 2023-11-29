import { motion } from 'framer-motion'
import { useContext } from 'react'
import contextApi from '../StateManager'

export default function LinearRange({ width, height, progressLineColor, value, target, delay }) {

    const { theme } = useContext(contextApi)

    return (
        <motion.div
            className="progressLine"
            initial={{
                width: width,
                height: height,
                background: theme === "dark" ? "rgba(228, 228, 228, 0.10)" : "#E4E4E4",
                borderRadius: +height/2,
                overflow: "hidden"
            }}
            animate={{
                width: width,
                height: height,
                background: theme === "dark" ? "rgba(228, 228, 228, 0.10)" : "#E4E4E4",
                borderRadius: +height/2,
                overflow: "hidden"
            }}
            transition={{duration: 2}}
        >
            <motion.div
                className="progressInline"
                initial={{ background: progressLineColor, height: "100%", borderRadius: +height/2, width: "0%" }}
                animate={{ background: progressLineColor, height: "100%", borderRadius: +height/2, width: `${value / target * 100}%` }}
                transition={{
                    type: "spring",
                    stiffness: 120,
                    delay: delay ? delay : 1
                }}
                viewport={{ once: true }}
            ></motion.div>
        </motion.div>
    )
}
