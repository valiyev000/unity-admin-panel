import styles from './styles/SliderMobile.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/autoplay';
import { useContext } from 'react';
import contextApi from '../../StateManager';
import SettingImg from '../../images/slideImgForSetting.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function SliderMobile({ slides }) {

    const { translation, theme, lang, setIsSettingOpen } = useContext(contextApi)


    return (
        <Swiper
            style={{
                "--swiper-pagination-color": "#A0D7E7",
                "--swiper-pagination-bullet-inactive-color": "#FFF",
                "--swiper-pagination-bullet-size": "6px",
                "--swiper-pagination-bullet-horizontal-gap": "6px",
            }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 5000 }}
            loop
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            onSlideChange={() => console.log("slide change")}
            className={styles.slider}
        >
            <SwiperSlide id='0' className={styles.slide} style={{ background: "#6C5DD3" }}>
                <motion.img layout src={SettingImg} alt="slideImg.png" />
                <motion.div layout className={styles.title}>{translation.set_a_google}</motion.div>
                <motion.div layout className={styles.context}>{translation.did_you_know}</motion.div>
                <motion.button layout className={styles.btn} onClick={() => setIsSettingOpen(true)} style={{ background: theme === "dark" ? '#242731' : "#fff", color: theme === "dark" ? '#fff' : "#11142D" }}>{translation.go_setting}</motion.button>
            </SwiperSlide>
            {slides.length && slides.map(slide => (
                <SwiperSlide key={slide.id} id={slide.id} className={styles.slide} style={{ background: slide.background }}>
                    <motion.img layout src={slide.img_src} alt="slideImg.png" />
                    <motion.div layout className={styles.title}>{slide[`title_${lang}`]}</motion.div>
                    <motion.div layout className={styles.context}>{slide[`context_${lang}`]}</motion.div>
                    <Link to={slide.target_link} className={styles.btn} style={{ background: theme === "dark" ? '#242731' : "#fff", color: theme === "dark" ? '#fff' : "#11142D" }}>{slide[`button_text_${lang}`]}</Link>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}


