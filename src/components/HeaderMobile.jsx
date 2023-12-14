import { useContext } from 'react'
import styles from '../styles/components/HeaderMobile.module.scss'
import { Squeeze as Hamburger } from 'hamburger-react'
import contextApi from '../StateManager'
import userAvatar from '../images/userAvatar.png'
import { AnimatePresence, motion } from 'framer-motion'
import unityLogoLight from '../images/unityLogoLight.png'
import unityLogoDark from '../images/unityLogoDark.png'


export default function HeaderMobile() {

    const { isNavOpen, setIsNavOpen, theme, testForNotification, screenWidth , forSearch, avatar, setIsSettingOpen } = useContext(contextApi)

    const spring = {
        type: "spring",
        stiffness: 1400,
        damping: 20
    };

    function handleClick() {
        setIsNavOpen(true)
        forSearch.current.focus()
    }


    return (
        <motion.header
            className={`${styles.header} ${theme === "dark" ? styles.dark : ""}`}
            initial={{ transform: "translateY(-100%)" }}
            animate={{ transform: "translateY(0%)" }}
            exit={{ transform: "translateY(-100%)" }}
            transition={{ duration: 0.4 }}
        >
            <div className={styles.left}>
                <Hamburger toggled={isNavOpen} toggle={setIsNavOpen} size={20} color={theme === "dark" ? "#fff" : "#000"} />
                <AnimatePresence>
                    {isNavOpen && screenWidth > 360 && (theme === "light"
                        ? <motion.img
                            src={unityLogoLight}
                            alt="unityLogoLight.png"
                            initial={{ transform: "translateX(-50%)", opacity: 0 }}
                            animate={{ transform: "translateX(0%)", opacity: 1 }}
                            exit={{ transform: "translateX(-50%)", opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                        : <motion.img
                            src={unityLogoDark}
                            alt="unityLogoDark.png"
                            initial={{ transform: "translateX(-50%)", opacity: 0 }}
                            animate={{ transform: "translateX(0%)", opacity: 1 }}
                            exit={{ transform: "translateX(-50%)", opacity: 0 }}
                            transition={{ duration: 0.4 }}
                        />
                    )}
                </AnimatePresence>
            </div>
            <div className={styles.right}>
                <AnimatePresence>
                    {!isNavOpen &&
                        <motion.svg
                            onClick={handleClick}
                            initial={{ transform: "scale(0)", opacity: 0 }}
                            animate={{ transform: "scale(1)", opacity: 1 }}
                            exit={{ transform: "scale(0)", opacity: 0 }}
                            whileHover={{transform: "scale(1.2)"}}
                            transition={spring}
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"
                        >
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.61154 0C4.30323 0 0 4.20819 0 9.39926C0 14.5903 4.30323 18.7985 9.61154 18.7985C11.8819 18.7985 13.9684 18.0287 15.613 16.7415L18.7371 19.7886L18.8202 19.8586C19.1102 20.0685 19.5214 20.0446 19.7839 19.7873C20.0726 19.5043 20.072 19.0459 19.7825 18.7636L16.6952 15.7523C18.2649 14.0794 19.2231 11.8487 19.2231 9.39926C19.2231 4.20819 14.9198 0 9.61154 0ZM9.61154 1.44774C14.1022 1.44774 17.7426 5.00776 17.7426 9.39926C17.7426 13.7908 14.1022 17.3508 9.61154 17.3508C5.12086 17.3508 1.48044 13.7908 1.48044 9.39926C1.48044 5.00776 5.12086 1.44774 9.61154 1.44774Z" fill={theme === "light" ? "#11142D" : "#fff"} />
                        </motion.svg>
                    }
                </AnimatePresence>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 -1 28 25" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 11V8C18 4.13401 14.866 1 11 1C7.13401 1 4 4.13401 4 8V11C4 14.3 1 15.1 1 17C1 18.7 4.9 20 11 20C17.1 20 21 18.7 21 17C21 15.1 18 14.3 18 11Z" stroke={theme === "light" ? "#11142D" : "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 22C9.98902 22 9.03902 21.966 8.14502 21.9C8.53619 23.1478 9.69236 23.997 11 23.997C12.3077 23.997 13.4639 23.1478 13.855 21.9C12.961 21.966 12.011 22 11 22Z" fill={theme === "light" ? "#1B1D21" : "#fff"} />
                    {testForNotification && <circle cx="17" cy="3" r="5.33333" fill="#FF754C" />}
                </svg>
                <img src={avatar ? avatar : userAvatar} alt="userAvatar.png" onClick={()=>setIsSettingOpen(true)} />
            </div>
        </motion.header>
    )
}
