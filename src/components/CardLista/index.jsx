import styles from "./index.module.css";
import { TileLayer, Marker, MapContainer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import PropTypes from "prop-types";

function CardLista({ listalocais }) {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });

  return (
    <div className={styles.cardcontainer}>
      <MapContainer
        center={[Number(listalocais.latitude), Number(listalocais.longitude)]}
        zoom={13}
        className={styles.mapContainer}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[
            Number(listalocais.latitude),
            Number(listalocais.longitude),
          ]}
          icon={customIcon}
        >
          <Popup />
        </Marker>
      </MapContainer>

      <div className={styles.topo}>
        <h3>{listalocais.nomeLocal}</h3>
        <p>{listalocais.descricaoLocal}</p>
      </div>

      <div className={styles.endereco}>
        <p>
          <strong>Endereço:</strong> {listalocais.endereco}
        </p>
        <p>
          <strong>Bairro:</strong> {listalocais.bairro}
        </p>
        <p>
          <strong>Cidade:</strong> {listalocais.cidade}
        </p>
        <p>
          <strong>Estado:</strong> {listalocais.estado}
        </p>
      </div>

      <div className={styles.latLong}>
        <p>
          <strong>Coordenadas:</strong> {listalocais.latitude} /{" "}
          {listalocais.longitude}
        </p>
      </div>

      <div className={styles.praticas}>
        <p>
          <strong>Práticas permitidas:</strong>
          {listalocais.praticasEsportivas.map((praticaX, index) => (
            <span key={index}>
              {index === listalocais.praticasEsportivas.length - 1
                ? ` ${praticaX}.`
                : ` ${praticaX},`}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default CardLista;

CardLista.propTypes = {
  listalocais: PropTypes.shape({
    nomeLocal: PropTypes.string.isRequired,
    descricaoLocal: PropTypes.string.isRequired,
    endereco: PropTypes.string.isRequired,
    bairro: PropTypes.string.isRequired,
    cidade: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    praticasEsportivas: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
