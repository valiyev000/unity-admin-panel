import {motion} from 'framer-motion'
import DialogTemplate from '../../components/DialogTemplate';
import { useContext } from 'react';
import contextApi from '../../StateManager';


export default function DeleteModal({setIsDeleteModalOpen, handleDelete, styles, checkedKeys, data}) {

    const {screenWidth, theme, lang, translation} = useContext(contextApi)

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
                <h2 style={{ fontSize: screenWidth > 480 ? 24 : 20 }}>{translation.are_you_sure_want_to_remove_the_selected_products}</h2>
                <div className={styles.content}>
                    {checkedKeys.map(key => (
                        <div key={key} className={styles.deletedProductRow}>
                            <div className={styles.color} style={{ background: data[key].color_en }}></div>
                            <div className={styles.name}>{data[key][`name_${lang}`]}</div>
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
