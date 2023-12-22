import { memo, useContext } from 'react'
import styles from '../styles/components/Navbar.module.scss'
import contextApi from '../StateManager'
import logoLight from '../images/unityLogoLight.png'
import logoDark from '../images/unityLogoDark.png'
import logoSmall from '../images/unityLogoSmall.png'
import { Squeeze as Hamburger } from 'hamburger-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { AnimatePresence, motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ThemeBtn from '../sub-components/ThemeBtn'
import LangBtn from '../sub-components/LangBtn'
import SwitchUser from '../sub-components/SwitchUser'


function Navbar() {

    const { screenWidth, isNavOpen, theme, setIsNavOpen, translation, isSettingOpen, setIsSettingOpen, testForNotification } = useContext(contextApi)
    //!testForNotification BUNU SILMELIYEM EN SONDA
    
    const [animationParent] = useAutoAnimate({ duration: 400 })

    const NAV_STYLE = {
        width: isNavOpen ? "220px" : "80px",
        padding: isNavOpen ? "0 20px" : "0 15px"
    }

    const NAV_TITLE_STYLE = {
        justifyContent: isNavOpen ? "space-between" : "center",
        height: screenWidth < 1200 ? "80px" : "100px",
    }

    const ICON_STYLE = {
        stroke: theme === "dark" ? "white" : "#1B1D21"
    }

    const TOGGLE_SECTION_STYLE = {
        height: isNavOpen ? "120px" : "0px",
        padding: isNavOpen ? "10px 0" : "0 0",
        boxShadow: theme === "light"
            ? "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
            : "rgba(205, 205, 162, 0.25) 0px 13px 27px -5px, rgba(255, 255, 255, 0.3) 0px 8px 16px -8px"
    }


    return (
        <div className={styles.container}>
            <nav className={`${theme === "dark" ? styles.dark : ""}`} style={NAV_STYLE}>
                <div className={styles.title} ref={animationParent} style={NAV_TITLE_STYLE}>
                    {isNavOpen && (theme === "dark"
                        ? <img src={logoDark} style={{width: screenWidth < 1200 ? "125px" : "150px"}} alt="logo.png" />
                        : <img src={logoLight} style={{width: screenWidth < 1200 ? "125px" : "150px"}} alt="logo.png" />
                    )}
                    {screenWidth < 1200 &&
                        <div className={styles.hamburgerIcon}>
                            <Hamburger toggled={isNavOpen} toggle={setIsNavOpen} size={20} color={theme === "dark" ? "#fff" : "#000"} />
                        </div>
                    }
                </div>
                {isNavOpen && (
                    <motion.div
                        className={styles.adminTools}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                    >
                        {translation.admin_tools}
                    </motion.div>
                )}
                {!isNavOpen && (
                    <motion.img
                        src={logoSmall}
                        alt="logoSmall.png"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        layout
                    />
                )}
                <ul>
                    <li>
                        <NavLink exact className={styles.link} activeClassName={styles.activeLink} to="/">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 21 22" fill="none">
                                <path opacity="0.4" d="M5.24485 13.7815L8.23799 9.89131L11.6522 12.5732L14.5812 8.79291" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <circle opacity="0.4" cx="17.9954" cy="3.20023" r="1.9222" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" d="M12.9245 2.12013H5.65675C2.64531 2.12013 0.77803 4.25286 0.77803 7.2643V15.3467C0.77803 18.3581 2.60869 20.4817 5.65675 20.4817H14.2609C17.2723 20.4817 19.1396 18.3581 19.1396 15.3467V8.30778" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <AnimatePresence>
                                {isNavOpen &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        {translation.overview}
                                    </motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact className={styles.link} activeClassName={styles.activeLink} to="/products">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M14.0137 20H5.6659C2.59954 20 0.24714 18.8925 0.915333 14.4348L1.69336 8.3936C2.10526 6.16934 3.52403 5.31808 4.76888 5.31808H14.9474C16.2105 5.31808 17.5469 6.23342 18.0229 8.3936L18.8009 14.4348C19.3684 18.389 17.0801 20 14.0137 20Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" d="M14.151 5.0984C14.151 2.71233 12.2167 0.778039 9.83067 0.778039V0.778039C8.68166 0.77317 7.57805 1.2262 6.76386 2.03695C5.94967 2.84771 5.49198 3.94939 5.49199 5.0984H5.49199" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" d="M12.7963 9.60183H12.7506" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" d="M6.96568 9.60183H6.91991" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <AnimatePresence>
                                {isNavOpen &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        {translation.products}
                                    </motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact className={styles.link} activeClassName={styles.activeLink} to="/campaigns">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                <path opacity="0.4" d="M6.37143 9.20172V16.0619" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" d="M11.0381 5.91913V16.0618" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" d="M15.6286 12.8268V16.0619" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.4" fillRule="evenodd" clipRule="evenodd" d="M15.6857 1H6.31429C3.04762 1 1 3.31208 1 6.58516V15.4148C1 18.6879 3.0381 21 6.31429 21H15.6857C18.9619 21 21 18.6879 21 15.4148V6.58516C21 3.31208 18.9619 1 15.6857 1Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <AnimatePresence>
                                {isNavOpen &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        {translation.campaigns}
                                    </motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact className={styles.link} activeClassName={styles.activeLink} to="/payouts">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
                                <g opacity="0.4">
                                    <path d="M20.6389 12.3958H16.5906C15.1042 12.3949 13.8994 11.1909 13.8985 9.70449C13.8985 8.21804 15.1042 7.01413 16.5906 7.01321H20.6389" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M17.0486 9.64288H16.7369" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.74766 1H15.3911C18.2892 1 20.6388 3.34951 20.6388 6.24766V13.4247C20.6388 16.3229 18.2892 18.6724 15.3911 18.6724H6.74766C3.84951 18.6724 1.5 16.3229 1.5 13.4247V6.24766C1.5 3.34951 3.84951 1 6.74766 1Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M6.03561 5.53817H11.4346" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            <AnimatePresence>
                                {isNavOpen &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        {translation.payouts}
                                    </motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact className={styles.link} activeClassName={styles.activeLink} to="/statements">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                                <g opacity="0.4">
                                    <path d="M12.7162 14.2234H5.4962" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.7162 10.0369H5.4962" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8.2513 5.86008H5.4963" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12.9086 0.749786C12.9086 0.749786 5.2316 0.753786 5.2196 0.753786C2.4596 0.770786 0.750599 2.58679 0.750599 5.35679V14.5528C0.750599 17.3368 2.4726 19.1598 5.2566 19.1598C5.2566 19.1598 12.9326 19.1568 12.9456 19.1568C15.7056 19.1398 17.4156 17.3228 17.4156 14.5528V5.35679C17.4156 2.57279 15.6926 0.749786 12.9086 0.749786Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            <AnimatePresence>
                                {isNavOpen &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        {translation.statement}
                                    </motion.div>}
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li>
                        <button className={`${styles.link} ${isSettingOpen ? styles.activeLink : ""}`} onClick={()=>setIsSettingOpen(true)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                <g opacity="0.4">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.8066 6.62355L18.1842 5.54346C17.6576 4.62954 16.4907 4.31426 15.5755 4.83866V4.83866C15.1399 5.09528 14.6201 5.16809 14.1307 5.04103C13.6413 4.91396 13.2226 4.59746 12.9668 4.16131C12.8023 3.88409 12.7139 3.56833 12.7105 3.24598V3.24598C12.7254 2.72916 12.5304 2.22834 12.17 1.85761C11.8096 1.48688 11.3145 1.2778 10.7975 1.27802H9.54348C9.03694 1.27801 8.55129 1.47985 8.19398 1.83888C7.83666 2.19791 7.63715 2.68453 7.63959 3.19106V3.19106C7.62457 4.23686 6.77246 5.07675 5.72654 5.07664C5.40419 5.07329 5.08843 4.98488 4.81121 4.82035V4.82035C3.89604 4.29595 2.72909 4.61123 2.20252 5.52516L1.53432 6.62355C1.00839 7.53633 1.31938 8.70255 2.22998 9.23225V9.23225C2.82188 9.57398 3.18651 10.2055 3.18651 10.889C3.18651 11.5725 2.82188 12.204 2.22998 12.5457V12.5457C1.32053 13.0719 1.0092 14.2353 1.53432 15.1453V15.1453L2.1659 16.2345C2.41262 16.6797 2.82658 17.0082 3.31617 17.1474C3.80576 17.2865 4.33062 17.2248 4.7746 16.976V16.976C5.21106 16.7213 5.73117 16.6515 6.21932 16.7821C6.70747 16.9128 7.12321 17.233 7.37414 17.6716C7.53867 17.9488 7.62709 18.2646 7.63043 18.5869V18.5869C7.63043 19.6435 8.48693 20.5 9.54348 20.5H10.7975C11.8505 20.5 12.7055 19.6491 12.7105 18.5961V18.5961C12.7081 18.088 12.9088 17.6 13.2681 17.2407C13.6274 16.8814 14.1155 16.6806 14.6236 16.6831C14.9452 16.6917 15.2596 16.7797 15.5389 16.9393V16.9393C16.4517 17.4653 17.6179 17.1543 18.1476 16.2437V16.2437L18.8066 15.1453C19.0617 14.7074 19.1317 14.1859 19.0012 13.6963C18.8706 13.2067 18.5502 12.7893 18.111 12.5366V12.5366C17.6717 12.2839 17.3514 11.8665 17.2208 11.3769C17.0902 10.8872 17.1602 10.3658 17.4153 9.9279C17.5812 9.63827 17.8214 9.39814 18.111 9.23225V9.23225C19.0161 8.70283 19.3264 7.54343 18.8066 6.63271V6.63271V6.62355Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="10.1751" cy="10.889" r="2.63616" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </g>
                            </svg>
                            <AnimatePresence>
                                {isNavOpen &&
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        layout
                                    >
                                        {translation.setting}
                                    </motion.div>}
                            </AnimatePresence>
                        </button>
                    </li>
                </ul>
                <hr className={`${styles.hr} ${theme === "dark" && styles.dark}`} style={{ transform: isNavOpen ? "scaleX(1.0)" : "scaleX(1.6)" }} />
                <div className={styles.insights} style={{ paddingLeft: isNavOpen ? "20px" : "0px" }}>{translation.insights}</div>
                <ul>
                    <li>
                        <NavLink className={styles.linkBelow} activeClassName={styles.activeLink} to="/inbox">
                            <div className={styles.linkLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill="none">
                                    <g opacity="0.4">
                                        <path d="M16.2677 6.5611L12.0023 9.99537C11.1951 10.6282 10.0635 10.6282 9.25629 9.99537L4.95424 6.5611" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.88787 1H15.3158C16.6752 1.01525 17.969 1.58993 18.896 2.5902C19.823 3.59048 20.3022 4.92903 20.222 6.29412V12.822C20.3022 14.1871 19.823 15.5256 18.896 16.5259C17.969 17.5262 16.6752 18.1009 15.3158 18.1161H5.88787C2.96796 18.1161 1 15.7407 1 12.822V6.29412C1 3.37545 2.96796 1 5.88787 1Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    {!isNavOpen && testForNotification &&
                                        <foreignObject x="10" y="0" width="12" height="10">
                                            <div xmlns="http://www.w3.org/1999/xhtml">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16" fill="none">
                                                    <circle cx="5.0000" cy="4.0000" r="3" fill="#FF754C"></circle>
                                                </svg>
                                            </div>
                                        </foreignObject>
                                    }
                                </svg>
                                <AnimatePresence>
                                    {isNavOpen &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            layout
                                        >
                                            {translation.inbox}
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <AnimatePresence>
                                {isNavOpen && testForNotification &&
                                    <motion.div
                                        className={styles.linkRight}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 0, opacity: 0 }}
                                    >
                                        {testForNotification}
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink exact className={styles.linkBelow} activeClassName={styles.activeLink} to="/notifications">
                            <div className={styles.linkLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" viewBox="0 0 20 22" fill="none">
                                    <g opacity="0.4">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.50083 12.7871V12.5681C1.53295 11.9202 1.7406 11.2925 2.10236 10.7496C2.7045 10.0975 3.1167 9.29831 3.29571 8.43598C3.29571 7.7695 3.29571 7.0935 3.35393 6.42703C3.65469 3.21842 6.82728 1 9.96106 1H10.0387C13.1725 1 16.345 3.21842 16.6555 6.42703C16.7137 7.0935 16.6555 7.7695 16.704 8.43598C16.8854 9.3003 17.2972 10.1019 17.8974 10.7591C18.2618 11.2972 18.4698 11.9227 18.4989 12.5681V12.7776C18.5206 13.648 18.2208 14.4968 17.6548 15.1674C16.907 15.9515 15.8921 16.4393 14.8024 16.5384C11.607 16.8812 8.38303 16.8812 5.18762 16.5384C4.09914 16.435 3.08576 15.9479 2.33521 15.1674C1.778 14.4963 1.48224 13.6526 1.50083 12.7871Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7.55494 19.8518C8.05421 20.4785 8.7874 20.884 9.59223 20.9788C10.3971 21.0735 11.2072 20.8495 11.8433 20.3564C12.0389 20.2106 12.2149 20.041 12.3672 19.8518" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    {!isNavOpen && testForNotification &&
                                        <foreignObject x="10" y="0" width="12" height="10">
                                            <div xmlns="http://www.w3.org/1999/xhtml">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16" fill="none">
                                                    <circle cx="5.0000" cy="4.0000" r="3" fill="#FF754C"></circle>
                                                </svg>
                                            </div>
                                        </foreignObject>
                                    }
                                </svg>

                                <AnimatePresence>
                                    {isNavOpen &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            layout
                                        >
                                            {translation.notifications}
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <AnimatePresence>
                                {isNavOpen && testForNotification &&
                                    <motion.div
                                        className={styles.linkRight}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 0, opacity: 0 }}
                                    >
                                        {testForNotification}
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink exact className={styles.linkBelow} activeClassName={styles.activeLink} to="/comment">
                            <div className={styles.linkLeft}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                                    <g opacity="0.4">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M11.0568 1.00014C7.54687 0.985959 4.28557 2.8071 2.4605 5.80041C0.635434 8.79372 0.512919 12.5224 2.13757 15.6287L2.33789 16.0192C2.50209 16.3264 2.53644 16.6865 2.43329 17.0192C2.14742 17.7784 1.90849 18.5545 1.71784 19.343C1.71784 19.743 1.83231 19.9715 2.26158 19.962C3.0219 19.7941 3.77068 19.5778 4.50332 19.3144C4.81886 19.2275 5.15437 19.2476 5.45725 19.3715C5.73389 19.5049 6.2967 19.8477 6.31578 19.8477C9.99154 21.7805 14.4808 21.2473 17.5998 18.5075C20.7187 15.7677 21.8199 11.39 20.3676 7.5041C18.9153 3.61815 15.2111 1.03059 11.0568 1.00014V1.00014Z" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <ellipse cx="6.28717" cy="11.0001" rx="0.476965" ry="0.47619" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <ellipse cx="11.0568" cy="11.0001" rx="0.476965" ry="0.47619" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        <ellipse cx="15.8265" cy="11.0001" rx="0.476965" ry="0.47619" stroke={ICON_STYLE.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    {!isNavOpen && testForNotification &&
                                        <foreignObject x="10" y="0" width="12" height="10">
                                            <div xmlns="http://www.w3.org/1999/xhtml">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 16" fill="none">
                                                    <circle cx="6.0000" cy="4.0000" r="3" fill="#FF754C"></circle>
                                                </svg>
                                            </div>
                                        </foreignObject>
                                    }
                                </svg>
                                <AnimatePresence>
                                    {isNavOpen &&
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            layout
                                        >
                                            {translation.comments}
                                        </motion.div>
                                    }
                                </AnimatePresence>
                            </div>
                            <AnimatePresence>
                                {isNavOpen && testForNotification &&
                                    <motion.div
                                        className={styles.linkRight}
                                        initial={{ x: 100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: 0, opacity: 0 }}
                                    >
                                        {testForNotification}
                                    </motion.div>
                                }
                            </AnimatePresence>
                        </NavLink>
                    </li> */}
                </ul>
                <div className={styles.toggleSection} style={TOGGLE_SECTION_STYLE}>
                    <ThemeBtn />
                    <LangBtn />
                </div>
                <SwitchUser justifyContent={"unset"} />
            </nav>
        </div>
    )
}


export default memo(Navbar)