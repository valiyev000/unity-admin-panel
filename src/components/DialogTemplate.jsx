import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function DialogTemplate({children , setModalOpen}) {

    useEffect(() => {
        function overflowFunc() {
            document.body.style.overflow = "hidden"
        }
        overflowFunc()
        window.addEventListener("resize", overflowFunc)
        function handleKeyUp(e) {
            if (e.key === "Escape") setModalOpen(false);
        }
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("resize", overflowFunc)
            window.removeEventListener("keyup", handleKeyUp);
            document.body.style.overflow = "visible"
        }
    }, [])

    return createPortal(
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            exit={{
                opacity: 0
            }}
            transition={{duration: 0.3}}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                background: "rgba(0, 0, 0, 0.2)",
                backdropFilter: "blur(2px)",
                width: "100%",
                height: "100vh",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}
            onClick={(e)=>setModalOpen(false)}
        >
            {children}
        </motion.div>,
        portal
    )
}
