import { memo, useContext, useEffect, useState } from 'react'
import styles from '../styles/pages/Login.module.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { auth } from '../firebase-config'
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import vector1 from '../images/vector-1.png'
import vector4_1 from '../images/vector4-1.png'
import vector4_2 from '../images/vector4-2.png'
import vector2 from '../images/vector-2.png'
import vector3 from '../images/vector-3.png'
import vector5 from '../images/vector-5.png'
import vector6 from '../images/vector-6.png'
import vector7 from '../images/vector-7.png'
import vector8 from '../images/vector-8.png'
import vector9 from '../images/vector-9.png'
import logo from '../images/unityLogoDark.png'
import { BsCheck } from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import contextApi from '../StateManager'

function Login() {

  const { screenWidth } = useContext(contextApi)

  const [requestData, setRequestData] = useState({
    email: "",
    password: ""
  }) //todo Burda daxil olmaga calisan istfadecinin form'a daxil etdiyi melumatlar saxlanilir
  const [alertText, setAlertText] = useState("") //todo Ekranda alert yazisi gorsetmek ucundu
  const [checked, setChecked] = useState(false)
  const [isFormShown, setIsFormShown] = useState(true)

  const url = useHistory(); //todo url'i burdan elde edirik (meselen... localhost:5173/products ---> /products )

  useEffect(() => {
    url.push('/'); //todo Sehife acilanda sonda olan path'i silirik ---> localhost:5173
  }, [])

  function handleSubmit(e) {
    setAlertText("")
    e.preventDefault()
    signInWithEmailAndPassword(auth, requestData.email, requestData.password)
      .then((userCredencial) => {
        setAlertText("Correct")
      })
      .catch((err) => {
        console.error(err)
        setAlertText("Wrong email or password")
      })
  }

  function handleRemember(e) {
    localStorage.setItem("rememberMe", e.target.checked)
    setChecked(e.target.checked)
  }

  function handleForget() {
    sendPasswordResetEmail(auth, requestData.email)
      .then(() => {
        alert(`The reset email sent to ${requestData.email} address!`)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        alert("Something went wrong at resetting the email")
      });
  }

  return (
    <main className={styles.main}>
      <img src={vector1} className={`${styles.vectors} ${styles.vector1}`} alt="vector-1" />
      <div className={styles.imgDiv}>
        <img src={vector4_1} alt="vector4-1" />
        <img src={vector4_2} alt="vector4-2" />
      </div>
      <img src={vector2} className={`${styles.vectors} ${styles.vector2}`} alt="vector-2" />
      <img src={vector3} className={`${styles.vectors} ${styles.vector3}`} alt="vector-3" />
      <img src={vector5} className={`${styles.vectors} ${styles.vector5}`} alt="vector-5" />
      <img src={vector6} className={`${styles.vectors} ${styles.vector6}`} alt="vector-6" />
      <img src={vector7} className={`${styles.vectors} ${styles.vector7}`} alt="vector-7" />
      <img src={vector8} className={`${styles.vectors} ${styles.vector8}`} alt="vector-8" />
      <img src={vector9} className={`${styles.vectors} ${styles.vector9}`} alt="vector-9" />
      <AnimatePresence>
        {isFormShown &&
          <motion.form
            action="/"
            method="post"
            onSubmit={handleSubmit}
            initial={{
              width: screenWidth < 480 ? "80%" : "50%",
              padding: screenWidth < 480 ? "30px 20px" : "30px 60px",
              minWidth: screenWidth < 480 ? "unset" : "380px",
              transform: "scale(1.2)",
              backdropFilter: "blur(0)"
            }}
            animate={{
              width: screenWidth < 480 ? "80%" : "50%",
              padding: screenWidth < 480 ? "30px 20px" : "30px 60px",
              minWidth: screenWidth < 480 ? "unset" : "380px",
              transform: "scale(1.0)",
              backdropFilter: "blur(12.5px)"
            }}
            exit={{
              width: screenWidth < 480 ? "80%" : "50%",
              padding: screenWidth < 480 ? "30px 20px" : "30px 60px",
              minWidth: screenWidth < 480 ? "unset" : "380px",
              transform: "scale(1.2)",
              backdropFilter: "blur(0)",
              opacity: 0
            }}
            layout
            transition={{
              duration: 1,
              ease: "anticipate"
            }}
          >
            <img src={logo} alt="logo.png" />
            <div className={styles.loginText}>Login</div>
            <motion.div layout className={styles.alertText}>{alertText}</motion.div>
            <label htmlFor="email" className={styles.emailLabel}>
              <div>Email</div>
              <input type="email" name="email" id="email" placeholder='Email' value={requestData.email} onChange={e => setRequestData(prev => ({ ...prev, email: e.target.value }))} />
            </label>
            <label htmlFor="password" className={styles.passwordLabel}>
              <div>Password</div>
              <input type="password" name="password" id="password" placeholder='Password' value={requestData.password} onChange={e => setRequestData(prev => ({ ...prev, password: e.target.value }))} />
            </label>
            <div className={styles.actionBar}>
              <label htmlFor='rememberMe' className={styles.rememberMeLabel}>
                <input type="checkbox" name="rememberMe" id="rememberMe" onChange={(e) => handleRemember(e)} />
                <label className={styles.template} htmlFor="rememberMe">
                  {checked && <BsCheck className={styles.icon} size={18} color="white" />}
                </label>
                <div>Remember Me</div>
              </label>
              <div className={styles.forgetPass} onClick={handleForget}>Forget Password</div>
            </div>
            <button type='submit'>Sign in</button>
          </motion.form>
        }
      </AnimatePresence>
    </main>
  )
}

export default memo(Login)
