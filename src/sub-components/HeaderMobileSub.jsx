import { useContext } from 'react'
import styles from '../styles/sub-components/HeaderMobileSub.module.scss'
import contextApi from '../StateManager'
import {motion} from 'framer-motion'

export default function HeaderMobileSub({text}) {

  const {translation, user} = useContext(contextApi)

  return (
    <div className={styles.main}>
      <motion.div layout>{translation.hi} {user.displayName}</motion.div>
      <motion.div layout>{translation[text]}</motion.div>
    </div>
  )
}
