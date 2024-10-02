// PaginaLogin.js
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "../../Input";
import { ButtonComponent } from "../../Button";
import styles from "../index.module.css";
import { LoginContext } from "../../../context/LoginContext";
import { setLocalStorage } from "../../../helper/LocalStorageInstance";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

export const FormLoginComponent = () => {
  const { showRegister } = useContext(LoginContext);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitLongin = async (data) => {
    const loginBoolean = await login(data);
    if (loginBoolean) {
      navigate("/");
    }
  };

  return (
    <div className={styles.loginForm}>
      <h1 className={styles.formTitle}>Login</h1>
      <form className={styles.formColumn} onSubmit={handleSubmit(submitLongin)}>
        <InputComponent
          label="Email"
          type="email"
          placeholder="email@email"
          id="emailLogin"
          register={register("email", {
            required: "Insira um email válido",
          })}
          error={!!errors.email}
          errorMessage={errors.email?.message}
        />

        <InputComponent
          label="Senha"
          type="password"
          placeholder="senha de pelo menos 6 dígitos"
          id="senhaLogin"
          register={register("senha", {
            required: "Insira sua senha",
            minLength: {
              value: 6,
              message: "A senha deve ter no mínimo 6 caracteres",
            },
          })}
          error={!!errors.senha}
          errorMessage={errors.senha?.message}
        />
        <span className={styles.styledLink} onClick={showRegister}>
          Não possui conta? Clique aqui para criar uma!
        </span>
        <ButtonComponent variant="outlined" type="submit" text="Login" />
      </form>
    </div>
  );
};
