import { useContext, useEffect, useState, useRef } from 'react'
import contextApi from '../StateManager'
import { AnimatePresence, motion } from 'framer-motion'
import HeaderMobile from '../components/HeaderMobile'
import Navbar from '../components/Navbar'
import NavbarMobile from '../components/NavbarMobile'
import Header from '../components/Header'
import HeaderMobileSub from '../sub-components/HeaderMobileSub'
import ForSearch from '../sub-components/ForSearch'
import styles from '../styles/pages/Inbox.module.scss'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase-config'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import SearchBox from '../layout/Inbox/SearchBox'
import InboxFilter from '../layout/Inbox/InboxFilter'
import MessageBox from '../layout/Inbox/MessageBox'
import ConversationViewer from '../layout/Inbox/ConversationViewer'

export default function Inbox() {

  const { screenWidth, theme, isNavOpen, testForNotification } = useContext(contextApi)

  const [searchValue, setSearchValue] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("your_inbox")
  const [conversations, setConversations] = useState([]);

  const mainContainer = useRef(null)
  const { key } = useParams()


  const MAIN_STYLE = {
    paddingTop: screenWidth > 480 ? "0px" : "80px",
    overflow: screenWidth > 480 ? "unset" : "visible", //! Yuxari olcude hidden verildikde navbar scroll olmur. sebebini bilmirem
    minWidth: screenWidth > 480 && isNavOpen ? "900px" : screenWidth > 480 && !isNavOpen ? "770px" : "",
  }

  const CONTAINER_STYLE = {
    width: isNavOpen && screenWidth > 480 ? "calc(100% - 220px)"
      : !isNavOpen && screenWidth > 480
        ? "calc(100% - 80px)" : "100%",
    transform: isNavOpen && screenWidth <= 480 ? "translateX(65%)" : "translateX(0%)", //! motion.div edende bu islemir, bunu animate attributunda vermek lazim gelecek...
    color: theme === "dark" ? "#fff" : "#11142D",
    overflowX: screenWidth > 480 ? "visible" : "hidden"
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  useEffect(() => {
    const conversationsRef = collection(db, 'conversation');

    let q; //todo firestore query'ini onceden assign edirik...

    switch (selectedFilter) {
      case "your_inbox":
        q = query(conversationsRef, where("isArchived", "==", false));
        break;
      case "archives":
        q = query(conversationsRef, where("isArchived", "==", true));
        break;
      case "done":
        q = query(conversationsRef, where("isArchived", "==", false), where("isDone", "==", true));
        break;
      case "saved":
        q = query(conversationsRef, where("isArchived", "==", false), where("isStarred", "==", true));
        break;

      default:
        console.error("Inbox component switch case error")
        alert("Something went wrong!!!")
        break;
    }

    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Extract keys and data from each document
      const conversationsData = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        data: doc.data(),
      }));


      // Set state with the updated data
      setConversations(conversationsData);
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [selectedFilter]);


  return (
    <main className={`${styles.main} ${theme === "dark" && styles.dark}`} style={MAIN_STYLE}>
      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position sticky ve ya fixeddi */}

      <motion.div className={styles.container} initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE} ref={mainContainer}>
        {(screenWidth > 480 || (screenWidth < 480 && !key)) &&
          <motion.div
            className={styles.left}
            initial={{
              width: screenWidth >= 480 ? "50%" : "100%",
              paddingTop: screenWidth > 480 ? "40px" : "",
              opacity: screenWidth < 480 && 0,
              position: screenWidth < 480 ? "absolute" : "relative",
              transform: screenWidth < 480 && "translateX(-100%)",
              background: theme === "dark" ? "#242731" : "#fff"
            }}
            animate={{
              width: screenWidth >= 480 ? "50%" : "100%",
              paddingTop: screenWidth > 480 ? "40px" : "",
              opacity: screenWidth < 480 && 1,
              position: screenWidth < 480 ? "absolute" : "relative",
              transform: screenWidth < 480 && "translateX(0%)",
              background: theme === "dark" ? "#242731" : "#fff"
            }}
          >
            {screenWidth > 480 ? <Header screenWidthRestriction={false} text={"your_inbox"} /> : <HeaderMobileSub text={"welcome_back"} />} {/* position static ve ya fixeddi */}
            <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
            <InboxFilter selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
            <MessageBox selectedFilter={selectedFilter} mainContainer={mainContainer} conversations={conversations} />

          </motion.div>
        }
        {(screenWidth >= 480 || (screenWidth < 480 && key)) &&
          <motion.div
            className={`${styles.right} ${theme === "dark" ? styles.dark : ""}`}
            initial={{
              transform: "translateX(100%)",
              width: screenWidth >= 480 ? "50%" : "100%",
              position: screenWidth < 480 ? "absolute" : "relative",
              opacity: screenWidth < 480 && 0,
              background: theme === "dark" ? "#242731" : "#fff"
            }}
            animate={{
              transform: "translateX(0%)",
              width: screenWidth >= 480 ? "50%" : "100%",
              position: screenWidth < 480 ? "absolute" : "relative",
              opacity: screenWidth < 480 && 1,
              background: theme === "dark" ? "#242731" : "#fff"
            }}
          // layout
          >
            {screenWidth > 480 &&
              <div className={styles.rightTop}>
                <ForSearch />
              </div>
            }
            {key ? <ConversationViewer />
              : <motion.div
                className={styles.nullConversation}
                initial={{
                  marginTop: screenWidth > 480 ? "70px" : "0px",
                  height: screenWidth > 480 ? "80vh" : "unset",
                  maxHeight: screenWidth > 480 ? "500px" : "unset",
                  position: screenWidth > 480 ? "sticky" : "static",
                  opacity: 0,
                  transform: "scale(1.2)"
                }}
                animate={{
                  marginTop: screenWidth > 480 ? "70px" : "0px",
                  height: screenWidth > 480 ? "80vh" : "unset",
                  maxHeight: screenWidth > 480 ? "500px" : "unset",
                  position: screenWidth > 480 ? "sticky" : "static",
                  opacity: 1,
                  transform: "scale(1)"
                }}
              >
                <motion.div className={styles.innerViewerMain}>There is no opened conversation yet:)</motion.div>
              </motion.div>
            }
          </motion.div>
        }
      </motion.div>
    </main>
  )
}