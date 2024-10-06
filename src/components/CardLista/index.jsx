import styles from "./index.module.css";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { TileLayer, Marker, MapContainer, Popup } from "react-leaflet";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { ButtonComponent } from "../Button";
import { useNavigate } from "react-router-dom";
import { LocaisContext } from "../../context/LocaisContext";
import Swal from "sweetalert2";

function CardLista({ listalocais }) {
  const praticasEsportivas = listalocais?.praticas || [];
  const praticasNomes = praticasEsportivas.flatMap((pratica) => pratica.nome);
  const { user } = useContext(AuthContext);
  const { deleteLocal } = useContext(LocaisContext);
  const navigate = useNavigate();

  const deleteFunction = async () => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteLocal(listalocais.id);
    }
  };

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconSize: [38, 38],
  });

  return (
    <div className={styles.cardcontainer}>

      {!listalocais ? (
        <h1>Carregando.....</h1>
      ) : (
        <>
          <div className={styles.map}>
            {listalocais.latitude && listalocais.longitude ? (
              <MapContainer
                center={[
                  Number(listalocais.latitude),
                  Number(listalocais.longitude),
                ]}
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
                  <Popup>
                    <div className={styles.popupContent}>
                      <h2>{listalocais.nomeLocal}</h2>
                      <p>{listalocais.descricaoLocal}</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div className={styles.noMap}>Coordenadas não disponíveis</div>
            )}

          </div>
          <div className={styles.texto}>
            <div className={styles.topo}>
              <h3>{listalocais.nomeLocal}</h3>
              <p>{listalocais.descricaoLocal}</p>
            </div>

            <div className={styles.praticas}>
              <p>
                <strong>Práticas:</strong>
                {praticasNomes.length > 0 ? (
                  praticasNomes.map((praticaX, index) => (
                    <span key={index}>
                      {index === praticasNomes.length - 1
                        ? ` ${praticaX}.`
                        : ` ${praticaX},`}
                    </span>
                  ))
                ) : (
                  <span> Nenhuma prática disponível.</span>
                )}
              </p>
            </div>
            <div className={styles.endereco}>
              <p>
                <strong>Endereço:</strong> {listalocais.endereco}, {listalocais.bairro}, {listalocais.cidade} ({listalocais.estado})
              </p>
              <p>
                <strong>Link:</strong> {listalocais.googleLink}
              </p>
            </div>

            {user && user.id === listalocais.id_usuario ? (
              <div className={styles.botoes}>
                <ButtonComponent
                  variant="contained"
                  type="button"
                  text="Editar"
                  preset="edit"
                  onClick={() => navigate(`/cadastro/${listalocais.id}`)}
                />
                <ButtonComponent
                  variant="contained"
                  type="button"
                  text="Deletar"
                  preset="delete"
                  onClick={deleteFunction}
                />
              </div>
              
            ) : null}
            </div>
          </>
          
      )}
        
</div>
      );
}

      CardLista.propTypes = {
        listalocais: PropTypes.shape({
        nomeLocal: PropTypes.string.isRequired,
      descricaoLocal: PropTypes.string.isRequired,
      endereco: PropTypes.string.isRequired,
      bairro: PropTypes.string.isRequired,
      cidade: PropTypes.string.isRequired,
      estado: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      id_usuario: PropTypes.number.isRequired,
      googleLink: PropTypes.string,
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
      praticas: PropTypes.arrayOf(
      PropTypes.shape({
        nome: PropTypes.arrayOf(PropTypes.string).isRequired, // Esperando um array de strings
      })
      ).isRequired,
  }).isRequired,
};

      export default CardLista;
