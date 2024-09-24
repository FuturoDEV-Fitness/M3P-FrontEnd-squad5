import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import CardLista from "../../components/CardLista";

function DashBoard() {
  const navigate = useNavigate();

  // function contarUsuariosPorEstado() {
  //     const usuariosPorEstado = {};

  //     for (let estado of ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS',
  //         'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']) {
  //         usuariosPorEstado[estado] = 0;
  //     }
  //     for (let usuario of usuarios) {
  //         usuariosPorEstado[usuario.estado]++;
  //     }
  //     return usuariosPorEstado;
  // }
  // const usuariosPorEstado = contarUsuariosPorEstado();

  return (
    <div className={styles.container}>
      <div className={styles.textual}>
        <h1>DashBoard</h1>
      </div>
    </div>
  );
}

export default DashBoard;
