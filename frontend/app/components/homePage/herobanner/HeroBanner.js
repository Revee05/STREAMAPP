import Image from 'next/image';
import styles from './HeroBanner.module.css';

const HeroBanner = () => {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroBannerImageWrapper}>
        <Image
          src="https://4kwallpapers.com/images/walls/thumbs_3t/11587.jpg"
          alt="Stranger Things promotional banner"
          fill
          priority
          className={styles.heroBannerImage}
        />
        <div className={styles.heroBannerGradient}></div>
      </div>

      <div className={styles.heroBannerContent}>
        <div className={styles.heroBannerTextWrapper}>
          <h1 className={styles.heroBannerTitle}>Blue Beetle</h1>
          <p className={styles.heroBannerDescription}>
            When a young boy vanishes, a small town uncovers a mystery involving secret experiments,
            terrifying supernatural forces, and one strange little girl.
          </p>
          <div className={styles.heroBannerButtons}>
            <button className={`${styles.heroBannerButton} ${styles.heroBannerPlayButton}`}>
              <svg className={styles.heroBannerIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 5v10l7-5-7-5z" />
              </svg>
              Play
            </button>
            <button className={`${styles.heroBannerButton} ${styles.heroBannerMyListButton}`}>
              <svg className={styles.heroBannerIcon} viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 5h12v2H4zM4 11h12v2H4zM4 17h12v2H4z" />
              </svg>
              My List
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
