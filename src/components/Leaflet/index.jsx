import styles from "./index.module.css";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import { TileLayer, Marker, MapContainer, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { useEffect } from "react";
import { GetLocations } from "../../services/Locais";

const locaisPreenchidos = [
  {
    name: "Local 1",
    location: "Rua Exemplo, 123",
    coordinates: { latitude: "-23.55052", longitude: "-46.6333" },
    sports_types: [
      { name: "Futebol", hasOption: true },
      { name: "Basquete", hasOption: false },
    ],
    description: "Local para atividades esportivas ao ar livre",
  },
  {
    name: "Local 2",
    location: "Avenida Teste, 456",
    coordinates: { latitude: "-23.5511", longitude: "-46.6344" },
    sports_types: [
      { name: "Tênis", hasOption: true },
      { name: "Vôlei", hasOption: true },
    ],
    description: "Quadra de tênis e vôlei",
  },
];

export const MapComponent = () => {
  useEffect(() => {
    const testLocais = async () => {
      const data = GetLocations();
      console.log(data);
    };
    testLocais();
  }, []);

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
        {locaisPreenchidos.map((local, index) => (
          <Marker
            position={[
              Number(local.coordinates.latitude),
              Number(local.coordinates.longitude),
            ]}
            key={index}
            icon={customIcon}
          >
            <Popup>
              <div className={styles.popupContainer}>
                <h2 className={styles.popupTitle}>{local.name}</h2>
                <span className={styles.popupSpan}>{local.location}</span>
                <div className={styles.popupGrid}>
                  {local.sports_types
                    .filter((sport) => sport.hasOption)
                    .map((sport, index) => (
                      <span className={styles.popupSportType} key={index}>
                        {sport.name}
                      </span>
                    ))}
                </div>
                <span className={styles.popupSpan}>{local.description}</span>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};
