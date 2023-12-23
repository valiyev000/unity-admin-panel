import { memo, useContext } from "react"
import styles from './styles/FilterSection.module.scss'
import contextApi from "../../StateManager"
import { motion } from 'framer-motion'

function FilterSection({ selectedFilter, setSelectedFilter }) {

    const { screenWidth, translation } = useContext(contextApi)

    const handleChangeFilter = (value) => {
        setSelectedFilter(value)
    }

    return (
        <motion.div
            className={styles.filterMain}
            initial={{
                marginTop: screenWidth > 480 ? "24px" : "16px"
            }}
            animate={{
                marginTop: screenWidth > 480 ? "24px" : "16px"
            }}
            layout
        >
            <motion.button layout onClick={() => handleChangeFilter("clients")} style={{ background: selectedFilter === "clients" ? "#6C5DD3" : "transparent", color: selectedFilter === "clients" ? "#fff" : "unset", border: selectedFilter === "clients" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.clients}</motion.button>
            <motion.button layout onClick={() => handleChangeFilter("products")} style={{ background: selectedFilter === "products" ? "#6C5DD3" : "transparent", color: selectedFilter === "products" ? "#fff" : "unset", border: selectedFilter === "products" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.products}</motion.button>
            <motion.button layout onClick={() => handleChangeFilter("adminstrator")} style={{ background: selectedFilter === "adminstrator" ? "#6C5DD3" : "transparent", color: selectedFilter === "adminstrator" ? "#fff" : "unset", border: selectedFilter === "adminstrator" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.adminstrator}</motion.button>
            <motion.button layout onClick={() => handleChangeFilter("sales")} style={{ background: selectedFilter === "sales" ? "#6C5DD3" : "transparent", color: selectedFilter === "sales" ? "#fff" : "unset", border: selectedFilter === "sales" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.sales}</motion.button>
            <motion.button layout onClick={() => handleChangeFilter("withdrawals")} style={{ background: selectedFilter === "withdrawals" ? "#6C5DD3" : "transparent", color: selectedFilter === "withdrawals" ? "#fff" : "unset", border: selectedFilter === "withdrawals" ? "2px solid transparent" : "2px solid #ff754c" }}>{translation.withdrawals}</motion.button>
        </motion.div>
    )
}

export default memo(FilterSection)