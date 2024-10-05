import styles from "./index.module.css";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import { TileLayer, Marker, MapContainer, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useContext } from "react";
import { LocaisContext } from "../../context/LocaisContext";

export const MapComponent = () => {
  const { locais } = useContext(LocaisContext);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });

  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="${
        styles.clusterIcon
      }">${cluster.getChildCount()}</span>`,
      className: styles.customMarkerCluster,
      iconSize: point(33, 33, true),
    });
  };

  return (
    <MapContainer
      center={[-23.55052, -46.6333]}
      zoom={13}
      className={styles.mapContainer}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {locais.map((local, index) => (
          <Marker
            position={[Number(local.latitude), Number(local.longitude)]}
            key={index}
            icon={customIcon}
          >
            <Popup>
              <div className={styles.popupContainer}>
                <h2 className={styles.popupTitle}>{local.nomeLocal}</h2>
                <span className={styles.popupSpan}>{local.endereco}</span>
                <div className={styles.popupGrid}>
                  {local.praticasEsportivas?.map((sport, index) => (
                    <span className={styles.popupSportType} key={index}>
                      {sport}
                    </span>
                  ))}
                </div>
                <span className={styles.popupSpan}>{local.descricaoLocal}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
