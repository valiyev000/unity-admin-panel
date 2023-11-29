import { useContext } from 'react'
import styles from '../styles/sub-components/ForSearchMobile.module.scss'
import contextApi from '../StateManager'
import { useEffect } from 'react'
import axios from 'axios'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useState } from 'react'
import { AnimatePresence , motion } from 'framer-motion'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import imgProductNull from '../images/imgProductNull.png'
import { IoIosArrowForward } from "react-icons/io";

export default function ForSearchMobile() {

    const { theme, translation, inputVal, setInputVal, forSearch , lang , setIsNavOpen } = useContext(contextApi)

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
        <div className={`${styles.inputDiv} ${theme === "dark" ? styles.dark : ""}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.61154 0C4.30323 0 0 4.20819 0 9.39926C0 14.5903 4.30323 18.7985 9.61154 18.7985C11.8819 18.7985 13.9684 18.0287 15.613 16.7415L18.7371 19.7886L18.8202 19.8586C19.1102 20.0685 19.5214 20.0446 19.7839 19.7873C20.0726 19.5043 20.072 19.0459 19.7825 18.7636L16.6952 15.7523C18.2649 14.0794 19.2231 11.8487 19.2231 9.39926C19.2231 4.20819 14.9198 0 9.61154 0ZM9.61154 1.44774C14.1022 1.44774 17.7426 5.00776 17.7426 9.39926C17.7426 13.7908 14.1022 17.3508 9.61154 17.3508C5.12086 17.3508 1.48044 13.7908 1.48044 9.39926C1.48044 5.00776 5.12086 1.44774 9.61154 1.44774Z" fill={theme === "light" ? "#11142D" : "#fff"} />
            </svg>
            <input
                className={theme === "dark" ? styles.dark : ""}
                id={styles.forSearch}
                onFocus={(e) => {
                    getData()
                    setIsInputFocused(true)
                }}
                onBlur={(e) => {
                    setIsInputFocused(false)
                }}
                type="text"
                name="forSearch"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                ref={forSearch}
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
                                <Link to="/products" className={`${styles.productResult} ${theme === "dark" ? styles.dark : ""}`} key={key} onClick={()=>setIsNavOpen(false)}>
                                    <div className={styles.left}>
                                    <div className={styles.imgBox}>
                                        <img src={data[key].img === undefined ? imgProductNull : data[key].img} alt="demo.png" />
                                    </div>
                                    <div className={styles.productName}>{data[key][`name_${lang}`].length > 12 ? `${data[key][`name_${lang}`].slice(0,11)}...` : data[key][`name_${lang}`]}</div>
                                    </div>
                                    <IoIosArrowForward className={styles.rightIcon} />
                                </Link>
                            ))}
                            {isInputFocused && filteredData.length === 0 && inputVal !== "" && <div className={styles.notFound}>Not found</div>}
                        </motion.div>
                    }
                </AnimatePresence>
        </div>
    )
}
