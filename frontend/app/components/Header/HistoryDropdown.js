import DropDownCard from "./DropDownCard";
import styles from "./styles.module.css";

export default function HistoryDropdown({ historyList }) {
  return (
    <ul className={`${styles.dropdown} ${styles.dropdownHistory}`}>
      {historyList.slice(0, 10).map((item, idx) => (
        <li key={idx}>
          <DropDownCard
            posterUrl={`https://via.placeholder.com/100x150?text=${encodeURIComponent(
              item
            )}`}
            title={item}
            description={`This is a description for ${item}`}
          />
        </li>
      ))}
    </ul>
  );
}