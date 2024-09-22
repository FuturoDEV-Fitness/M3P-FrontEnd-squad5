import styles from "./index.module.css";
import { FormLoginComponent } from "../../components/Forms/Login";

export const PaginaLogin = () => {
  return (
    <div className={styles.container}>
      <FormLoginComponent />
    </div>
  );
};
