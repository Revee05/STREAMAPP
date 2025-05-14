import SectionWrapper from "../Section/SectionWrapper";
import styles from './AnimasiSection.module.css';
import CardListHorizontal from "../../CardListHorizontal";

export default function AnimasiSection() {
  return (
    <SectionWrapper title="Animation">
      {/* <div className={styles.animationContainer}>
        <div className={styles.bouncingBall}></div>
        <p>Konten animasi dapat ditampilkan di sini.</p>
      </div> */}
      <CardListHorizontal/>
    </SectionWrapper>
  );
}
