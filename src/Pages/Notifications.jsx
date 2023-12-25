import { useContext, useEffect, useState } from 'react'
import styles from '../styles/pages/Notifications.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import contextApi from '../StateManager';
import HeaderMobile from '../components/HeaderMobile';
import Navbar from '../components/Navbar';
import NavbarMobile from '../components/NavbarMobile';
import Header from '../components/Header';
import HeaderMobileSub from '../sub-components/HeaderMobileSub';
import NotificationSearch from '../layout/Notifications/NotificationSearch';
import FilterSection from '../layout/Notifications/FilterSection';
import { serverTimestamp } from 'firebase/firestore';
import NotificationList from '../layout/Notifications/NotificationList';

export default function Notifications() {

  const { theme, screenWidth, isNavOpen } = useContext(contextApi)
  const [searchValue, setSearchValue] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("clients")
  const [data, setData] = useState(null)

  const MAIN_STYLE = {
    backgroundColor: theme === "dark" ? "#242731" : "#fff",
    paddingTop: screenWidth > 480 ? "0px" : "80px",
    minWidth: screenWidth > 480 && isNavOpen ? "800px" : screenWidth > 480 && !isNavOpen ? "670px" : ""
  }

  const CONTAINER_STYLE = {
    width: isNavOpen && screenWidth > 480 ? "calc(100% - 220px)"
      : !isNavOpen && screenWidth > 480
        ? "calc(100% - 80px)" : "100%",
    transform: isNavOpen && screenWidth <= 480 ? "translateX(65%)" : "translateX(0%)", //! motion.div edende bu islemir, bunu animate attributunda vermek lazim gelecek...
    color: theme === "dark" ? "#fff" : "#11142D",
    paddingTop: screenWidth > 480 && "40px"
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const notificationModel = {
    ytrduxyi6do87p9f8v: {
      id: 1,
      userAvatar: null,
      username: "Glenn Greer",
      notiType: "comment", //todo comment || purchase || like
      time: serverTimestamp(),
      text: "Love this so much! What tools do you use to create your 3d illustrations?", //todo It can be empty
      productImage: null,
      productName: "Collab UI Kit",
      reaction: null, //todo true || false || null
      senderType: "clients", //todo clients || products || adminstrator || sales || withdrawals 
    },
    abc123xyz456: {
      id: 2,
      userAvatar: null,
      username: "Alice Smith",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Just made a purchase. Can't wait to receive it!",
      productImage: null,
      productName: "Bento 3D Kit",
      reaction: null,
      senderType: "withdrawals",
    },
    def456uvw789: {
      id: 3,
      userAvatar: null,
      username: "Admin",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Important announcement: System maintenance scheduled for tomorrow.",
      productImage: null,
      productName: "Elegance Gold Watch",
      reaction: null,
      senderType: "administrator",
    },
    hij789lmn012: {
      id: 4,
      userAvatar: null,
      username: "Bob Johnson",
      notiType: "like",
      time: serverTimestamp(),
      text: "Liked your latest artwork! Keep it up!",
      productImage: null,
      productName: "Gaming Pro Keyboard",
      reaction: null,
      senderType: "sales",
    },
    klm345nop678: {
      id: 5,
      userAvatar: null,
      username: "Sales Team",
      notiType: "like",
      time: serverTimestamp(),
      text: "New sale! Congratulations!",
      productImage: null,
      productName: "Wireless Sport Earbuds",
      reaction: null,
      senderType: "sales",
    },
    pqrs678tuv901: {
      id: 6,
      userAvatar: null,
      username: "Eva Rodriguez",
      notiType: "comment",
      time: serverTimestamp(),
      text: "Great job on the design! Can't wait to see more.",
      productImage: null,
      productName: "Cotton Comfort Bed Sheets",
      reaction: null,
      senderType: "clients",
    },
    wxy234zab567: {
      id: 7,
      userAvatar: null,
      username: "Product Team",
      notiType: "comment",
      time: serverTimestamp(),
      text: "New features added to the latest version. Check them out!",
      productImage: null,
      productName: "Smart Fitness Tracker",
      reaction: null,
      senderType: "withdrawals",
    },
    cde890f6576h: {
      id: 8,
      userAvatar: null,
      username: "Sophie White",
      notiType: "like",
      time: serverTimestamp(),
      text: "Your photography skills are amazing! Liked all your recent photos.",
      productImage: null,
      productName: "Premium Leather Wallet",
      reaction: null,
      senderType: "clients",
    },
    yid76fiubhby: {
      id: 9,
      userAvatar: null,
      username: "Administrator",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Reminder: Monthly team meeting tomorrow at 10 AM.",
      productImage: null,
      productName: "Home Security Camera System",
      reaction: null,
      senderType: "withdrawals",
    },
    lop123qrs456: {
      id: 10,
      userAvatar: null,
      username: "David Brown",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Just bought your latest ebook. Looking forward to reading it!",
      productImage: null,
      productName: "Outdoor Adventure Backpack",
      reaction: null,
      senderType: "clients",
    },
    mno789pqr012: {
      id: 11,
      userAvatar: null,
      username: "Sales Team",
      notiType: "like",
      time: serverTimestamp(),
      text: "Another successful sale! Keep up the good work.",
      productImage: null,
      productName: "Professional Espresso Machine",
      reaction: null,
      senderType: "sales",
    },
    stu345vwx678: {
      id: 12,
      userAvatar: null,
      username: "Emma Taylor",
      notiType: "comment",
      time: serverTimestamp(),
      text: "The colors in your artwork are so vibrant! How do you achieve that?",
      productImage: null,
      productName: "Wireless Noise-Canceling Headphones",
      reaction: null,
      senderType: "clients",
    },
    yza012bcd345: {
      id: 13,
      userAvatar: null,
      username: "Administrator",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "System update scheduled for next week. Please be prepared.",
      productImage: null,
      productName: "Smart Home Thermostat",
      reaction: null,
      senderType: "administrator",
    },
    efg678hij901: {
      id: 14,
      userAvatar: null,
      username: "John Miller",
      notiType: "like",
      time: serverTimestamp(),
      text: "Your coding tutorials are so helpful! Liked and subscribed.",
      productImage: null,
      productName: "Classic Leather Messenger Bag",
      reaction: null,
      senderType: "products",
    },
    klm123nop456: {
      id: 15,
      userAvatar: null,
      username: "Product Team",
      notiType: "comment",
      time: serverTimestamp(),
      text: "Bug fixes and performance improvements in the latest release.",
      productImage: null,
      productName: "Fitness Resistance Band Set",
      reaction: null,
      senderType: "withdrawals",
    },
    qrs789tuv012: {
      id: 16,
      userAvatar: null,
      username: "Sophia Davis",
      notiType: "comment",
      time: serverTimestamp(),
      text: "Your fashion designs are stunning! Where do you get your inspiration?",
      productImage: null,
      productName: "Ultra HD Curved Gaming Monitor",
      reaction: null,
      senderType: "sales",
    },
    wxy234za5ru6: {
      id: 17,
      userAvatar: null,
      username: "Sales Team",
      notiType: "like",
      time: serverTimestamp(),
      text: "Record-breaking sales this month! Congratulations to everyone!",
      productImage: null,
      productName: "Retro Vinyl Record Player",
      reaction: null,
      senderType: "sales",
    },
    cde890fgh123: {
      id: 18,
      userAvatar: null,
      username: "Ryan Clark",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Just ordered your handmade crafts. Excited to receive them!",
      productImage: null,
      productName: "Compact Portable Bluetooth Speaker",
      reaction: null,
      senderType: "withdrawals",
    },
    ijk456lmn789: {
      id: 19,
      userAvatar: null,
      username: "Administrator",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Reminder: Team-building event this Friday. Don't forget to RSVP.",
      productImage: null,
      productName: "",
      reaction: null,
      senderType: "administrator",
    },
    lop123ars426: {
      id: 20,
      userAvatar: null,
      username: "Grace Turner",
      notiType: "like",
      time: serverTimestamp(),
      text: "Your blog posts are inspiring! Liked and shared.",
      productImage: null,
      productName: "Smartphone Camera Lens Kit",
      reaction: null,
      senderType: "products",
    },
    mnv567opq890: {
      id: 21,
      userAvatar: null,
      username: "Daniel Lee",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Just ordered a customized product. Can't wait to see it!",
      productImage: null,
      productName: "Stainless Steel Kitchen Knife Set",
      reaction: null,
      senderType: "clients",
    },
    abc345xyz678: {
      id: 22,
      userAvatar: null,
      username: "Product Team",
      notiType: "comment",
      time: serverTimestamp(),
      text: "Exciting new features added to our app. Update now!",
      productImage: null,
      productName: "Hiking and Camping Backpack",
      reaction: null,
      senderType: "products",
    },
    jkl901uvw234: {
      id: 23,
      userAvatar: null,
      username: "Olivia Smith",
      notiType: "like",
      time: serverTimestamp(),
      text: "Your music compositions are fantastic! Liked and shared.",
      productImage: null,
      productName: "Cozy Knit Blanket",
      reaction: null,
      senderType: "clients",
    },
    rst567uvm890: {
      id: 24,
      userAvatar: null,
      username: "Administrator",
      notiType: "purchase",
      time: serverTimestamp(),
      text: "Emergency server maintenance tonight at 11 PM. Please be informed.",
      productImage: null,
      productName: "Portable Laptop Stand",
      reaction: null,
      senderType: "administrator",
    },
    pqr123stu456: {
      id: 25,
      userAvatar: null,
      username: "Sophie Johnson",
      notiType: "comment",
      time: serverTimestamp(),
      text: "Your cooking recipes are amazing! Can't wait to try them out.",
      productImage: null,
      productName: "SuperSpeed Blender",
      reaction: null,
      senderType: "withdrawals",
    },
    vwx789yza012: {
      id: 26,
      userAvatar: null,
      username: "Sales Team",
      notiType: "like",
      time: serverTimestamp(),
      text: "Monthly sales report is now available. Review and plan for next month.",
      productImage: null,
      productName: "UltraZoom 2000",
      reaction: null,
      senderType: "sales",
    },
    fgh234ijk567: {
      id: 27,
      userAvatar: null,
      username: "Michael Brown",
      notiType: "like",
      time: serverTimestamp(),
      text: "Your coding tutorials are helping me a lot! Liked and subscribed.",
      productImage: null,
      productName: "Smart Fitness Watch",
      reaction: null,
      senderType: "products",
    },
    lmn890opq123: {
      id: 28,
      userAvatar: null,
      username: "Product Team",
      notiType: "comment",
      time: serverTimestamp(),
      text: "Improved user interface and bug fixes in the latest release.",
      productImage: null,
      productName: "Wireless Noise-Canceling Headphones",
      reaction: null,
      senderType: "withdrawals",
    },
    uvw456xyz789: {
      id: 29,
      userAvatar: null,
      username: "Emily Davis",
      notiType: "comment",
      time: serverTimestamp(),
      text: "Your travel photos are breathtaking! Where was this taken?",
      productImage: null,
      productName: "Portable Power Bank",
      reaction: null,
      senderType: "clients",
    }
  };

  return (
    <main className={styles.main} style={MAIN_STYLE}>

      <AnimatePresence>
        {screenWidth <= 480 && <HeaderMobile />} {/* position fixed'di */}
      </AnimatePresence>

      {screenWidth > 480 ? <Navbar /> : <NavbarMobile />} {/* position fixed ve ya stickydi */}
      <motion.div className={styles.container} initial={{ transform: "scale(1.1)" }} animate={{ transform: "scale(1)" }} exit={{ transform: "scale(1.2)" }} style={CONTAINER_STYLE}> {/*///todo BUNU DEYISMEK LAZIMDI */}

        {screenWidth > 480 ? <Header screenWidthRestriction={true} text={"notifications"} /> : <HeaderMobileSub text={"notifications"} />} {/* position static ve ya fixeddi */}

        <NotificationSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <FilterSection selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />

        <NotificationList data={data} setData={setData} />

      </motion.div>
    </main>
  )
}
