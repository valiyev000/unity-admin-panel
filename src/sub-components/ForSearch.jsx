import { memo, useContext, useEffect, useState } from 'react'
import styles from '../styles/sub-components/ForSearch.module.scss'
import contextApi from '../StateManager'
import axios from 'axios'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { motion, AnimatePresence } from 'framer-motion'
import imgProductNull from '../images/imgProductNull.png'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


function ForSearch() {

    const { theme, translation, testForNotification, inputVal, setInputVal, lang } = useContext(contextApi)

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isDataHave, setIsDataHave] = useState(false)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [animationParent] = useAutoAnimate()

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
            <div className={styles.notificationBadge} style={{ boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-2 -1 28 25" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M18 11V8C18 4.13401 14.866 1 11 1C7.13401 1 4 4.13401 4 8V11C4 14.3 1 15.1 1 17C1 18.7 4.9 20 11 20C17.1 20 21 18.7 21 17C21 15.1 18 14.3 18 11Z" stroke={theme === "light" ? "#11142D" : "#fff"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11 22C9.98902 22 9.03902 21.966 8.14502 21.9C8.53619 23.1478 9.69236 23.997 11 23.997C12.3077 23.997 13.4639 23.1478 13.855 21.9C12.961 21.966 12.011 22 11 22Z" fill={theme === "light" ? "#1B1D21" : "#fff"} />
                    {testForNotification && <circle cx="17" cy="3" r="5.33333" fill="#FF754C" />}
                </svg>
            </div>
        </div>
    )
}

export default memo(ForSearch)