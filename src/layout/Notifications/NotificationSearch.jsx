import { useContext, useState } from 'react'
import styles from './styles/NotificationSearch.module.scss'
import contextApi from '../../StateManager'
import { motion } from 'framer-motion'
import { IoSearchOutline } from 'react-icons/io5'

export default function NotificationSearch({searchValue, setSearchValue}) {

    const { theme, translation, screenWidth } = useContext(contextApi)

    return (
        <motion.div
            className={`${styles.searchMain} ${theme === "dark" ? styles.dark : ""}`}
            layout
            initial={{
                marginTop: screenWidth > 480 ? "20px" : ""
            }}
            animate={{
                marginTop: screenWidth > 480 ? "20px" : ""
            }}
        >
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} type="text" name="searchBox" id="searchBox" placeholder={translation.search} />
            <IoSearchOutline className={styles.icon} color={theme === "dark" ? "#fff" : "rgb(17, 20, 45)"} size={24} />
        </motion.div>
    )
}
