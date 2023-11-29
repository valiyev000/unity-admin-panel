import { motion } from 'framer-motion'
import DialogTemplate from '../../components/DialogTemplate';
import { useContext, useEffect, useState } from 'react';
import contextApi from '../../StateManager';
import { IoIosArrowForward } from "react-icons/io";
import { memo } from 'react';

function PayoutDeleteModal({ setIsDeleteModalOpen, handleDelete, styles, checkedKeys, data }) {

    const { screenWidth, theme, lang, translation } = useContext(contextApi)
    const [list, setList] = useState([])
    useEffect(() => { //todo Modal acilanda list yaradilir ve bu listin icine checkecKeyler elave olunur. Amma bir obyektin icine elave olunur. Daha sonra bu listi maplayib detallar ve s feature'sini yaratmaq mumkun olur.
        checkedKeys.map(key => {
            list.push({
                key: key,
                opened: false
            })
        })
        setList([...list])
    }, [])

    const handleOpen = (key)=>{ //todo deyisilen opened propertysini set etmeye imkan yaradir.
        list.map(block=>{
            if (block.key === key) {
                block.opened = !block.opened
            }
        })
        setList([...list]);
    }

    return (
        <DialogTemplate setModalOpen={setIsDeleteModalOpen}>
            <motion.div
                className={styles.deleteModal}
                initial={{
                    transform: "scale(1.2)",
                    width: screenWidth > 480 ? "80%" : "70%",
                }}
                animate={{
                    transform: "scale(1)",
                    background: theme === "dark" ? "#1F2128" : "#FFF",
                    color: theme === "dark" ? "#fff" : "#11142D",
                    width: screenWidth > 480 ? "80%" : "70%",
                }}
                exit={{
                    transform: "scale(1.2)"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{ fontSize: screenWidth > 480 ? 24 : 20 }}>{translation.are_you_sure_want_to_remove_the_selected_payouts}</h2>
                <div className={styles.content}>
                    {list.map(block => (
                        <div key={block.key} className={`${styles.deletedPayoutRow} ${theme === "dark" ? styles.dark : ""}`} style={{height: block.opened ? "172px" : "35px"}}>
                            <div className={styles.preview} onClick={()=>handleOpen(block.key)} style={{ justifyContent: block.opened ? "center" : "flex-start" }}>
                                <IoIosArrowForward className={styles.icon} style={{transform: block.opened ? "translateY(-50%) rotateZ(90deg)" : "translateY(-50%) rotateZ(0deg)"}} />
                                <motion.div layout>{data[block.key].currency}{data[block.key].value}</motion.div>
                            </div>
                            <div className={styles.details}>
                                <div>- {translation.date}: {data[block.key][`date_${lang}`]}</div>
                                <div>- {translation.status}: {data[block.key].status}</div>
                                <div>- {translation.payment_method}: {data[block.key].payment_method}</div>
                                <div>- {translation.fees}: {data[block.key].fee}{data[block.key].currency}</div>
                                <div>- {translation.transaction_fee}: {data[block.key].discount_fee ? data[block.key].discount_fee : 0}{data[block.key].currency}</div>
                                <div>- {translation.currency}: {data[block.key].currency}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.btns}>
                    <button onClick={() => setIsDeleteModalOpen(false)} style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}>{translation.no}</button>
                    <button onClick={() => { setIsDeleteModalOpen(false); handleDelete() }} autoFocus>{translation.yes}</button>
                </div>
            </motion.div>
        </DialogTemplate>
    )
}


export default memo(PayoutDeleteModal)