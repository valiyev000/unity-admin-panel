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
import { collection, doc, onSnapshot, query, serverTimestamp, setDoc, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import SearchBox from '../layout/Inbox/SearchBox'
import InboxFilter from '../layout/Inbox/InboxFilter'
import MessageBox from '../layout/Inbox/MessageBox'
import ConversationViewer from '../layout/Inbox/ConversationViewer'

export default function Inbox() {

  const { screenWidth, theme, isNavOpen, translation, testForNotification } = useContext(contextApi)

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

  function filteringForSearchBox(data) {


  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    const conversationsRef = collection(db, 'conversations');

    let q; //todo firestore query'ini onceden assign edirik...

    switch (selectedFilter) {
      case "your_inbox":
        q = query(conversationsRef, orderBy('modifiedTime', 'desc'), where("isArchived", "==", false));
        break;
      case "archives":
        q = query(conversationsRef, orderBy('modifiedTime', 'desc'), where("isArchived", "==", true));
        break;
      case "done":
        q = query(conversationsRef, orderBy('modifiedTime', 'desc'), where("isArchived", "==", false), where("isDone", "==", true));
        break;
      case "saved":
        q = query(conversationsRef, orderBy('modifiedTime', 'desc'), where("isArchived", "==", false), where("isStarred", "==", true));
        break;

      default:
        console.error("Inbox component switch case error")
        alert("Something went wrong!!!")
        break;
    }

    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // Extract keys and data from each document
      let conversationsData = querySnapshot.docs.map((doc) => ({
        key: doc.id,
        data: doc.data(),
      }));

      conversationsData = conversationsData.filter((element) =>
      element.data.messages.some((message) =>
        message.text.toLowerCase().includes(searchValue.toLowerCase()) 
      )
      || element.data.userName.toLowerCase().includes(searchValue.toLowerCase())
    );

    setConversations(conversationsData);

    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [selectedFilter, searchValue]);


  const conversationModel = {
    i3wyfcbpuefcnviofj2p: {
      userName: "Tərlan Rəhmanzadə",
      userAvatar: "https://firebasestorage.googleapis.com/v0/b/unity-admin-panel.appspot.com/o/conversation_avatar%2FTarlan_Avatar.jpg?alt=media&token=4d5b4041-53d5-4634-bc29-f34022b84452",
      modifiedTime: serverTimestamp(),
      isArchived: false,
      isDone: false,
      isStarred: false,
      messages: [
        {
          senderIsMe: true,
          whenSent: new Date(),
          isBold: false,
          isItalic: false,
          wasRead: false,
          text: "Hər vaxtınız xeyir. Qısa müddət ərzində müraciətinizə baxılacaq",
          photoArr: [
            {
              id: 0.5432344599,
              imgName: "AttacmentNewMessage.jpg",
              imgSize: "4.6Mb",
              imgURL: "https://unblast.com/wp-content/uploads/2019/11/Analytics-Ui-Kit-1-1600x1800.jpg"
            },
            {
              id: 0.34758990859,
              imgName: "AttacmentNewMessage2.png",
              imgSize: "5.6Mb",
              imgURL: "https://images.ui8.net/uploads/2_1595437468099.png"
            }
          ]
        },
        {
          senderIsMe: false,
          whenSent: new Date(),
          isBold: true,
          isItalic: false,
          wasRead: false,
          text: "Salam. Sifarişimlə bağlı problemim var",
          photoArr: [
            {
              id: 0.54347847986,
              imgName: "AttacmentNewMessage.jpg",
              imgSize: "4.6Mb",
              imgURL: "https://firebasestorage.googleapis.com/v0/b/unity-admin-panel.appspot.com/o/conversation_avatar%2FTarlan_Avatar.jpg?alt=media&token=4d5b4041-53d5-4634-bc29-f34022b84452"
            },
            {
              id: 0.41237485789,
              imgName: "AttacmentNewMessage2.png",
              imgSize: "5.6Mb",
              imgURL: "https://firebasestorage.googleapis.com/v0/b/unity-admin-panel.appspot.com/o/conversation_avatar%2FTarlan_Avatar.jpg?alt=media&token=4d5b4041-53d5-4634-bc29-f34022b84452"
            }
          ]
        },
      ]
    },
    a5u7di68co7fiytkf: {
      userName: "Süleyman Vəliyev",
      userAvatar: null,
      modifiedTime: serverTimestamp(),
      isArchived: false,
      isDone: false,
      isStarred: false,
      messages: [
        {
          senderIsMe: false,
          whenSent: new Date(),
          isBold: false,
          isItalic: false,
          wasRead: false,
          text: "Ən qısa zamanda qiymətləndirəcəm. Təşəkkürlər",
          photoArr: [
            {
              id: 0.78132688437,
              imgName: "Screenshot.jpg",
              imgSize: "4.6Mb",
              imgURL: "https://images.ctfassets.net/lzny33ho1g45/full-page-screenshots-in-chrom-p-img/8ba0bdd4880517caff45db805576c591/Screenshot.jpg?w=1520&fm=jpg&q=30&fit=thumb&h=760"
            },
            {
              id: 0.176545667908,
              imgName: "ss22.png",
              imgSize: "5.6Mb",
              imgURL: "https://m.media-amazon.com/images/I/51K1mE5uVyL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
            }
          ]
        },
        {
          senderIsMe: true,
          whenSent: new Date(),
          isBold: true,
          isItalic: false,
          wasRead: false,
          text: "Salam, zəhmət olmasa sifarişi qiymətləndirin.",
          photoArr: [
            {
              id: 0.6536456678,
              imgName: "camImg.jpg",
              imgSize: "4.6Mb",
              imgURL: "https://www.telegraph.co.uk/content/dam/recommended/2023/01/11/TELEMMGLPICT000321696243_trans_NvBQzQNjv4BqqVzuuqpFlyLIwiB6NTmJwfSVWeZ_vEN7c6bHu2jJnT8.jpeg?imwidth=960"
            },
            {
              id: 0.65364435646,
              imgName: "AttacmentNewMessage2.png",
              imgSize: "5.6Mb",
              imgURL: "https://fabrilife.com/products/650a78ab96aa2-square.jpeg?v=20"
            }
          ]
        },
      ]
    },
    uyi6798f79i65fo8g: {
      userName: "Xəndan Abdurahmanzadə",
      userAvatar: "https://firebasestorage.googleapis.com/v0/b/unity-admin-panel.appspot.com/o/conversation_avatar%2FXendan_avatar.jpg?alt=media&token=3af2ffb0-b0a5-410b-83ce-5fa9bb83518d",
      modifiedTime: serverTimestamp(),
      isArchived: false,
      isDone: false,
      isStarred: false,
      messages: [
        {
          senderIsMe: true,
          whenSent: new Date(),
          isBold: false,
          isItalic: true,
          wasRead: false,
          text: "Kuponlar barədə qısa zaman ərzində məlumat veriləcək...",
          photoArr: []
        },
        {
          senderIsMe: false,
          whenSent: new Date(),
          isBold: false,
          isItalic: false,
          wasRead: false,
          text: "Hər hansı endirim kuponu mövcuddurmu?",
          photoArr: []
        },
      ]
    }
  }

  const handleSendData = async () => {  //todo conversation'lari ilk defeden gondermek ucundur. Sonda siline biler!!!
    const collectionRef = collection(db, "conversations");

    const promises = Object.keys(conversationModel).map(async (key) => {
      const docRef = doc(collectionRef, key);
      await setDoc(docRef, conversationModel[key]);
    });

    await Promise.all(promises);
  };


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
            <button onClick={handleSendData}>Send temp</button>
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
                <motion.div className={styles.innerViewerMain}>{translation.there_is_no_opened_conversation_yet}</motion.div>
              </motion.div>
            }
          </motion.div>
        }
      </motion.div>
    </main>
  )
}