import styles from "../styles/sub-components/SwitchUser.module.scss";
import userAvatar from '../images/userAvatar.png'
import { memo, useContext } from "react";
import contextApi from "../StateManager";
import { AnimatePresence, motion } from "framer-motion";


function SwitchUser(props) {

    const { theme, isNavOpen , translation, avatar, user, setIsSettingOpen } = useContext(contextApi)

    const ARROW_ICON_STYLE = {
        stroke: theme === "dark" ? "#fff" : "#11142D"
    }

    const handleClick = ()=>{
        setIsSettingOpen(true)
    }

    return (
        <div className={styles.main} style={{justifyContent: props.justifyContent}} onClick={handleClick}>
            <img src={avatar ? avatar : userAvatar} alt="userAvatar.png" />
            <AnimatePresence>
                {isNavOpen &&
                    <motion.div
                        className={styles.context}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                    >
                        <div className={`${styles.name} ${theme === "dark" ? styles.dark : ""}`}>{user.displayName}</div>
                        <div className={styles.status}>{translation.free_account}</div>
                    </motion.div>
                }
            </AnimatePresence>
            {isNavOpen &&
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16" fill="none">
                    <path d="M1 5L5 1L9 5" stroke={ARROW_ICON_STYLE.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 11L5 15L1 11" stroke={ARROW_ICON_STYLE.stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            }
        </div>
    )
}

export default memo(SwitchUser)