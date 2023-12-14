import { memo, useContext, useState } from "react"
import styles from './styles/ProductTable.module.scss'
import contextApi from "../../StateManager"
import { AnimatePresence, motion } from 'framer-motion'
import { IoIosArrowDown } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { BiSolidPencil } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import imgProductNull from '../../images/imgProductNull.png'
import { useEffect } from "react";
import axios from "axios";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";



function ProductTable({ data, setData, getData }) {

    const { theme, translation, lang, screenWidth, isNavOpen, axiosGet } = useContext(contextApi)

    const [keys, setKeys] = useState([])
    const [checkedKeys, setCheckedKeys] = useState([])
    const [dates, setDates] = useState([])
    const [isDropDownMenuOpen, setIsDropDownMenuOpen] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState("Select Range")
    const [inputVal, setInputVal] = useState("")
    const [mainCheckboxVal, setMainCheckboxVal] = useState(false)
    const [isHaveMore, setIsHaveMore] = useState(false)
    const [addRange, setAddRange] = useState(10)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editedProduct, setEditedProduct] = useState(null)


    function checkboxMaker(id, checked) { //todo hazir komponentdi. checkbox lazim olanda istfade etmek olar
        return (
            <div className={styles.checkbox}>
                <input onChange={() => handleCheck(id)} type="checkbox" name="productCheckbox" id={id} checked={checked} />
                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={id}>
                    {checked && <BsCheck className={styles.icon} size={18} color="white" />}
                </label>
            </div>
        )
    }

    useEffect(() => { //* Bu funksiya productlarin date'lerini (elave olunduqlari zamani) secir ve dates stateine elave edir

        if (data !== null) {
            Object.keys(data).map(key => {
                dates.push(data[key].added_date_en) //todo select range ucun date araliqlarini cixardiriq
            })

            let set = new Set(dates);

            setDates(Array.from(set))
        }
    }, [data]);

    useEffect(() => { //* En esas funksiyani icra edir

        if (data !== null) {
            let templateKeys = Object.keys(data).map(key => key) //todo Datadan butun keyleri goturur

            if (selectedMonth !== "Select Range") {
                templateKeys = templateKeys.filter(key => data[key].added_date_en === selectedMonth) //todo Secilmis range'e uygun olaraq filterleyir
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

    }, [selectedMonth, inputVal, isHaveMore, addRange, data])

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

            console.log(templateKeys)

            checkedKeys.map(checkedKey => { //todo checked olunmus key'e sahib olan productlari bir bir silir...
                axios.delete(`https://unity-admin-panel-default-rtdb.firebaseio.com/db/products/${checkedKey}.json`)
                    .then(res => console.log(res))
                    .then(() => getData())
                    .catch(err => console.log(err))

                templateKeys = templateKeys.filter(key => key !== checkedKey) //todo silinmis olan keyler templateKeysde filterlenerek silinir
            })
            setKeys([...templateKeys]) //todo templateKeys esas state set olunur
        }

    }

    function handleForEditing() { //* Edit duymesi basilanda lazim olan producta get atir ve editModali open edir
        setIsEditModalOpen(true)

        axiosGet(`https://unity-admin-panel-default-rtdb.firebaseio.com/db/products/${checkedKeys[0]}.json`, setEditedProduct)
    }

    useEffect(() => { //*  Modal baglandigi zaman editedProduct'i null etmek ucn lazimdir
        if (!isEditModalOpen) {
            setEditedProduct(null)
        }
    }, [isEditModalOpen])

    function handleInputFile(e) { //* elde olunan sekili base64 formatina cevirir ve ya (else vasitesile) silir

        if (e !== "delCommand") {

            const img = e.target.files[0];

            const reader = new FileReader();
            reader.readAsDataURL(img)

            reader.onload = (e) => {
                editedProduct.img = e.target.result
                setEditedProduct({ ...editedProduct })
            };

        } else {
            setEditedProduct({ ...editedProduct, img: undefined })
        }

    }

    function handleInput(inputData, property) { //* useFormik mentiqi ile isleyir, inputun deyerini lazim olan property adi altinda editedProduct'in state'ine vurur
        editedProduct[property] = inputData
        setEditedProduct({ ...editedProduct })
    }

    function handleEditSaving() { //* Save duymesine basilan zaman ise dusur

        editedProduct.price = +editedProduct.price //todo string kimi gelen valuelari number'a keciririk 
        editedProduct.stock = +editedProduct.stock

        if (editedProduct.price === 0) {
            if (lang === "en") {
                alert("The price is set at 0.")
            } else {
                alert("Qiymət 0 kimi təyin olunur")
            }
        }

        if (editedProduct.stock === 0) {
            if (lang === "en") {
                alert("The stock count is set at 0.")
            } else {
                alert("Stok sayı 0 kimi təyin olunur.")
            }
        }

        if (editedProduct.name_en === "") { //todo hec bir problem yoxdusa melumati PUT edir
            alert("You cannot leave the name empty")
        } else if (editedProduct.name_az === "") {
            alert("Ad boş qoyula bilməz")
        } else if (editedProduct.category_en === "") {
            alert("You cannot leave the category empty")
        } else if (editedProduct.category_az === "") {
            alert("Kateqoriya boş qoyula bilməz")
        } else if (editedProduct.color_en === "") {
            alert("You cannot leave the color name empty")
        } else if (editedProduct.color_az === "") {
            alert("Rəngin adı boş qoyula bilməz")
        } else {
            axios.put(`https://unity-admin-panel-default-rtdb.firebaseio.com/db/products/${checkedKeys[0]}.json`, editedProduct)
                .then(res => {
                    console.log(res.data);
                    setIsEditModalOpen(false);
                    getData();
                })
                .catch(err => console.log(err))
        }



    }

    return (
        <motion.div
            className={styles.main}
            initial={{
                transform: "scale(1.1)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                background: theme === "dark" ? "#1F2128" : "#fff",
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                background: theme === "dark" ? "#1F2128" : "#fff",
            }}
        >
            <div className={styles.title}>
                <div className={styles.left} style={{ width: screenWidth > 480 ? "80%" : "100%", flexDirection: screenWidth < 1200 ? "column" : "row" }}>
                    <div className={styles.filter} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 0.3)", width: screenWidth > 1200 ? "50%" : "100%", maxWidth: screenWidth > 1200 ? "235px" : "none" }} tabIndex={0} onBlur={() => setIsDropDownMenuOpen(false)}>
                        <div className={styles.selected} onClick={() => setIsDropDownMenuOpen(prev => !prev)}>
                            <span>{selectedMonth}</span>
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
                                    <div
                                        className={styles.option}
                                        style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                        onClick={() => { setSelectedMonth("Select Range"); setIsDropDownMenuOpen(false) }}
                                    >
                                        Select Range
                                    </div>
                                    {dates.length !== 0 && dates.map(month => (
                                        <div
                                            key={month}
                                            style={{ borderColor: theme === "dark" ? "#3a3a3a" : "#ededed" }}
                                            className={styles.option}
                                            onClick={() => { setSelectedMonth(month); setIsDropDownMenuOpen(false) }}
                                        >
                                            {month}
                                        </div>
                                    ))}
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                    <div className={styles.inputDiv} style={{ background: theme === "dark" ? "rgba(228, 228, 228, 0.1)" : "rgba(228, 228, 228, 0.3)", width: screenWidth > 1200 ? "250px" : "100%" }}>
                        <RiSearchLine size={20} className={styles.icon} />
                        <input value={inputVal} onChange={(e) => setInputVal(e.target.value)} type="text" name="productTableSearch" id="productTableSearch" placeholder={translation.search} style={{ color: theme === "dark" ? "#fff" : "#000" }} />
                    </div>
                </div>
                {screenWidth > 480 && <div className={styles.right} style={{ flexDirection: screenWidth < 1200 && "column" }}>
                    <button disabled={!checkedKeys.length} className={styles.icon} onClick={() => setIsDeleteModalOpen(true)} style={{ boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)", background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><IoTrashBinSharp color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                    <button disabled={checkedKeys.length !== 1} className={styles.icon} onClick={handleForEditing} style={{ boxShadow: theme === "dark" ? "0px 6px 10px 3px rgba(8,8,8,1)" : "0px 6px 10px 3px rgba(219,219,219,1)", background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><BiSolidPencil color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                </div>
                }
            </div>
            <div className={styles.gridContainer}>
                {screenWidth > 480 ?
                    <div className={styles.topRow} style={{ gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "4fr 1fr 1fr 1fr 1fr" }}>
                        <div className={`${styles.firstColumn} ${theme === "dark" ? styles.dark : ""}`}>
                            <div className={styles.checkbox}>
                                <input onChange={handleMainCheck} type="checkbox" name="productCheckbox" id={"mainCheckbox"} checked={mainCheckboxVal} />
                                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={"mainCheckbox"}>
                                    {mainCheckboxVal && <BsCheck className={styles.icon} size={18} color="white" />}
                                </label>
                            </div>
                            <label className={styles.product} htmlFor="mainCheckbox">{translation.product}</label>
                        </div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.amount}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: screenWidth < 1200 ? "center" : "unset" }}>{translation.color}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.price}</div>
                        <div className={`${theme === "dark" ? styles.dark : ""}`}>{translation.rating}</div>
                    </div>
                    : <div className={`${styles.topRowMobile} ${theme === "dark" ? styles.dark : ""}`}>
                        <div className={styles.left}>
                            <div className={styles.checkbox}>
                                <input onChange={handleMainCheck} type="checkbox" name="productCheckbox" id={"mainCheckbox"} checked={mainCheckboxVal} />
                                <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor={"mainCheckbox"}>
                                    {mainCheckboxVal && <BsCheck className={styles.icon} size={18} color="white" />}
                                </label>
                            </div>
                            <label className={styles.product} htmlFor="mainCheckbox">{translation.product}</label>
                        </div>
                        <div className={styles.right}>
                            <button disabled={!checkedKeys.length} className={styles.icon} onClick={() => setIsDeleteModalOpen(true)} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><IoTrashBinSharp color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                            <button disabled={checkedKeys.length !== 1} className={styles.icon} onClick={handleForEditing} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}><BiSolidPencil color={theme === "dark" ? "#fff" : "rgb(31, 33, 40)"} /></button>
                        </div>
                    </div>
                }
                <AnimatePresence>
                    {data !== null && screenWidth > 480 && keys.length !== 0 ? keys.map(key => (
                        <motion.div
                            className={styles.productRow}
                            key={key}
                            layout
                            initial={{
                                opacity: 0,
                                gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "4fr 1fr 1fr 1fr 1fr"
                            }}
                            animate={{
                                opacity: 1,
                                gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "4fr 1fr 1fr 1fr 1fr"
                            }}
                            exit={{
                                opacity: 0,
                                gridTemplateColumns: screenWidth > 1200 ? "2fr 1fr 1fr 1fr 1fr" : "4fr 1fr 1fr 1fr 1fr"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`${styles.firstColumn} ${theme === "dark" ? styles.dark : ""}`}>
                                {checkboxMaker(key, data[key].checked)}
                                <div className={styles.imgBox}>
                                    <img src={data[key].img === undefined ? imgProductNull : data[key].img} alt="demo.png" />
                                </div>
                                <label className={styles.product} htmlFor={key}>
                                    <div className={styles.name}>{data[key][`name_${lang}`]}</div>
                                    <div className={styles.category}>{data[key][`category_${lang}`]}</div>
                                </label>
                            </div>
                            <div className={`${styles.stock} ${theme === "dark" ? styles.dark : ""}`}>{lang === "az" && translation.in_stock} {data[key].stock} {lang === "en" && translation.in_stock}</div>
                            <div className={`${styles.color} ${theme === "dark" ? styles.dark : ""}`} style={{ justifyContent: screenWidth < 1200 ? "center" : "unset" }}>
                                <div className={styles.colorViewer} style={{ background: data[key].color, borderRadius: screenWidth < 1200 ? "50%" : "4px" }}></div>
                                {screenWidth > 1200 && <div className={styles.colorName}>{data[key][`color_${lang}`]}</div>}
                            </div>
                            <div className={`${styles.price} ${theme === "dark" ? styles.dark : ""}`}>{data[key].currency}{data[key].price.toFixed(2)}</div>
                            <div className={`${styles.rating} ${theme === "dark" ? styles.dark : ""}`}>
                                <span>{data[key].rating}</span>
                                <span>({data[key].votes_count} {translation.votes})</span>
                            </div>
                        </motion.div>
                    )) : data !== null && screenWidth < 480 && keys.length !== 0 ? keys.map(key => (
                        <motion.div
                            className={`${styles.productRowMobile} ${theme === "dark" ? styles.dark : ""}`}
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
                                <div className={styles.imgBox}>
                                    <img src={data[key].img === undefined ? imgProductNull : data[key].img} alt="demo.png" />
                                </div>
                                <label className={styles.product} htmlFor={key}>
                                    <div className={styles.name}>{data[key][`name_${lang}`]}</div>
                                    <div className={styles.category}>{data[key][`category_${lang}`]}</div>
                                </label>
                            </div>
                            <div className={`${styles.bottom} ${theme === "dark" ? styles.dark : ""}`}>
                                <div className={styles.colorBar} style={{ background: data[key].color }}></div>
                                <div className={styles.price}>{data[key].currency}{data[key].price}</div>
                                <div className={styles.stock}>{lang === "en" ? `${data[key].stock} in stock` : `Stok sayı ${data[key].stock}`}</div>
                                <div className={styles.rating}>{data[key].rating}</div>
                            </div>
                        </motion.div>
                    )) : <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.noProducts}>{translation.there_are_no_products_to_display}</motion.div>
                    }
                </AnimatePresence>
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
                    <DeleteModal
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDelete={handleDelete}
                        styles={styles}
                        checkedKeys={checkedKeys}
                        data={data}
                    />
                }
            </AnimatePresence>
            <AnimatePresence>
                {isEditModalOpen && editedProduct &&
                    <EditModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        styles={styles}
                        editedProduct={editedProduct}
                        handleInput={handleInput}
                        handleInputFile={handleInputFile}
                        handleEditSaving={handleEditSaving}
                    />
                }
            </AnimatePresence>
        </motion.div>

    )
}

export default memo(ProductTable)