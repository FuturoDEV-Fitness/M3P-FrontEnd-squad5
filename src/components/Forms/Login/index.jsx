// PaginaLogin.js
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { InputComponent } from "../../Input";
import { ButtonComponent } from "../../Button";

export const FormLoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const selectGender = [
    { value: "", label: "Selecione" },
    { value: "Male", label: "Masculino" },
    { value: "Female", label: "Feminino" },
    { value: "Other", label: "Outro" },
  ];

  return (
    <div>
      <div>
        <div>
          <span>Login</span>

          <form>
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

            <ButtonComponent
              variant={"outlined"}
              type={"submit"}
              text={"Login"}
            />
          </form>

          <span>Não possui conta?</span>
          <button>SignUp</button>
        </div>
      </div>
    </div>
  );
};
