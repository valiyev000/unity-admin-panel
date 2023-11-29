import { memo, useContext, useState } from "react"
import styles from './styles/WithdrawHistory.module.scss'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from "../../StateManager"
import { IoIosArrowDown } from "react-icons/io"
import { RiSearchLine } from "react-icons/ri"
import { IoTrashBinSharp } from "react-icons/io5"
import { useEffect } from "react"
import { BsCheck } from "react-icons/bs"
import PayoutDeleteModal from "./PayoutDeleteModal"

function WithdrawHistory({ data, setData }) {

    const { theme, translation, lang, screenWidth, isNavOpen } = useContext(contextApi)

    const [keys, setKeys] = useState([])
    const [checkedKeys, setCheckedKeys] = useState([])
    const [dates, setDates] = useState([])
    const [methods, setMethods] = useState([])
    const [isDropDownMenuOpen1, setIsDropDownMenuOpen1] = useState(false)
    const [isDropDownMenuOpen2, setIsDropDownMenuOpen2] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState("Select Range")
    const [selectedMethod, setSelectedMethod] = useState("Select Method")
    const [inputVal, setInputVal] = useState("")
    const [mainCheckboxVal, setMainCheckboxVal] = useState(false)
    const [isHaveMore, setIsHaveMore] = useState(false)
    const [addRange, setAddRange] = useState(10)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)


    function checkboxMaker(id, checked) { //todo hazir komponentdi. checkbox lazim olanda istfade etmek olar
        return (
            <div className={styles.checkbox}>
                <input onChange={() => handleCheck(id)} type="checkbox" name="payoutCheckbox" id={id} checked={checked} />
                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={id}>
                    {checked && <BsCheck className={styles.icon} size={18} color="white" />}
                </label>
            </div>
        )
    }

    useEffect(() => { //todo Bu funksiya productlarin date'lerini ve methodlarini (elave olunduqlari zamani) secir ve dates stateine elave edir

        if (data !== null) {
            Object.keys(data).map(key => {
                dates.push(data[key].date_month) //todo select range ucun date araliqlarini cixardiriq
                methods.push(data[key].payment_method) //todo select method ucun methodlari cixardiriq
            })

            let set = new Set(dates);
            let methodSet = new Set(methods);

            setDates(Array.from(set))
            setMethods(Array.from(methodSet))
        }
    }, [data]);

    useEffect(() => { //todo En esas funksiyani icra edir

        if (data !== null) {
            let templateKeys = Object.keys(data).map(key => key) //todo Datadan butun keyleri goturur

            if (selectedMonth !== "Select Range") {
                templateKeys = templateKeys.filter(key => data[key].date_month === selectedMonth) //todo Secilmis range'e uygun olaraq filterleyir
            }
            
            if (selectedMethod !== "Select Method") {
                templateKeys = templateKeys.filter(key => data[key].payment_method === selectedMethod) //todo Secilmis methoda'a uygun olaraq filterleyir
            }

            templateKeys = templateKeys.filter(key => Object.values(data[key]).join("").toLowerCase().includes(inputVal.toLowerCase())) //todo inputun deyerine gore filterleyir

            if (templateKeys.length !== templateKeys.slice(0, addRange).length) { //todo range'in deyerine uygun keyleri slice edir
                templateKeys = templateKeys.slice(0, addRange)
                setIsHaveMore(true)
            } else {
                setIsHaveMore(false)
            }

            setKeys(templateKeys) //todo sona qalan keyleri set edir
        }

    }, [selectedMonth, selectedMethod, inputVal, isHaveMore, addRange, data])

    useEffect(() => { //*keyler deyisdikde ekranda olan productlari yeniden diger funksiyalarada isleyir
        if (data !== null) {
            isAllSelected()
            checkedKeysWriter()
        }
    }, [keys])

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

    function handleDelete() { //* Silme emeliyyati zamani ise dusur

        if (data !== null) {
            let templateKeys = keys //todo butun keylerin kopyasi cixardilir


            checkedKeys.map(checkedKey => { //todo checked olunmus key'e sahib olan productlari bir bir silir...
                //! burda simulyasiya edilib. payoutlar mentiqi cehetden bazadan siline bilmediyine gore onlar sessiyanin sonuna qeder silinmis kimi gorsenirler. Sehife yeniden refresh olundugdan sonra silinmis payoutlar yeniden ekranda gorsenecek

                templateKeys = templateKeys.filter(key => key !== checkedKey) //todo silinmis olan keyler templateKeysde filterlenerek silinir
                delete data[checkedKey]; //todo datanin icinde keyler vasitesile silinir
            })
            setKeys([...templateKeys]) //todo templateKeys esas state set olunur
        }

        setData({ ...data }) //todo editlenmis data save olunur

    }

    return (
        <motion.div
            className={styles.main}
            initial={{
                transform: "scale(1.1)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                background: theme === "dark" ? "#1F2128" : "#fff",
                margin: screenWidth > 1200 ? "40px 0" : ""
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                background: theme === "dark" ? "#1F2128" : "#fff",
                margin: screenWidth > 1200 ? "40px 0" : ""
            }}
        >
            <div className={styles.title}>
                <div className={styles.left} style={{ width: screenWidth > 480 ? "80%" : "100%", maxWidth: screenWidth < 1200 ? "450px" : "" }}>
                    <div className={styles.filter} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 0.3)", width: screenWidth > 1200 ? "29%" : "48.5%", maxWidth: screenWidth > 1200 ? "235px" : "none" }} tabIndex={0} onBlur={() => setIsDropDownMenuOpen1(false)}>
                        <div className={styles.selected} onClick={() => setIsDropDownMenuOpen1(prev => !prev)}>
                            <span>{selectedMonth}</span>
                            <IoIosArrowDown size={20} color={theme === "dark" ? "#fff" : "#000"} />
                        </div>
                        <AnimatePresence>
                            {isDropDownMenuOpen1 &&
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
                                    <div
                                        className={styles.option}
                                        style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                        onClick={() => { setSelectedMonth("Select Range"); setIsDropDownMenuOpen1(false) }}
                                    >
                                        Select Range
                                    </div>
                                    {dates.length !== 0 && dates.map(month => (
                                        <div
                                            key={month}
                                            style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                            className={styles.option}
                                            onClick={() => { setSelectedMonth(month); setIsDropDownMenuOpen1(false) }}
                                        >
                                            {month}
                                        </div>
                                    ))}
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                    <div className={styles.filter} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 0.3)", width: screenWidth > 1200 ? "29%" : "48.5%", maxWidth: screenWidth > 1200 ? "235px" : "none" }} tabIndex={0} onBlur={() => setIsDropDownMenuOpen2(false)}>
                        <div className={styles.selected} onClick={() => setIsDropDownMenuOpen2(prev => !prev)}>
                            <span>{selectedMethod}</span>
                            <IoIosArrowDown size={20} color={theme === "dark" ? "#fff" : "#000"} />
                        </div>
                        <AnimatePresence>
                            {isDropDownMenuOpen2 &&
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
                                    <div
                                        className={styles.option}
                                        style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                        onClick={() => { setSelectedMethod("Select Method"); setIsDropDownMenuOpen2(false) }}
                                    >
                                        Select Range
                                    </div>
                                    {methods.length !== 0 && methods.map(method => (
                                        <div
                                            key={method}
                                            style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                            className={styles.option}
                                            onClick={() => { setSelectedMethod(method); setIsDropDownMenuOpen2(false) }}
                                        >
                                            {method}
                                        </div>
                                    ))}
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                    <div className={styles.inputDiv} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 0.3)", width: screenWidth > 1200 ? "36%" : "100%" }}>
                        <RiSearchLine size={20} className={styles.icon} />
                        <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} type="text" name="productTableSearch" id="productTableSearch" placeholder={translation.search} style={{ color: theme === "dark" ? "#fff" : "#000" }} />
                    </div>
                </div>
                {screenWidth > 480 && <div className={styles.right} style={{ flexDirection: screenWidth < 1200 && "column" }}>
                    <button disabled={!checkedKeys.length} className={styles.icon} onClick={() => setIsDeleteModalOpen(true)} style={{ boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)", background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><IoTrashBinSharp color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                </div>
                }
            </div>
            <div className={styles.gridContainer}>
                {screenWidth > 480 ?
                    <div className={styles.topRow} style={{ gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "50fr 24fr 25fr 32fr 10fr" }}>
                        <div className={`${styles.firstColumn} ${theme === "dark" ? styles.dark : ""}`}>
                            <div className={styles.checkbox}>
                                <input onChange={handleMainCheck} type="checkbox" name="productCheckbox" id={"mainCheckbox"} checked={mainCheckboxVal} />
                                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={"mainCheckbox"}>
                                    {mainCheckboxVal && <BsCheck className={styles.icon} size={18} color="white" />}
                                </label>
                            </div>
                            <label className={styles.transaction} htmlFor="mainCheckbox">{translation.transaction}</label>
                        </div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.payment_method}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.status}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.date_processed}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.fees}</div>
                    </div>
                    : <div className={`${styles.topRowMobile} ${theme === "dark" ? styles.dark : ""}`}>
                        <div className={styles.left}>
                            <div className={styles.checkbox}>
                                <input onChange={handleMainCheck} type="checkbox" name="productCheckbox" id={"mainCheckbox"} checked={mainCheckboxVal} />
                                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={"mainCheckbox"}>
                                    {mainCheckboxVal && <BsCheck className={styles.icon} size={18} color="white" />}
                                </label>
                            </div>
                            <label className={styles.transaction} htmlFor="mainCheckbox">{translation.transaction}</label>
                        </div>
                        <div className={styles.right}>
                            <button disabled={!checkedKeys.length} className={styles.icon} onClick={() => setIsDeleteModalOpen(true)} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><IoTrashBinSharp color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                        </div>
                    </div>
                }
                {data !== null && screenWidth > 480 && keys.length !== 0 ? keys.map(key => (
                    <motion.div
                        className={styles.payoutsRow}
                        key={key}
                        layout
                        initial={{
                            opacity: 0,
                            gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "50fr 24fr 25fr 32fr 10fr"
                        }}
                        animate={{
                            opacity: 1,
                            gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "50fr 24fr 25fr 32fr 10fr"
                        }}
                        exit={{
                            opacity: 0,
                            gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "50fr 24fr 25fr 32fr 10fr"
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`${styles.firstColumn} ${theme === "dark" ? styles.dark : ""}`}>
                            {checkboxMaker(key, data[key].checked)}
                            <label className={styles.payout} htmlFor={key}>
                                <div className={styles.value}>{data[key].currency}{data[key].value.toFixed(2)}</div>
                                {data[key].discount_fee && <div className={styles.discountFee}>{data[key].currency}{data[key].discount_fee.toFixed(2)} {translation.transaction_fee}</div>}
                            </label>
                        </div>
                        <div className={`${styles.paymentMethod} ${theme === "dark" ? styles.dark : ""}`}>{data[key].payment_method}</div>
                        <div className={`${styles.status} ${theme === "dark" ? styles.dark : ""}`} style={{justifyContent: screenWidth > 1200 ? "flex-start" : "center"}}>
                            <div style={{background: data[key].status === "Paid" ? "#7FBA7A" : data[key].status === "Pending" ? "#e9cc00" : "#e34f3f"}}>{data[key].status}</div>
                        </div>
                        <div className={`${styles.date} ${theme === "dark" ? styles.dark : ""}`}>{data[key][`date_${lang}`]}</div>
                        <div className={`${styles.fee} ${theme === "dark" ? styles.dark : ""}`}>{data[key].currency}{data[key].fee}</div>
                    </motion.div>
                )) : data !== null && screenWidth < 480 && keys.length !== 0 ? keys.map(key => (
                    <motion.div
                        className={`${styles.payoutsRowMobile} ${theme === "dark" ? styles.dark : ""}`}
                        key={key}
                        layout
                        initial={{ opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={styles.top}>
                            {checkboxMaker(key, data[key].checked)}
                            <label className={styles.payout} htmlFor={key}>
                                <div className={styles.value}>{data[key].currency}{data[key].value.toFixed(2)}</div>
                                {data[key].discount_fee && <div className={styles.discountFee}>{data[key].currency}{data[key].discount_fee.toFixed(2)} {translation.transaction_fee}</div>}
                            </label>
                        </div>
                        <div className={`${styles.bottom} ${theme === "dark" ? styles.dark : ""}`}>
                            <div className={styles.colorBar} style={{ background: data[key].status === "Paid" ? "#7FBA7A" : data[key].status === "Pending" ? "#e9cc00" : "#e34f3f" }}></div>
                            <div className={styles.date}>{data[key][`date_${lang}`]}</div>
                            <div className={styles.paymentMethod}>{data[key].payment_method}</div>
                            <div className={styles.fee}>{data[key].currency}{data[key].fee}</div>
                        </div>
                    </motion.div>
                )) : <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.noProducts}>{translation.there_are_no_transaction_to_display}</motion.div>}
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
            <AnimatePresence>
                {isDeleteModalOpen &&
                    <PayoutDeleteModal
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDelete={handleDelete}
                        styles={styles}
                        checkedKeys={checkedKeys}
                        data={data}
                    />
                }
            </AnimatePresence>
        </motion.div>
    )
}


export default memo(WithdrawHistory)