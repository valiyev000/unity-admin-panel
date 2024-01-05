import { memo, useContext } from "react"
import {motion} from 'framer-motion'
import contextApi from "../../StateManager"
import DialogTemplate from "../../components/DialogTemplate"

function DeleteModal({setIsDelModalOpen, styles, handleClose, handleConfirm}) {

    const {screenWidth, theme, translation} = useContext(contextApi)

    return (
        <DialogTemplate setModalOpen={setIsDelModalOpen}>
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
                <h2 style={{ fontSize: screenWidth > 480 ? 24 : 20 }}>{translation.are_you_sure_you_want_to_delete_this_notification}</h2>
                <div className={styles.btns}>
                    <button onClick={handleClose} style={{ color: theme === "dark" ? "#fff" : "rgb(17, 20, 45)" }}>{translation.no}</button>
                    <button onClick={handleConfirm}>{translation.yes}</button>
                </div>
            </motion.div>
        </DialogTemplate>
    )
}

export default memo(DeleteModal)