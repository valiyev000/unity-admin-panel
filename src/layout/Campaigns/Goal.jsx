import { memo, useState, useContext, useRef } from "react"
import styles from './styles/Goal.module.scss'
import contextApi from "../../StateManager"
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import { Autoplay, EffectFlip } from 'swiper';
import 'swiper/scss/autoplay';
import 'swiper/css/effect-flip';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import LinearRange from '../../components/LinearRange'
import CountUp from 'react-countup';


function Goal({ data }) {

    const { theme, screenWidth, translation, lang } = useContext(contextApi)
    const [stateId, setStateId] = useState(0)

    const sliderRef = useRef(null)

    function handlePrev() {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slidePrev();
    }

    function handleNext() {
        if (!sliderRef.current) return;
        sliderRef.current.swiper.slideNext();
    }

    return (
        <motion.div
            className={styles.main}
            layoutId='goal'
            initial={{
                transform: "scale(1.2)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "100px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 && screenWidth < 1200 ? "48%" : "100%"
            }}
            animate={{
                transform: "scale(1.0)",
                boxShadow: theme === "light" ? "0px 20px 40px 0px rgba(230,215,255,0.95)" : "0px 20px 40px 0px rgba(5,5,5,0.65)",
                marginTop: screenWidth >= 1200 ? "100px" : "20px",
                background: theme === "dark" ? "#1F2128" : "#fff",
                width: screenWidth > 480 && screenWidth < 1200 ? "48%" : "100%"
            }}
        >
            <motion.div layout className={styles.title}>2024 {translation.goal}</motion.div>
            <Swiper
                className={styles.slider}
                ref={sliderRef}
                modules={[Autoplay, EffectFlip]}
                autoplay={{ delay: 5000 }}
                slidesPerView={1}
                effect={'flip'}
                onSlideChange={(swiper) => setStateId(swiper.activeIndex)}
            >
                {data !== null && data.map(product => (
                    <SwiperSlide id={product.id} className={styles.slide} key={product.id}>
                        <div className={styles.imgWrap}>
                            <img className={styles.img} src={product.img} alt="slideImg.png" />
                        </div>
                    </SwiperSlide>
                ))}
                <div className={styles.prevBtn} style={{ boxShadow: theme === "light" ? "0px 2px 6px 2px rgba(230,215,255,0.95)" : "0px 2px 6px 2px rgba(5,5,5,0.65)", background: theme === "dark" ? "#242731" : "#fff" }} onClick={handlePrev}><GoArrowLeft /></div>
                <div className={styles.nextBtn} style={{ boxShadow: theme === "light" ? "0px 2px 6px 2px rgba(230,215,255,0.95)" : "0px 2px 6px 2px rgba(5,5,5,0.65)", background: theme === "dark" ? "#242731" : "#fff" }} onClick={handleNext}><GoArrowRight /></div>
            </Swiper>
            <motion.div layout className={styles.statistics}>
                <div className={styles.indicator}>
                    <div className={styles.top}>
                        <motion.p layout>{data[stateId].indicators[0][`name_${lang}`]}</motion.p>
                        <div className={styles.value}><CountUp end={data[stateId].indicators[0].value / data[stateId].indicators[0].target * 100} />%</div>
                    </div>
                    <LinearRange
                        width={"100%"}
                        height={8}
                        progressLineColor={"#6C5DD3"}
                        value={data[stateId].indicators[0].value}
                        target={data[stateId].indicators[0].target}
                        delay={0.1}
                    />
                </div>
                <div className={styles.indicator}>
                    <div className={styles.top}>
                        <motion.p layout>{data[stateId].indicators[1][`name_${lang}`]}</motion.p>
                        <div className={styles.value}><CountUp end={data[stateId].indicators[1].value / data[stateId].indicators[1].target * 100} />%</div>
                    </div>
                    <LinearRange
                        width={"100%"}
                        height={8}
                        progressLineColor={"#7FBA7A"}
                        value={data[stateId].indicators[1].value}
                        target={data[stateId].indicators[1].target}
                        delay={0.15}
                    />
                </div>
                <div className={styles.indicator}>
                    <div className={styles.top}>
                        <motion.p layout>{data[stateId].indicators[2][`name_${lang}`]}</motion.p>
                        <div className={styles.value}><CountUp end={data[stateId].indicators[2].value / data[stateId].indicators[2].target * 100} />%</div>
                    </div>
                    <LinearRange
                        width={"100%"}
                        height={8}
                        progressLineColor={"#FFCE73"}
                        value={data[stateId].indicators[2].value}
                        target={data[stateId].indicators[2].target}
                        delay={0.2}
                    />
                </div>
                <div className={styles.indicator}>
                    <div className={styles.top}>
                        <motion.p layout>{data[stateId].indicators[3][`name_${lang}`]}</motion.p>
                        <div className={styles.value}><CountUp end={data[stateId].indicators[3].value / data[stateId].indicators[3].target * 100} />%</div>
                    </div>
                    <LinearRange
                        width={"100%"}
                        height={8}
                        progressLineColor={"#FFA2C0"}
                        value={data[stateId].indicators[3].value}
                        target={data[stateId].indicators[3].target}
                        delay={0.25}
                    />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default memo(Goal)