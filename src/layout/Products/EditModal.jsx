import { motion } from "framer-motion";
import DialogTemplate from "../../components/DialogTemplate";
import { useContext } from "react";
import contextApi from "../../StateManager";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import imgProductNull from '../../images/imgProductNull.png'

export default function EditModal({setIsEditModalOpen, styles, editedProduct, handleInput, handleInputFile, handleEditSaving}) {

    const {theme, screenWidth, lang, translation} = useContext(contextApi)

  return (
    <DialogTemplate setModalOpen={setIsEditModalOpen}>
    <motion.div
        className={styles.editModal}
        initial={{
            transform: "scale(1.2)",
        }}
        animate={{
            transform: "scale(1)",
            background: theme === "dark" ? "#1F2128" : "#FFF",
            color: theme === "dark" ? "#fff" : "#11142D"
        }}
        exit={{
            transform: "scale(1.2)",
            background: theme === "dark" ? "#1F2128" : "#FFF",
        }}
        onClick={(e) => e.stopPropagation()}>
        <h2>{lang === "en" && translation.edit} {editedProduct[`name_${lang}`]} {lang === "az" && translation.edit}</h2>
        <div className={styles.content}>
            <div className={styles.name} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2" }}>
                <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Name (In English)</div>
                <input value={editedProduct.name_en} onChange={(e) => { handleInput(e.target.value, "name_en"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="text" name="nameEn" id="nameEn" placeholder="Name" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
            </div>
            <div className={styles.name} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2"}}>
                <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Ad (Azərbaycanca)</div>
                <input value={editedProduct.name_az} onChange={(e) => { handleInput(e.target.value, "name_az"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="text" name="nameAz" id="nameAz" placeholder="Ad" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
            </div>
            <div className={styles.category} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2"}}>
                <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Category (In English)</div>
                <input value={editedProduct.category_en} onChange={(e) => { handleInput(e.target.value, "category_en"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="text" name="categoryEn" id="categoryEn" placeholder="Category" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
            </div>
            <div className={styles.category} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2"}}>
                <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Kateqoriya (Azərbaycanca)</div>
                <input value={editedProduct.category_az} onChange={(e) => { handleInput(e.target.value, "category_az"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="text" name="categoryAz" id="categoryAz" placeholder="Kateqoriya" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
            </div>
            <div className={styles.colorName} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2"}}>
                <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Color Name (En)</div>
                <input value={editedProduct.color_en} onChange={(e) => { handleInput(e.target.value, "color_en"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="text" name="Color" id="Color" placeholder="Color" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
            </div>
            <div className={styles.color} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2"}}>
                <div className={styles.colorName}>
                    <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Rəngin adı (Az)</div>
                    <input value={editedProduct.color_az} onChange={(e) => { handleInput(e.target.value, "color_az"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="text" name="Rəng" id="Rəng" placeholder="Rəng" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
                </div>
                <input value={editedProduct.color} onChange={(e) => { handleInput(e.target.value, "color"); e.target.style.border = "" }} type="color" name="color" id="color" />
            </div>
            <div className={styles.priceBox} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2"}}>
                <div className={styles.price}>
                    <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Price</div>
                    <input value={editedProduct.price} onChange={(e) => { handleInput(e.target.value, "price"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="number" name="price" id="price" placeholder="99.99" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
                </div>
                <select defaultValue={editedProduct.currency} onChange={(e) => handleInput(e.target.value, "currency")} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff", color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} name="currency" id="currency">
                    <option value="₼">₼</option>
                    <option value="$">$</option>
                </select>
            </div>
            <div className={styles.stock} style={{gridColumn: screenWidth > 480 ? "span 1" : "span 2"}}>
                <div className={styles.legend} style={{ background: theme === "dark" ? "rgb(31, 33, 40)" : "#fff" }}>Stock</div>
                <input value={editedProduct.stock} onChange={(e) => { handleInput(e.target.value, "stock"); e.target.value.length === 0 ? (e.target.style.border = "1px solid red") : (e.target.style.border = "1px solid #b2b3bd") }} type="number" name="stock" id="stock" placeholder="10" style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }} />
            </div>
            <div className={styles.imgBox}>
                <div className={styles.preview}>
                    <img src={editedProduct.img ? editedProduct.img : imgProductNull} alt="" />
                    {editedProduct.img !== undefined && <IoMdRemoveCircleOutline onClick={() => handleInputFile("delCommand")} className={styles.delIcon} />}
                </div>
                <input type="file" onChange={(e) => handleInputFile(e)} name="imgInput" id="imgInput" accept=".jpg, .jpeg, .png, .gif" />
                <label htmlFor="imgInput" style={{fontSize: screenWidth > 480 ? "18px" : "12px"}}>{editedProduct.img ? translation.click_here_to_upload_another_image : translation.click_here_to_upload_another_image}</label>
            </div>
        </div>
        <div className={styles.btns}>
            <button className={styles.closeBtn} onClick={() => setIsEditModalOpen(false)} style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}>{translation.close}</button>
            <button className={styles.saveBtn} onClick={handleEditSaving}>{translation.save}</button>
        </div>
    </motion.div>
</DialogTemplate>
  )
}
