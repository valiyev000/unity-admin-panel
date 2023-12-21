import { createPortal } from 'react-dom'
import styles from '../styles/sub-components/ImgViewer.module.scss'

export default function ImgViewer({ imgSrc, setImgSrc }) {
  return (
    createPortal(
      <div className={styles.viewerMainBg}>
        <div className={styles.container}>
          <img src={imgSrc} alt="openedImgAsView" onClick={() => setImgSrc(null)} />
        </div>
      </div>,
      portal
    )
  )
}
