import { memo, useContext } from "react"
import styles from './styles/SearchBox.module.scss'
import contextApi from "../../StateManager"
import { IoSearchOutline } from "react-icons/io5"
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

function SearchBox({ searchValue, setSearchValue }) {

  const { theme, translation, screenWidth } = useContext(contextApi)

  return (
    <motion.div
      className={`${styles.searchBoxMain} ${theme === "dark" ? styles.dark : ""}`}
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

export default memo(SearchBox)


SearchBox.propTypes = {
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.func,
};