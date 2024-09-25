import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import { TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

// locations vai mudar quando o service de locais estiver pronto
export const MapComponent = (locations) => {
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
    <div className={styles.mapContainer}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {locations &&
          locations.map((local, index) => (
            <Marker
              position={[
                Number(local.coordinates.latitude),
                Number(local.coordinates.longitude),
              ]}
              key={index}
              icon={customIcon}
            >
              <div className={styles.popup}>
                <div className={styles.popupContainer}>
                  <div className={styles.closeButton}>&times;</div>
                  <h2 className={styles.popupTitle}>{local.name}</h2>
                  <div className={styles.popupContent}>
                    <span className={styles.popupSpan}>{local.location}</span>
                    <div className={styles.popupGrid}>
                      {Object.values(local.sports_types).map(
                        (sport, index) =>
                          sport.hasOption && (
                            <span className={styles.popupSportType} key={index}>
                              {sport.name}
                            </span>
                          )
                      )}
                    </div>
                    <span className={styles.popupSpan}>
                      {local.description}
                    </span>
                  </div>
                </div>
              </div>
            </Marker>
          ))}
      </MarkerClusterGroup>
    </div>
  );
};
