import { memo } from "react"
import styles from './styles/PrintViewer.module.scss'
import { createPortal } from "react-dom"

function PrintViewer() {
    return createPortal(
        <div className={styles.printScrMain}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente temporibus sunt nam possimus similique consequuntur ad incidunt iusto, veritatis sit.
        </div>, portal
    )
}

export default memo(PrintViewer)