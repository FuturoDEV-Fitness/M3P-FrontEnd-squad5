// PaginaLogin.js
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "../../Input";
import { ButtonComponent } from "../../Button";
import styles from "../index.module.css";
import { LoginContext } from "../../../context/LoginContext";

export const FormLoginComponent = () => {
  const { showRegister } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.loginForm}>
      <h1 className={styles.formTitle}>Login</h1>
      <form className={styles.formColumn}>
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
