import './App.scss'
import contextApi from './StateManager'
import { useLayoutEffect, useState, useRef } from 'react';
import axios from 'axios';
import { auth, db } from './firebase-config'
import { doc, getDoc } from 'firebase/firestore';
import Routes from './Routes/Routes'


function App() {

  const [screenWidth, setScreenWidth] = useState(document.documentElement.clientWidth)
  const [theme, setTheme] = useState("light")
  const [lang, setLang] = useState("en")
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [translation, setTranslation] = useState(null)
  const forSearch = useRef(null)
  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const [testForNotification, setTestForNotification] = useState(15) //! SONDA HEM BURDAN HEMDE CONTEXTAPI'DAN SILMEK LAZIMDI MUTLEQ
  const [inputVal, setInputVal] = useState("")
  const [userScreenDetails, setUserScreenDetails] = useState(null)
  const [user, setUser] = useState("pending")
  const [avatar, setAvatar] = useState(null)

  function axiosGet(endPoint, setState) {
    axios.get(endPoint)
      .then(res => setState(res.data))
      .catch(err => console.log(err))
  }

  function convertValue(value) {
    let convertedValue = value
    if (convertedValue < 2000) {
      convertedValue = convertedValue
    } else if (convertedValue >= 2000 && convertedValue < 1000000) {
      convertedValue /= 1000
      convertedValue = `${convertedValue}K`
    } else {
      convertedValue /= 1000000
      convertedValue = `${convertedValue}M`
    }
    return convertedValue
  }

  function handleGetDataForAvatar() {
    // Get the currently authenticated user
    const user = auth.currentUser;

    // Use the user's UID to query Firestore
    if (user) {

      const userId = user.uid;

      // Example: Retrieve user data from Firestore
      const userDocRef = doc(db, 'users', userId);

      getDoc(userDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            // Document data is available in docSnapshot.data()
            const userData = docSnapshot.data();
            setAvatar(userData.avatar)
          }
        })
        .catch((error) => {
          console.log('Error getting userData:', error);
        });
    }
  }

  useLayoutEffect(() => {
    if (document.documentElement.clientWidth > 1200) { //todo Navbar'i komp versiyasinda acmaq ucun
      setIsNavOpen(true)
    }
    window.addEventListener("resize", () => { //todo x <= 480 , x < 1200 , x >= 1200

      if (document.documentElement.clientWidth >= 1200) { //todo screenWidth burda teyin olunur
        setScreenWidth(1210)
        setIsNavOpen(true)
      } else if (document.documentElement.clientWidth < 1200 && document.documentElement.clientWidth > 480) {
        setScreenWidth(490)
      } else if (document.documentElement.clientWidth <= 480 && document.documentElement.clientWidth > 360) {
        setScreenWidth(470)
      } else if (document.documentElement.clientWidth <= 360) {
        setScreenWidth(340)
      }

    })
    window.addEventListener("orientationchange", function () {
      setScreenWidth(470)
    });
    window.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.key === 'b' && document.documentElement.clientWidth < 1200 && document.documentElement.clientWidth > 480) {
        setIsNavOpen(prev => !prev)
      }
      if (event.ctrlKey && event.key === 'i') {
        setTheme(prev => prev === "dark" ? "light" : "dark")
      }
    });
    window.addEventListener('offline', () => {
      console.log("Loss connection");
    });

    window.addEventListener('beforeunload', function (event) {
      if (localStorage.getItem("rememberMe") !== "true") {
        auth.signOut()
        localStorage.removeItem("rememberMe")
      }
    });

    const currentTime = new Date().getHours();
    if (currentTime >= 20 || currentTime < 8) {
      setTheme("dark")
    }

    // console.log(auth)
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log(user)
      setTimeout(() => {
        if (user) {
          setUser(user)
          handleGetDataForAvatar()
        } else {
          setUser(null)
        }
      }, 700);
    });

    return () => unsubscribe();

  }, [])


  useLayoutEffect(() => {

    import(`./languages/${lang}.json`)
      .then(res => setTranslation(res.default))
      .catch(err => console.log(err))

  }, [lang])

  const data = {
    screenWidth,
    theme,
    setTheme,
    lang,
    setLang,
    isNavOpen,
    setIsNavOpen,
    translation,
    testForNotification,
    setTestForNotification,
    forSearch,
    isSettingOpen,
    setIsSettingOpen,
    axiosGet,
    inputVal,
    setInputVal,
    convertValue,
    userScreenDetails,
    setUserScreenDetails,
    user,
    setUser,
    avatar,
    setAvatar,
    handleGetDataForAvatar,
  }

  return (
    <contextApi.Provider value={data}>
      <Routes user={user} isSettingOpen={isSettingOpen} auth={auth} />
    </contextApi.Provider>
  )
}

export default App
