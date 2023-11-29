import { motion } from "framer-motion";
import styles from "../styles/sub-components/LangBtn.module.scss";
import { useContext } from "react";
import contextApi from "../StateManager";


const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
};

const toggleVariants = {
    az: {
        background: 'linear-gradient(270deg, rgba(108,93,211,1) 0%, rgba(251,251,251,1) 100%)',
        transition: {
            duration: 0.5,
        },
    },
    en: {
        background: 'linear-gradient(90deg, rgba(108,93,211,1) 0%, rgba(251,251,251,1) 100%)',
        transition: {
            duration: 0.5,
        },
    },
};


export default function LangBtn() {

    const { lang, setLang } = useContext(contextApi)

    const toggleSwitch = () => setLang(prev => prev === "en" ? "az" : "en");


    return (
        <motion.div
            className={styles.switch}
            onClick={toggleSwitch}
            style={{ justifyContent: lang === "az" ? "flex-start" : "flex-end" }}
            animate={lang === "en" ? 'en' : 'az'}
            variants={toggleVariants}
        >
            <motion.div
                whileHover={{ scale: 1.15 }}
                style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
                className={styles.handle}
                layout
                transition={spring}
            >
                {lang === "az" ? "Aze" : "Eng"}
            </motion.div>
        </motion.div>
    )
}
