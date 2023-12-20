import React from 'react'
import { createPortal } from 'react-dom'
import styles from '../styles/sub-components/ImgViewer.module.scss'

export default function ImgViewer() {
  return (
    createPortal(
        <div className={styles.viewerMainBg}>
            Hello world
        </div>,
        portal
    )
  )
}
