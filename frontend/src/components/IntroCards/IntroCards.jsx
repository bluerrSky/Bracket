import styles from "./IntroCards.module.css"
import CardOneImg from "../../assets/images/vintageComp1.png"
import CardOneImg2 from "../../assets/images/vintageComp2.png"
import CardWizardImg from "../../assets/images/CardWizardImg.png"
import CardSwordImg from "../../assets/images/CardSwordImg.png"
function Card({ classId, cardTitle, cardBody, cardImg, cardBackground,imgHeight,  imgWidth}) {
    return (
        <div 
            className={`${styles['card-' + classId]} ${styles.cardContainer}`} 
            style={{ backgroundColor: cardBackground }}
        >
            <div className={styles.cardTitle}>
                {cardTitle}
            </div>
            <div className={styles.cardBody}>
                {cardBody}
            </div>
            <div className={styles.cardImg}>
                <img src={cardImg} alt="" style={{
                    width: `${imgWidth}px`,
                    height: `${imgHeight}px`
                }}/>
            </div>
        </div>
    );
}



export default function IntroCards(){
    return (
        <>
        <div className={styles.introCards}>
            <Card cardId={2} cardTitle={"Track your Progress"}
             cardBody={"Get rated after every contest using an ELO-based system. Watch your rating grow and climb the leaderboard."}
             cardImg={CardWizardImg} cardBackground={`rgb(241	125	91)`} imgHeight={250} imgWidth={300}/>
             
            <Card cardId={1} cardTitle={"Practice Problems"}
             cardBody={"Sharpen your skills with a curated collection of problems. Filter by topic and difficulty to focus on what matters most."}
             cardImg={CardOneImg} cardBackground={`rgb(78	142	81)`} imgWidth={250} imgHeight={250}/>



            <Card cardId={3} cardTitle={"Live Contests"}
             cardBody={"Compete in daily and weekly timed contests exclusive to our community. Experience a real-time leaderboard and challenge your peers."}
             cardImg={CardSwordImg} imgHeight={180} imgWidth={200}/>

        </div>
        </>
    )
}