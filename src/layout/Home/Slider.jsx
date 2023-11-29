import { useState , useEffect , useContext } from 'react'
import styles from './styles/Slider.module.scss'
import SettingImg from '../../images/slideImgForSetting.png'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from 'framer-motion'
import contextApi from '../../StateManager';
import {Link} from 'react-router-dom'


export default function Slider({slides}) {

  const { translation, theme, lang, setIsSettingOpen } = useContext(contextApi)

  const [slideNum, setSlideNum] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideNum(prev => prev + 1);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <motion.div
    layout
    className={styles.slider}
    initial={{ transform: "scale(1.2)" }}
    animate={{ transform: "scale(1.0)" }}
    exit={{ transform: "scale(1.2)" }}
    >
      <div className={styles.upperLayer}>
        <div className={styles.backBtn} onClick={() => setSlideNum(prev => prev > 0 ? prev - 1 : prev + slides.length)}><AiOutlineLeft /></div>
        <div className={styles.nextBtn} onClick={() => setSlideNum(prev => prev + 1)}><AiOutlineRight /></div>
        <div className={styles.pagination}>
          <div className={styles.dot} onClick={() => setSlideNum(0)} style={{ outline: slideNum % (slides.length + 1) === 0 ? "2px solid #A0D7E7" : "2px solid transparent" }}></div>
          {slides.length && slides.map((slide) => (
            <div key={slide.id} className={styles.dot} onClick={() => setSlideNum(slide.id)} style={{ outline: slideNum % (slides.length + 1) === slide.id ? "2px solid #A0D7E7" : "2px solid transparent" }}></div>
          ))}
        </div>
      </div>
      <div //! BIRINCI SLIDE
        className={styles.slide} 
        style={{
          background: "#6C5DD3",
          zIndex: slideNum % (slides.length + 1) === 0 ? "10" : "1",
          transform: slideNum % (slides.length + 1) === 0 ? "scale(1) translateY(0px)" : slideNum % (slides.length + 1) === 1 ? "scale(0.97) translateY(15px)" : slideNum % (slides.length + 1) === -1 ? "scale(0.97) translateY(-15px)" : "scale(0.8)",
        }}
      >
        <div className={styles.slideLeft}>
          <motion.div layout className={styles.title}>{translation.set_a_google}</motion.div>
          <motion.div layout className={styles.context}>{translation.did_you_know}</motion.div>
          <motion.button layout className={styles.btn} onClick={() => setIsSettingOpen(true)} style={{ background: theme === "dark" ? '#242731' : "#fff", color: theme === "dark" ? '#fff' : "#11142D" }}>{translation.go_setting}</motion.button>
        </div>
        <div className={styles.slideRight}>
          <img src={SettingImg} alt="slideImg.png" />
        </div>
      </div>
      {slides.length && slides.map(slide => (//! DIGER SLIDE'LAR
        <div
          className={styles.slide} 
          key={slide.id}
          style={{
            background: slide.background,
            zIndex: slideNum % (slides.length + 1) === slide.id ? "10" : "1",
            transform: slideNum % (slides.length + 1) === slide.id ? "scale(1) translateY(0px)" : slideNum % (slides.length + 1) === (slide.id + 1) ? "scale(0.97) translateY(15px)" : slideNum % (slides.length + 1) === (slide.id - 1) ? "scale(0.97) translateY(-15px)" : "scale(0.8)",
          }}
        >
          <div className={styles.slideLeft}>
            <motion.div layout className={styles.title}>{slide[`title_${lang}`]}</motion.div>
            <motion.div layout className={styles.context}>{slide[`context_${lang}`]}</motion.div>
            <Link to={slide.target_link} className={styles.btn} style={{ background: theme === "dark" ? '#242731' : "#fff", color: theme === "dark" ? '#fff' : "#11142D" }}>{slide[`button_text_${lang}`]}</Link>
          </div>
          <div className={styles.slideRight}>
            <img src={slide.img_src} alt="slideImg.png" />
          </div>
        </div>
      ))}
    </motion.div>
  )
}