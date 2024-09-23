// PaginaLogin.js
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "../../Input";
import { ButtonComponent } from "../../Button";
import styles from "./index.module.css";

export const FormLoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className={styles.loginForm}>
      <h1 className={styles.formTitle}>Login</h1>
      <form className={styles.Column}>
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

        <div className={styles.formColumn}>
          <span className={styles.styledLink}>Não possui conta?</span>
          <ButtonComponent variant="outlined" type="submit" text="Login" />
        </div>
      </form>
    </div>
  );
};
