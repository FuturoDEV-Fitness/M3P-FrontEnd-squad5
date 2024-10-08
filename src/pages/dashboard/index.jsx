import { useContext } from "react";
import { MapComponent } from "../../components/Leaflet";
import CardLista from "../../components/CardLista";
import styles from "./index.module.css";
import GroupIcon from "@mui/icons-material/Group";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";

import { LocaisContext } from "../../context/LocaisContext";
import { DashboardContext } from "../../context/DashboardContext";
import { AuthContext } from "../../context/AuthContext";

function DashBoard() {
  const { locais } = useContext(LocaisContext);
  const { isLogged } = useContext(AuthContext);
  const { dashboardData, loading } = useContext(DashboardContext);
  const loadingLocais = locais.length === 0;

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <MapComponent locais={locais} />
        <div className={styles.dashboardContainer}>
          {loading ? (
            <p className={styles.loadingText}>
              Carregando dados do dashboard...
            </p>
          ) : (
            <>
              <span className={styles.dashboardItem}>
                <LocationOnIcon /> Número de locais: {dashboardData.locais}
              </span>
              <span className={styles.dashboardItem}>
                <GroupIcon /> Número de usuários: {dashboardData.usuarios}
              </span>
              {isLogged && (
                <span className={styles.dashboardItem}>
                  <PersonPinCircleIcon /> Seus locais:
                  {dashboardData.locaisUsuario}
                </span>
              )}
            </>
          )}
        </div>
      </div>

      {loadingLocais ? (
        <p className={styles.loadingText}>Carregando locais...</p>
      ) : (
        <div className={styles.cardsContainer}>
          {locais.map((local, index) => (
            <CardLista key={index} listalocais={local} />
          ))}
        </div>
      )}
    </div>
  );
}

export default DashBoard;
