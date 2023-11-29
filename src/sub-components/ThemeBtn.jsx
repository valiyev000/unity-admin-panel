import { motion } from "framer-motion";
import styles from "../styles/sub-components/ThemeBtn.module.scss";
import { useContext } from "react";
import contextApi from "../StateManager";
import { BsMoon, BsSun } from "react-icons/bs";


const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const toggleVariants = {
    light: {
        background: 'linear-gradient(90deg, rgba(251,181,57,1) 0%, rgba(244,68,94,1) 100%)',
        transition: {
            duration: 1.5, // Set the duration (in seconds) for the transition
        },
    },
    dark: {
        background: 'linear-gradient(90deg, rgba(53,17,151,1) 0%, rgba(197,62,148,1) 100%)',
        transition: {
            duration: 1.5, // Set the duration (in seconds) for the transition
        },
    },
};

export default function ThemeBtn() {

    const { theme, setTheme } = useContext(contextApi)

    const toggleSwitch = () => setTheme(prev => prev === "light" ? "dark" : "light");

    return (
        <motion.div
            className={styles.switch}
            onClick={toggleSwitch}
            style={{ justifyContent: theme === "light" ? "flex-start" : "flex-end" }}
            animate={theme === "dark" ? 'dark' : 'light'}
            variants={toggleVariants}
        >
            <motion.div
                whileHover={{ scale: 1.15 }}
                style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
                className={styles.handle}
                layout
                transition={spring}
            >
                {theme === "light" ? <BsSun /> : <BsMoon />}
            </motion.div>
        </motion.div>
    );
}
