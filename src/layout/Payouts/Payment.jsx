import { memo, useContext } from 'react'
import styles from './styles/Payment.module.scss'
import contextApi from '../../StateManager'
import { motion } from 'framer-motion'
import avatarImg from '../../images/customAvatar.png'
import { BsCheck } from 'react-icons/bs'
import paypalLogo from '../../images/paypalLogo.png'
import payoneerLogo from '../../images/payoneerLogo.png'

function Payment() {

    const { theme, screenWidth, translation, lang } = useContext(contextApi)

    const handleSoon = (e) => {
        if (lang === "az") {
            e.target.innerHTML = "Tezliklə..."
        } else {
            e.target.innerHTML = "Soon..."
        }

        setTimeout(() => {
            if (lang === "az") {
                e.target.innerHTML = "Deavtorizasiya"
            } else {
                e.target.innerHTML = "Deauthorize"
            }
        }, 2000);
    }

    return (
        <motion.div
            className={styles.main}
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0",
                width: screenWidth > 1200 ? "100%" : "100%"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0",
                width: screenWidth > 1200 ? "100%" : "100%"
            }}
            exit={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                margin: screenWidth > 480 ? "40px 0" : "29px 0",
                width: screenWidth > 1200 ? "100%" : "100%"
            }}
            layout
        >
            <motion.div layout className={styles.title}>{translation.choose_a_payment_method}</motion.div>
            <div className={styles.content} style={{flexDirection: screenWidth > 480 ? "row" : "column"}}>
                <div className={styles.currentPayout} style={{ boxShadow: theme === "light" ? "0px 0px 40px 0px rgba(230,215,255,0.95)" : "0px 0px 40px 0px rgba(5,5,5,0.65)", width: screenWidth > 480 ? "40%" : "100%" }}>
                    <img src={avatarImg} alt="avatarImg.png" />
                    <div className={styles.description}>{translation.you_didnt_select_any_payout_method}</div>
                </div>
                <div className={styles.changePayoutSection} style={{width: screenWidth > 480 ? "60%" : "100%" }}>
                    <div id={styles.selectPaypal}>
                        <input type="radio" name="selectPayout" id="selectPaypal" />
                        <label htmlFor="selectPaypal" style={{ border: theme === "dark" ? "2px solid transparent" : "2px solid #e3e6ec" }}>
                            <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor="selectPaypal">
                                <BsCheck className={styles.icon} size={18} color="white" />
                            </label>
                            <div className={styles.innerContainer}>
                                <img src={paypalLogo} alt="paypalLogo.png" />
                                <div className={styles.info}>{translation.your_paypal_account_has_been_authorized_for_payouts}</div>
                                <button onClick={(e) => handleSoon(e)} style={{ background: theme === "dark" ? "#E4E4E41A" : "#E4E4E4", color: theme === "dark" ? "#fff" : "#11142D" }}>{translation.deauthorize}</button>
                            </div>
                        </label>
                    </div>
                    <div id={styles.selectPayoneer}>
                        <input type="radio" name="selectPayout" id="selectPayoneer" />
                        <label htmlFor="selectPayoneer" style={{ border: theme === "dark" ? "2px solid transparent" : "2px solid #e3e6ec" }}>
                            <label className={`${styles.template} ${theme === "dark" ? styles.dark : ""}`} htmlFor="selectPaypal">
                                <BsCheck className={styles.icon} size={18} color="white" />
                            </label>
                            <div className={styles.innerContainer}>
                                <img src={payoneerLogo} alt="payoneerLogo.png" />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default memo(Payment)