import { memo, useContext, useEffect, useState } from 'react'
import styles from '../styles/sub-components/ForSearch.module.scss'
import contextApi from '../StateManager'
import axios from 'axios'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion, AnimatePresence } from 'framer-motion'
import imgProductNull from '../images/imgProductNull.png'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase-config'
import uploadAvatarNull from '../images/uploadAvatarNull.png'
import commentIcon from '../images/commentIcon.svg'
import likeIcon from '../images/likeIcon.svg'
import purchaseIcon from '../images/purchaseIcon.svg'
import { BiSolidDislike, BiSolidLike } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

function ForSearch() {

    const { theme, translation, notificationAlert, inputVal, setInputVal, lang, screenWidth } = useContext(contextApi)

    const [data, setData] = useState([])
    const [notificationData, setNotificationData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isDataHave, setIsDataHave] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [animationParent] = useAutoAnimate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function getData() {
        if (!isDataHave) {
            axios.get("https://unity-admin-panel-default-rtdb.firebaseio.com/db/products.json")
                .then(res => {
                    setData(res.data)
                    setIsDataHave(true)
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if (isDataHave) {
            let filteredKeys = Object.keys(data).filter(key => (
                Object.values(data[key]).join("").toLowerCase().includes(inputVal.toLowerCase())
            ))
            setFilteredData(filteredKeys.slice(0, 6))
        }
    }, [inputVal])

    useEffect(() => {
        const notificationRef = collection(db, 'notifications');

        let q; //todo firestore query'ini onceden assign edirik...

        q = query(notificationRef, orderBy('time', 'desc'), limit(5));

        // Use onSnapshot to listen for real-time updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (q) {
                // Extract keys and data from each document
                let notificationsData = querySnapshot.docs.map((doc) => ({
                    key: doc.id,
                    data: doc.data(),
                }));

                setNotificationData(notificationsData);
            }
        });

        // Cleanup the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    function stringLimiter(str) {
        if (str.length > 14) {
            return `${str.slice(0, 14)}...`
        } else {
            return str
        }
    }

    const formatTime = (timestamp) => {
        let formattedTime = ""
        if (timestamp) {
            const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1e6);
            // Extract hours and minutes
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            // Combine hours and minutes
            formattedTime = `${hours}:${minutes}`;
        }
        return formattedTime;
    };

    return (
        <div className={styles.main}>
            <div className={styles.inputDiv}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M9.61154 0C4.30323 0 0 4.20819 0 9.39926C0 14.5903 4.30323 18.7985 9.61154 18.7985C11.8819 18.7985 13.9684 18.0287 15.613 16.7415L18.7371 19.7886L18.8202 19.8586C19.1102 20.0685 19.5214 20.0446 19.7839 19.7873C20.0726 19.5043 20.072 19.0459 19.7825 18.7636L16.6952 15.7523C18.2649 14.0794 19.2231 11.8487 19.2231 9.39926C19.2231 4.20819 14.9198 0 9.61154 0ZM9.61154 1.44774C14.1022 1.44774 17.7426 5.00776 17.7426 9.39926C17.7426 13.7908 14.1022 17.3508 9.61154 17.3508C5.12086 17.3508 1.48044 13.7908 1.48044 9.39926C1.48044 5.00776 5.12086 1.44774 9.61154 1.44774Z" fill={theme === "light" ? "#11142D" : "#fff"} />
                </svg>
                <input
                    className={`${theme === "dark" ? styles.dark : ""}`}
                    onFocus={(e) => {
                        e.target.style.background = theme === "dark" ? "rgba(228, 228, 228, 0.10)" : "#E4E4E4";
                        getData()
                        setIsInputFocused(true)
                    }}
                    onBlur={(e) => {
                        e.target.style.background = "transparent"
                        setIsInputFocused(false)
                    }}
                    type="text"
                    name="forSearch"
                    id="forSearch"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder={translation.search}
                    autoComplete='off'
                />
                <AnimatePresence>
                    {isInputFocused && inputVal !== "" &&
                        <motion.div
                            className={`${styles.dropDown} ${theme === "dark" ? styles.dark : ""}`}
                            ref={animationParent}
                            initial={{ transform: "translateY(-10px)", opacity: 0 }}
                            animate={{ transform: "translateY(0px)", opacity: 1 }}
                            exit={{ transform: "translateY(-10px)", opacity: 0 }}
                        >
                            {filteredData.length !== 0 && <div className={styles.relatedResult}>{translation.related_result}</div>}
                            {filteredData.length !== 0 && filteredData.map(key => (
                                <Link to="/products" className={`${styles.productResult} ${theme === "dark" ? styles.dark : ""}`} key={key}>
                                    <div className={styles.left}>
                                        <div className={styles.imgBox}>
                                            <img src={data[key].img === undefined ? imgProductNull : data[key].img} alt="demo.png" />
                                        </div>
                                        <div className={styles.productName}>{data[key][`name_${lang}`].length > 20 ? `${data[key][`name_${lang}`].slice(0, 19)}...` : data[key][`name_${lang}`]}</div>
                                    </div>
                                    <IoIosArrowForward className={styles.rightIcon} />
                                </Link>
                            ))}
                            {isInputFocused && filteredData.length === 0 && inputVal !== "" && <div className={styles.notFound}>Not found</div>}
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
            <div
                className={styles.notificationBadge}
                style={{
                    boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)",
                    background: isMenuOpen ? "#6C5DD3" : "transparent"
                }}
                tabIndex={0}
                onClick={() => setIsMenuOpen(prev => !prev)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="-3 -1 28 25"
                    fill="none"
                >
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 11V8C18 4.13401 14.866 1 11 1C7.13401 1 4 4.13401 4 8V11C4 14.3 1 15.1 1 17C1 18.7 4.9 20 11 20C17.1 20 21 18.7 21 17C21 15.1 18 14.3 18 11Z" stroke={theme === "dark" || isMenuOpen ? "#fff" : "#11142D"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 22C9.98902 22 9.03902 21.966 8.14502 21.9C8.53619 23.1478 9.69236 23.997 11 23.997C12.3077 23.997 13.4639 23.1478 13.855 21.9C12.961 21.966 12.011 22 11 22Z" fill={theme === "dark" || isMenuOpen ? "#fff" : "#1B1D21"} />
                    {/* {notificationAlert && <circle cx="17" cy="3" r="5.33333" fill="#FF754C" />} */}
                </svg>
                <div className={styles.indicator}>{notificationAlert}</div>
                <AnimatePresence>
                    {isMenuOpen &&
                        <motion.div
                            className={styles.dropDownMenu}
                            initial={{
                                background: theme === "dark" ? "#242731" : "#FFF",
                                boxShadow: theme === "dark" ? "rgba(5, 5, 5, 0.65) 0px 5px 20px 0px" : "rgba(230, 215, 255, 0.95) 0px 5px 20px 0px",
                                transform: "translateY(-20px)",
                                opacity: 0
                            }}
                            animate={{
                                background: theme === "dark" ? "#242731" : "#FFF",
                                boxShadow: theme === "dark" ? "rgba(5, 5, 5, 0.65) 0px 5px 20px 0px" : "rgba(230, 215, 255, 0.95) 0px 5px 20px 0px",
                                transform: "translateY(0px)",
                                opacity: 1
                            }}
                            exit={{
                                background: theme === "dark" ? "#242731" : "#FFF",
                                boxShadow: theme === "dark" ? "rgba(5, 5, 5, 0.65) 0px 5px 20px 0px" : "rgba(230, 215, 255, 0.95) 0px 5px 20px 0px",
                                transform: "translateY(-20px)",
                                opacity: 0
                            }}
                        >
                            <div className={styles.header}>{translation.recent_notification}</div>
                            <motion.ul>
                                {notificationData.length !== 0 ? notificationData.map(noti => (
                                    <motion.li
                                        className={`${theme === "dark" ? styles.dark : ""}`}
                                        layout
                                        key={noti.key}
                                        initial={{
                                            opacity: 0,
                                            transform: "translateY(10px)"
                                        }}
                                        animate={{
                                            opacity: 1,
                                            transform: "translateY(0px)"
                                        }}
                                    >
                                        <div className={styles.left}>
                                            <div className={styles.imgSection}>
                                                <img className={styles.avatar} src={noti.data.userAvatar ? noti.data.userAvatar : uploadAvatarNull} alt="avatar.png" />
                                                <img className={styles.positionAbs} src={noti.data.notiType === "purchase" ? purchaseIcon : noti.data.notiType === "comment" ? commentIcon : likeIcon} alt="tinyBlockAlt" />
                                            </div>
                                            <div className={styles.mainSection}>
                                                <div className={styles.userNameAndSurname}>{noti.data.username}</div>
                                                <div className={styles.aboutType}>
                                                    <span className={styles.type}>{noti.data.notiType === "purchase" ? translation.purchased : noti.data.notiType === "comment" ? translation.commented_on : translation.liked}</span>
                                                    <div className={styles.productName}>{stringLimiter(noti.data.productName)}</div>
                                                    <span className={styles.whenCome}>{formatTime(noti.data.time)}</span>
                                                </div>
                                                <div className={styles.innerText}>{noti.data.text}</div>
                                                <div className={styles.btnsSection}>
                                                    <button onClick={() => handleAction(noti.key, noti.data.reaction, true)} style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidLike color={noti.data.reaction === true ? "rgb(49, 139, 255)" : "rgb(128, 129, 145)"} size={20} /></button>
                                                    <button onClick={() => handleAction(noti.key, noti.data.reaction, false)} style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><BiSolidDislike color={noti.data.reaction === false ? "rgb(233, 75, 75)" : "rgb(128, 129, 145)"} size={20} /></button>
                                                    <button onClick={() => handleDel(noti.key)} style={{ border: theme === "dark" ? "1px solid rgba(228, 228, 228, 0.10)" : "1px solid #E4E4E4" }}><MdDelete color={'rgb(128, 129, 145)'} size={20} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        {noti.data.productImage && screenWidth > 480 ?
                                            <motion.div layout className={styles.imgSectionBg}>
                                                <img className={styles.productImage} src={noti.data.productImage} onClick={() => setImgSrc(noti.data.productImage)} alt="notiImgAlt" />
                                            </motion.div>
                                            : noti.data.productImage && screenWidth < 480 ? <div onClick={() => setImgSrc(noti.data.productImage)}><MdImage /></div>
                                                : ""
                                        }
                                    </motion.li>
                                )) :
                                    <div className={styles.empty}>
                                        <motion.div initial={{ transform: "translateY(30px)", opacity: 0 }} animate={{ transform: "translateY(0px)", opacity: 1 }} className={styles.inner}>{translation.there_is_no_notification_for_show}</motion.div>
                                    </div>
                                }
                            </motion.ul>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </div>
    )
}

export default memo(ForSearch)