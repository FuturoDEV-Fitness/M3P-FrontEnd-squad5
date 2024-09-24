import styles from "./index.module.css";
import { FormLoginComponent } from "../../components/Forms/Login";
import { FormRegisterUsuarioComponent } from "../../components/Forms/RegisterUsuario";
import { useContext } from "react";
import { LoginContext } from "../../context/LoginContext";

export const PaginaLogin = () => {
  const { login } = useContext(LoginContext);

  return (
    <div className={styles.container}>
      {login ? <FormLoginComponent /> : <FormRegisterUsuarioComponent />}
    </div>
  );
};
