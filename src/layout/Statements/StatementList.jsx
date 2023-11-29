import { memo, useEffect, useState } from "react"
import styles from './styles/StatementList.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from "react"
import contextApi from "../../StateManager"
import { FiPrinter } from "react-icons/fi";
import { RiDownloadLine } from "react-icons/ri";
import { BsCheck } from "react-icons/bs"
import axios from "axios"
import { IoIosArrowDown } from "react-icons/io"


function StatementList({ data, setData, selectedMonth, setSelectedMonth, labelData }) {

    const { screenWidth, theme, translation, isNavOpen, lang, axiosGet } = useContext(contextApi)
    const [mainCheckboxVal, setMainCheckboxVal] = useState(false)
    const [keys, setKeys] = useState([])
    const [isHaveMore, setIsHaveMore] = useState(false)
    const [addRange, setAddRange] = useState(10)
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)
    const [checkedKey, setCheckedKeys] = useState([])
    const [selectedMonthForFilter, setSelectedMonthForFilter] = useState("")


    useEffect(() => { //* En esas funksiyani icra edir

        if (data !== null) {
            let templateKeys = Object.keys(data).map(key => key) //todo Datadan butun keyleri goturur

            if (templateKeys.length !== templateKeys.slice(0, addRange).length) { //todo range'in deyerine uygun keyleri slice edir
                templateKeys = templateKeys.slice(0, addRange)
                setIsHaveMore(true)
            } else {
                setIsHaveMore(false)
            }

            setKeys(templateKeys) //todo sona qalan keyleri set edir
        }

    }, [isHaveMore, addRange, data])

    useEffect(() => { //*keyler deyisdikde ekranda olan productlari yeniden diger funksiyalarada isleyir
        if (data !== null) {
            isAllSelected()
            checkedKeysWriter()
        }
    }, [keys])

    useEffect(() => {
        axios.get(`https://unity-admin-panel-default-rtdb.firebaseio.com/db/statements/data/${selectedMonth}.json`).then(res => {
            setKeys([])
            setAddRange(10)
            setData(res.data)
        })
    }, [selectedMonth])

    function checkboxMaker(id, checked) { //todo hazir komponentdi. checkbox lazim olanda istfade etmek olar
        return (
            <div className={styles.checkbox}>
                <input onChange={() => handleCheck(id)} type="checkbox" name="statementCheckbox" id={id} checked={checked} />
                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={id}>
                    {checked && <BsCheck className={styles.icon} size={18} color="white" />}
                </label>
            </div>
        )
    }

    function handleCheck(id) { //* checkboxlardan hansi check olunarsa datada check property'sinde deyisiklik edilir

        if (data !== null) {
            keys.map(key => {
                if (key === id) {
                    data[key].checked = !data[key].checked
                }
            })

            isAllSelected() //todo ekranda gosterilen productlarin hamsinin secili olub olmadigini aydinlasdirir ve mainCheckbox'u buna uygunlasdirir

            checkedKeysWriter()

            setData({ ...data }) //todo checked true/false olmasini save etmek ucun setData etmek lazimdi

        }

    }

    function handleMainCheck() { //* Datani esas checkbox'un deyerine gore hamsini ya true ya da false edir

        if (data !== null) {
            if (mainCheckboxVal) {
                keys.map(key => {
                    data[key].checked = false
                })
            } else {
                keys.map(key => {
                    data[key].checked = true
                })
            }

            isAllSelected()

            checkedKeysWriter()

            setData({ ...data }) //todo checked true/false olmasini save etmek ucun setData etmek lazimdi
        }

    }

    function isAllSelected() { //* bu funksiya ekranda olan checklerin hamsinin check olub olunmadigini aydinlasdirir

        if (data !== null) {
            if (keys.every(key => data[key].checked === true)) {
                setMainCheckboxVal(true)
            } else {
                setMainCheckboxVal(false)
            }

            if (keys.length === 0) setMainCheckboxVal(false) //todo keys.length 0 olduqda yuxaridaki if/else true qaytardigindan bu kod yazilmali oldu
        }

    }

    function checkedKeysWriter() { //* Bu funksiya checked olan productlarin keylerini checkedKeys de yigir

        if (data !== null) {
            let holder = keys.filter(key => data[key].checked === true)
            setCheckedKeys(holder)
        }

    }

    useEffect(()=>{
        if (labelData) {
            const result = labelData.filter(label=>label.queryPath === selectedMonth)
            setSelectedMonthForFilter(result[0]);
        }
    },[labelData, selectedMonth])

    return (
        <motion.div
            className={styles.main}
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
            exit={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0"
            }}
        >
            {screenWidth > 480 ?
                <div className={styles.title}>
                    <div className={styles.left}>
                        <motion.div layout className={styles.statement}>{translation.statement}</motion.div>
                        <motion.div layout className={styles.pleaseNote}>{translation.please_note_transactions_are_based_time_in_california_usa}</motion.div>
                    </div>
                    <div className={styles.right}>
                        <button className={styles.icon} style={{ boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)", background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><FiPrinter color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                        <button className={styles.icon} style={{ boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)", background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><RiDownloadLine color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                    </div>
                </div>
                : <div className={styles.titleMobile}>
                    <div className={styles.filter} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 0.3)", width: screenWidth > 1200 ? "50%" : "100%", maxWidth: screenWidth > 1200 ? "235px" : "none" }} tabIndex={0} onBlur={() => setIsDropDownMenuOpen(false)}>
                        <div className={styles.selected} onClick={() => setIsDropDownMenuOpen(prev => !prev)}>
                            <span>{selectedMonthForFilter[`name_${lang}`]}</span>
                            <IoIosArrowDown size={20} color={theme === "dark" ? "#fff" : "#000"} />
                        </div>
                        <AnimatePresence>
                            {isDropDownMenuOpen &&
                                <motion.div
                                    className={styles.dropDown}
                                    initial={{
                                        opacity: 0,
                                        transform: "translateY(-10px)"
                                    }}
                                    animate={{
                                        opacity: 1,
                                        transform: "translateY(0px)"
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transform: "translateY(-10px)"
                                    }}
                                    style={{
                                        background: theme === "dark" ? "#1F2128" : "#fff",
                                        borderColor: theme === "dark" ? "#3a3a3a" : "#ededed"
                                    }}
                                >
                                    {labelData.length !== 0 && labelData.map(label => (
                                        <div
                                            key={label.queryPath}
                                            style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                            className={styles.option}
                                            onClick={() => { setSelectedMonth(label.queryPath); setIsDropDownMenuOpen(false) }}
                                        >
                                            {label[`name_${lang}`]}
                                        </div>
                                    ))}
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>
            }
            <div className={styles.gridContainer}>
                {screenWidth > 480 ?
                    <div className={styles.topRow} style={{ gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr" }}>
                        <div className={`${styles.firstColumn} ${theme === "dark" ? styles.dark : ""}`}>
                            <div className={styles.checkbox}>
                                <input onChange={handleMainCheck} type="checkbox" name="statementCheckbox" id={"mainCheckbox"} checked={mainCheckboxVal} />
                                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={"mainCheckbox"}>
                                    {mainCheckboxVal && <BsCheck className={styles.icon} size={18} color="white" />}
                                </label>
                            </div>
                            <label className={styles.statement} htmlFor="mainCheckbox">{translation.date}</label>
                        </div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.order_id}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: screenWidth < 1200 ? "center" : "unset" }}>{translation.amount}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.price}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.type}</div>
                    </div>
                    : <div className={`${styles.topRowMobile} ${theme === "dark" ? styles.dark : ""}`}>
                        <div className={styles.left}>
                            <div className={styles.checkbox}>
                                <input onChange={handleMainCheck} type="checkbox" name="statementCheckbox" id={"mainCheckbox"} checked={mainCheckboxVal} />
                                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={"mainCheckbox"}>
                                    {mainCheckboxVal && <BsCheck className={styles.icon} size={18} color="white" />}
                                </label>
                            </div>
                            <label className={styles.statement} htmlFor="mainCheckbox">{translation.transaction}</label>
                        </div>
                        <div className={styles.right}>
                            <button className={styles.icon} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><FiPrinter color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                            <button className={styles.icon} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><RiDownloadLine color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                        </div>
                    </div>
                }
                {data !== null && screenWidth > 480 && keys.length !== 0 ? keys.map(key => (
                    <motion.div
                        className={styles.statementRow}
                        key={key}
                        layout
                        initial={{
                            opacity: 0,
                            gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr"
                        }}
                        animate={{
                            opacity: 1,
                            gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr"
                        }}
                        exit={{
                            opacity: 0,
                            gridTemplateColumns: "3fr 2fr 2fr 2fr 2fr"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`${styles.firstColumn} ${theme === "dark" ? styles.dark : ""}`}>
                            {checkboxMaker(key, data[key].checked)}
                            <label className={styles.date} htmlFor={key}>{data[key][`date_${lang}`]}</label>
                        </div>
                        <div className={`${styles.orderId} ${theme === "dark" ? styles.dark : ""}`}>{data[key].orderId}</div>
                        <div className={`${styles.amount} ${theme === "dark" ? styles.dark : ""}`} style={{ justifyContent: screenWidth < 1200 ? "center" : "unset" }}>{data[key].amount} {translation.piece}{data[key].amount > 1 && lang === "en" && "s"}</div>
                        <div className={`${styles.price} ${theme === "dark" ? styles.dark : ""}`}>{data[key].currency}{data[key].price.toFixed(2)}</div>
                        <div className={`${styles.type} ${theme === "dark" ? styles.dark : ""}`}>
                            <div className={styles.template}>{translation.sale}</div>
                        </div>
                    </motion.div>
                )) : data !== null && screenWidth < 480 && keys.length !== 0 ? keys.map(key => (
                    <motion.div
                        className={`${styles.statementRowMobile} ${theme === "dark" ? styles.dark : ""}`}
                        key={key}
                        layout
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.top}>
                            {checkboxMaker(key, data[key].checked)}
                            <label className={styles.statement} htmlFor={key}>
                                <div className={styles.orderIdText}>{translation.order_id}</div>
                                <div className={styles.orderId}>{data[key].orderId}</div>
                            </label>
                            <div className={styles.typeTemplate}>{translation.sale}</div>
                        </div>
                        <div className={`${styles.bottom} ${theme === "dark" ? styles.dark : ""}`}>
                            <div className={styles.colorBar} style={{ background: "#7FBA7A" }}></div>
                            <div className={styles.date}>{data[key][`date_${lang}`]}</div>
                            <div className={styles.amount}>{data[key].amount}</div>
                            <div className={styles.price}>{data[key].currency}{data[key].price}</div>
                        </div>
                    </motion.div>
                )) : <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.noProducts}>{translation.there_are_no_products_to_display}</motion.div>}
                {isHaveMore &&
                    <div className={styles.loadMoreBg}>
                        <button
                            onClick={() => { setAddRange(prev => prev + 10) }}
                            style={{
                                width: isNavOpen ? "166px" : "306px"
                            }}
                        >
                            {translation.load_more}
                        </button>
                    </div>
                }
            </div>
        </motion.div>
    )
}

export default memo(StatementList)