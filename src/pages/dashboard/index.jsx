import { useEffect, useState } from "react";
import { MapComponent } from "../../components/Leaflet";
import CardLista from "../../components/CardLista";
import styles from "./index.module.css";
import { GetLocations } from "../../services/Locais";

function DashBoard() {
  const [locais, setLocais] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocais = async () => {
      try {
        const response = await GetLocations();
        setLocais(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Erro ao buscar locais:", error);
        setLoading(false);
      }
    };

    fetchLocais();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <MapComponent />
        <div className={styles.dashboardContainer}>
          <span>Número de locais: {locais.length}</span>
          <span>Número de usuarios: {locais.length}</span>
          <span>Seus locais: {locais.length}</span>
        </div>
      </div>

      {loading ? (
        <p>Carregando locais</p>
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
