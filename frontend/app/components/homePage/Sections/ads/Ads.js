import SectionWrapper from "@/app/components/homePage/Section/SectionWrapper";
import styles from './Ads.module.css';
import CardListHorizontal from "@/app/components/CardListHorizontal";

export default function AnimasiSection() {
  return (
    <SectionWrapper title="Ads">
      {/* <div className={styles.animationContainer}>
        <div className={styles.bouncingBall}></div>
        <p>Konten animasi dapat ditampilkan di sini.</p>
      </div> */}
      <CardListHorizontal/>
    </SectionWrapper>
  );
}
