import { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LocaisContext } from "../../context/LocaisContext";
import { toast } from "react-toastify";
import { getLocalStorage } from "../../helper/LocalStorageInstance";
import CardLista from "../../components/CardLista";

function PaginaLista() {
  const { usuarioLocais, fetchLocais } = useContext(LocaisContext);
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getLocalStorage("token");
    if (!token) {
      logout();
      navigate("/");
      return;
    }

    const fetchData = async () => {
      await fetchLocais();
      setLoading(false);

      if (!usuarioLocais && usuarioLocais.length === 0) {
        toast.error("Você não possui locais cadastrados.", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
      }
    };

    fetchData();
  }, [fetchLocais, logout, navigate, usuarioLocais.length]);

  return (
    <div className={styles.container}>
      <div className={styles.textual}>
        <h1>Seus Locais</h1>
      </div>
      <div className={styles.containerRenderizador}>
        {loading ? (
          <p>Carregando locais...</p>
        ) : (
          <div>
            {usuarioLocais.length > 0 ? (
              usuarioLocais.map((local) => (
                <CardLista key={local.id} listalocais={local} />
              ))
            ) : (
              <p>Nenhum local encontrado.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginaLista;
