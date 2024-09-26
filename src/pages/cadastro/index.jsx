import styles from "./index.module.css";
import { RegisterLocaisComponent } from "../../components/Forms/RegisterLocais";

export const CadastroLocalExercicio = () => {
  return (
    <div className={styles.container}>
      <RegisterLocaisComponent />
    </div>
  );
};
