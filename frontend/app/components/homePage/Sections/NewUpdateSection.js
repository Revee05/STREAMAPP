import SectionWrapper from "../Section/SectionWrapper";
import ViewAllButton from "../../Buttons/ViewButtons";
import CarouselButton from "../../../components/Buttons/CarouselButton";
import CardListHorizontal from "../../CardListHorizontal";
import styles from "./NewUpdateSection.module.css";
export default function NewUpdateSection() {
  // Data Dummy
  const items = [
    {
      id: "1",
      title: "The Avengers",
      year: 2012,
      duration: "143 min",
      rating: "8.0/10",
      poster: "https://example.com/avengers.jpg",
    },
    {
      id: "2",
      title: "Inception",
      year: 2010,
      duration: "148 min",
      rating: "8.8/10",
      poster: "https://example.com/inception.jpg",
    },
    {
      id: "3",
      title: "The Dark Knight",
      year: 2008,
      duration: "152 min",
      rating: "9.0/10",
      poster: "https://example.com/dark_knight.jpg",
    },
    {
      id: "4",
      title: "Interstellar",
      year: 2014,
      duration: "169 min",
      rating: "8.6/10",
      poster: "https://example.com/interstellar.jpg",
    },
    {
      id: "5",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
    {
      id: "6",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
    {
      id: "7",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
    {
      id: "8",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
    {
      id: "9",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
    {
      id: "10",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
    {
      id: "11",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
    {
      id: "12",
      title: "Parasite",
      year: 2019,
      duration: "132 min",
      rating: "8.6/10",
      poster: "https://example.com/parasite.jpg",
    },
  ];
  return (
    <SectionWrapper
      title="New Updates"
      actions={
        <>
          {/* ini yang buat ngatur posisi si tombol tombol*/}
          <div className={styles.actionsWrapper}>  
            {/* <ViewAllButton className={styles.buttonSmall} /> */}
            {/* <CarouselButton direction="prev" className={styles.buttonSmall} />
            <CarouselButton direction="next" className={styles.buttonSmall} /> */}
          </div>
        </>
      }
    >
      <div className={styles.contentWrapper}>
        {/* ini bisa ditambah untuk fitur upload si admin di sini pakai div*/}
        {/* New Update Content */}
        <CardListHorizontal items={items} />
      </div>
    </SectionWrapper>
  );
}
