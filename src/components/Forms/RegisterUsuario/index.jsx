import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UsuariosContext } from "../context/UsuariosContext";
import styles from "./FormularioCadastro.module.css";

export const FormRegisterUsuarioComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { cadastrarUsuario, buscarCpf } = useContext(UsuariosContext);
  const [cepPreenchido, setCepPreenchido] = useState(false);

  function cadUsuOnsubmit(novoUsuario) {
    buscarCpf(novoUsuario);
    // cadastrarUsuario(novoUsuario);
  }

  function buscarCEP(cep, setValue) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setValue("endereco", data.logradouro);
        setValue("bairro", data.bairro);
        setValue("cidade", data.localidade);
        setValue("estado", data.uf);
        setCepPreenchido(true);
      })
      .catch((error) => console.error("Erro ao buscar o CEP:", error));
  }

  const cepOnSubmit = (data) => {
    buscarCEP(data.cep, setValue);
  };

  return (
    <div>
      <h2>Formulário de Cadastro</h2>
      <form
        className={styles.formlogin}
        onSubmit={handleSubmit(cadUsuOnsubmit)}
      >
        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          placeholder="Nome Sobrenome"
          {...register("nome", {
            required: "Obrigatório o preenchimento",
            maxLength: { value: 60, message: "máximo de 60 caracteres" },
          })}
        />
        {errors.nome && <p>{errors.nome.message}</p>}

        <label htmlFor="sexo">Sexo</label>
        <input
          type="text"
          placeholder="masculino/feminino"
          {...register("sexo", {
            required: "Obrigatório o preenchimento",
            maxLength: { value: 9, message: "máximo de 9 caracteres" },
          })}
        />
        {errors.sexo && <p>{errors.sexo.message}</p>}

        <label htmlFor="cpf">CPF</label>
        <input
          type="text"
          placeholder="000000000 - apenas números"
          {...register("cpf", {
            required: "Obrigatório o preenchimento",
            maxLength: { value: 11, message: "são 11 caracteres" },
            minLength: { value: 11, message: "mínimimo de 11 caracteres" },
          })}
        />
        {errors.cpf && <p>{errors.cpf.message}</p>}

        <label htmlFor="nascimento">Nascimento</label>
        <input
          type="date"
          {...register("nascimento", {
            required: "Obrigatório o preenchimento",
          })}
        />
        {errors.nascimento && <p>{errors.nascimento.message}</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="email@email.com.br"
          {...register("email", {
            required: "Obrigatório o preenchimento",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          {...register("senha", {
            required: "Obrigatório o preenchimento",
            maxLength: { value: 8, message: "máximo de 8 caracteres" },
          })}
        />
        {errors.senha && <p>{errors.senha.message}</p>}

        <label htmlFor="cep">CEP</label>
        <input
          type="text"
          placeholder="00000000 - apenas numeros"
          {...register("cep", {
            required: "Obrigatório o preenchimento",
            maxLength: { value: 8, message: "máximo de 8 caracteres" },
            pattern: {
              value: /^[0-9]*$/,
              message: "Apenas números são permitidos",
            },
          })}
        />
        {errors.cep && <p>{errors.cep.message}</p>}

        <button type="button" onClick={handleSubmit(cepOnSubmit)}>
          Buscar CEP
        </button>

        {/* Campos de endereço e complementos */}
        <label htmlFor="endereco">Endereço</label>
        <input
          type="text"
          placeholder="teu endereço"
          {...register("endereco", {
            required: cepPreenchido ? "Necessário o preenchimento" : false,
          })}
        />
        {errors.endereco && <p>{errors.endereco.message}</p>}

        <label htmlFor="bairro">Bairro</label>
        <input
          type="text"
          placeholder="teu bairro"
          {...register("bairro", {
            required: cepPreenchido ? "Necessário o preenchimento" : false,
          })}
        />
        {errors.bairro && <p>{errors.bairro.message}</p>}

        <label htmlFor="cidade">Cidade</label>
        <input
          type="text"
          placeholder="tua cidade"
          {...register("cidade", {
            required: cepPreenchido ? "Necessário o preenchimento" : false,
          })}
        />
        {errors.cidade && <p>{errors.cidade.message}</p>}

        <label htmlFor="estado">Estado</label>
        <input
          type="text"
          placeholder="teu estado"
          {...register("estado", {
            required: cepPreenchido ? "Necessário o preenchimento" : false,
            maxLength: { value: 2, message: "máximo de 2 caracteres" },
            minLength: { value: 2, message: "mínimo de 2 caracteres" },
          })}
        />
        {errors.estado && <p>{errors.estado.message}</p>}

        <label htmlFor="complemento">Complemento</label>
        <input
          type="text"
          placeholder="Detalhes diferenciais"
          {...register("complemento", {
            required: cepPreenchido ? "Necessário o preenchimento" : false,
          })}
        />
        {errors.complemento && <p>{errors.complemento.message}</p>}

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};
