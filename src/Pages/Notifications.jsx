import { useEffect } from 'react'
import styles from '../styles/pages/Notifications.module.scss'

export default function Notifications() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className={styles.main}>
            Notifications
        </div>
    )
}
