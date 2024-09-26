import { MapComponent } from "../../components/Leaflet";
import styles from "./index.module.css";

function DashBoard() {
  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <MapComponent />
        <div className={styles.dashboardContainer}>
          <span>Numero de locais</span>
          <span>Numero de usuarios</span>
          <span>Seus locais cadastrados </span>
        </div>
      </div>
      <div className={styles.cardsContainer}>
        <div>Card 1</div>
        <div>Card 2</div>
        <div>Card 3</div>
        <div>Card 4</div>
        <div>Card 5</div>
        <div>Card 6</div>
        <div>Card 7</div>
        <div>Card 8</div>
        <div>Card 9</div>
      </div>
    </div>
  );
}

export default DashBoard;
