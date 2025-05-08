import SectionHeader from "../Section/SectionHeader";
import styles from './SectionWrapper.module.css';

export default function SectionWrapper({ title, children, actions }) {
  return (
    <section className={styles.sectionWrapper}>
      <SectionHeader title={title}>
        {actions}
      </SectionHeader>
      <div className={styles.sectionWrapperChildren}>{children}</div> {/* This is where the content will be rendered */}
    </section>
  );
}
