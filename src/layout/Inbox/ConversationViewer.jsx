import { memo } from 'react'
import styles from './styles/ConversationViewer.module.scss'
import { Link, useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { motion } from 'framer-motion'
import { useContext } from 'react';
import contextApi from '../../StateManager';


function ConversationViewer() {

    const history = useHistory();
    const {screenWidth} = useContext(contextApi)

    return (
        <motion.div
            className={styles.viewerMain}
            initial={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                maxHeight: screenWidth > 480 ? "80vh" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
                overflow: screenWidth > 480 ? "auto" : "visible"
            }}
            animate={{
                marginTop: screenWidth > 480 ? "70px" : "0px",
                maxHeight: screenWidth > 480 ? "80vh" : "unset",
                position: screenWidth > 480 ? "sticky" : "static",
                overflow: screenWidth > 480 ? "auto" : "visible"
            }}
        >
            <div onClick={() => history.push('/inbox')}>Hello world</div>
            <div onClick={()=>window.scrollTo(0, 0)}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores quasi eum eveniet ipsum necessitatibus illum iste alias quos, a veniam error dolorem nesciunt quis optio sequi quas? Architecto, aliquam! Facere.
            Fuga repudiandae necessitatibus praesentium laborum quae iure et perferendis, mollitia, dolorem dignissimos velit, tempore voluptatem molestias quo recusandae quisquam eum nulla totam. Tenetur explicabo, sed eligendi ea aspernatur iusto eius.
            Similique quae ratione adipisci magni veniam iusto. Obcaecati et ratione quas voluptatibus consectetur fugiat magni minima, repudiandae excepturi eligendi! Molestias labore eius voluptas architecto deleniti officiis eaque? Eius, facilis quisquam?
            Impedit, minus voluptas nobis voluptatibus et rem veniam eveniet non vel labore molestiae tempore ut nemo, quia repellat! Nisi, amet? Laborum necessitatibus natus ducimus ab itaque exercitationem quia alias error?
            Sed debitis aut numquam sit quo, voluptatibus culpa laborum porro officiis tempora perspiciatis officia nostrum maiores beatae, dolorum inventore repellat error. Officia totam modi aperiam a sint reiciendis praesentium eius?
            Sapiente aut quos quia porro maxime iure sint dicta a natus laboriosam animi, quasi commodi ea dolorum, quaerat nostrum tempora. Dolores laudantium blanditiis, in magni soluta excepturi placeat! Ipsam, tempore.
            Placeat odio earum cupiditate cumque minus vel esse. Quam eum repellat aliquid repudiandae tempore consectetur harum inventore est culpa, autem et doloribus tempora quis distinctio rem perspiciatis! Sequi, reprehenderit soluta.
            Tempore id veniam voluptatem repellat suscipit delectus in eos porro debitis pariatur reiciendis nobis, minima, error labore eaque laboriosam ea eius adipisci molestias illo ipsum similique? Beatae ducimus nemo similique?
            Voluptas itaque, eum corporis in impedit eius! Rem quaerat accusamus cupiditate. Vero nostrum voluptate facere quis adipisci placeat nesciunt enim atque culpa, reprehenderit a deserunt in totam reiciendis minima. Culpa.
            Vel assumenda repellendus explicabo quo cumque earum excepturi id veritatis consequatur provident dolores nulla quod blanditiis tenetur, laboriosam ducimus, aliquid eaque voluptas eligendi illo aperiam similique nisi sed sapiente! Accusantium!
            Dolore error unde dolorum deserunt nam quae id qui beatae ab ullam dolorem praesentium placeat, tempore in, culpa quas neque nesciunt vel. Culpa voluptatem in dolorem animi cumque pariatur facere!
            Nobis maiores aperiam, minima obcaecati labore voluptate eligendi neque, minus reiciendis voluptatem voluptas voluptatibus rem. Aspernatur neque, qui culpa a molestiae quis dolore velit quam quo! Placeat qui earum quas.
            Reiciendis, doloribus cupiditate. Distinctio, dolore id iure similique ut, quaerat doloremque ullam sed accusamus quidem totam, odit voluptates fuga accusantium nesciunt ex ea. Eaque voluptatem dolor sint, assumenda aut eum.
            Et quidem eligendi modi ullam voluptate voluptates doloremque! Doloremque expedita rerum reprehenderit quasi debitis tempore aliquam, esse libero dolor quibusdam nostrum quod distinctio, minima ad! Autem ratione voluptates incidunt cumque.
            Porro minima maxime quasi velit sed magnam aspernatur, magni quia recusandae incidunt saepe, nulla eligendi ratione culpa ipsam iusto dolorum! Sit ratione dignissimos iure possimus nulla reprehenderit, necessitatibus repellat consequuntur.
            Saepe nobis eos doloribus cupiditate temporibus, dolorum dignissimos quia aliquam quae maxime expedita beatae odio autem quasi exercitationem reiciendis consequatur quos inventore. Illum, voluptatum dignissimos repellendus quisquam velit qui facere.
            Deleniti maxime ipsam incidunt nesciunt optio, consequatur fugiat debitis laudantium earum iusto voluptates dolore labore autem architecto esse dolor quo nobis omnis voluptate numquam placeat aliquid. Assumenda iure neque nulla?
            Reiciendis a delectus voluptatum sapiente odit cum error accusamus aspernatur debitis inventore perferendis cumque, facilis quidem modi soluta nulla maiores? Cumque eveniet velit deleniti et fugit ad at, vero tempora.
            At id itaque, voluptatibus consequuntur quos alias nisi consequatur earum consectetur architecto quidem temporibus qui maxime ab beatae doloribus est fugit voluptatem vitae nihil. Illum commodi provident dolorum incidunt natus.
            Quisquam eos earum laborum numquam eum ut hic reiciendis autem? Nulla ipsum a iste expedita suscipit voluptate necessitatibus totam dicta, porro illum explicabo hic? Sunt molestias totam eum cum eos!</div>
        </motion.div>
    )
}

export default memo(ConversationViewer)