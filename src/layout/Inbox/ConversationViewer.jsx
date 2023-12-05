import { memo } from 'react'
import styles from './styles/ConversationViewer.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { motion } from 'framer-motion'
import { useContext } from 'react';
import contextApi from '../../StateManager';


function ConversationViewer() {

    const history = useHistory();
    const { screenWidth } = useContext(contextApi)

    return (
        <motion.div
            className={styles.viewerMain}
            initial={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                height: screenWidth > 480 ? "80vh" : "unset",
                maxHeight: screenWidth > 480 ? "500px" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
            }}
            animate={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                height: screenWidth > 480 ? "80vh" : "unset",
                maxHeight: screenWidth > 480 ? "500px" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
            }}
        >
            <div onClick={() => history.push('/inbox')}>Hello world</div>
            <div>InnerText</div>
        </motion.div>
    )
}

export default memo(ConversationViewer)