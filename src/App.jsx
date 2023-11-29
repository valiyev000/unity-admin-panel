import './App.scss'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import contextApi from './StateManager'
import Home from './Pages/Home';
import Campaigns from './Pages/Campaigns';
// import Comment from './Pages/Comment';
import Inbox from './Pages/Inbox';
import Notification from './Pages/Notification';
import Payouts from './Pages/Payouts';
import Products from './Pages/Products';
import Statements from './Pages/Statements';
import { useLayoutEffect, useState } from 'react';
import { useRef } from 'react';
import Setting from './components/Setting';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';
import Login from './Pages/Login';
import { auth, db } from './firebase-config'
import { doc, getDoc } from 'firebase/firestore';


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
    if (document.documentElement.clientWidth > 1200) {
      setIsNavOpen(true)
    }
    window.addEventListener("resize", () => { //todo x <= 480 , x < 1200 , x >= 1200


      if (document.documentElement.clientWidth >= 1200) {
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

  console.log(auth) //!  ***************


    const unsubscribe = auth.onAuthStateChanged((user) => {
      // console.log(user)
      if (user) {
        setUser(user)
        handleGetDataForAvatar()
      } else {
        setUser(null)
      }
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
      <Router>
        {translation &&
          user !== null && user !== "pending" ?
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/campaigns">
              <Campaigns />
            </Route>
            {/* <Route exact path="/comment">
              <Comment />
            </Route> */}
            <Route exact path="/inbox">
              <Inbox />
            </Route>
            <Route exact path="/notification">
              <Notification />
            </Route>
            <Route exact path="/payouts">
              <Payouts />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/statements">
              <Statements />
            </Route>
          </Switch>
          : translation && user === null ?
            <Switch>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
            : ""
        }
        <AnimatePresence>
          {isSettingOpen && auth.currentUser && <Setting />}
        </AnimatePresence>
      </Router>
    </contextApi.Provider>
  )
}

export default App





// useLayoutEffect(() => {
//   if (token) {
//     Promise.all([
//       axios.get(`https://unity-admin-panel-default-rtdb.firebaseio.com/users/${token}/fullName.json`),
//       axios.get(`https://unity-admin-panel-default-rtdb.firebaseio.com/users/${token}/avatar.json`)
//     ])
//       .then(([fullNameRes, avatarRes]) => {
//         const data = {
//           fullName: fullNameRes.data,
//           avatar: avatarRes.data
//         };
//         setUserScreenDetails(data)
//       })
//       .catch(err => console.log(err));
//   }
// }, [token]);