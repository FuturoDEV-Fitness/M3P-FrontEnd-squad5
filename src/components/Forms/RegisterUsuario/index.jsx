import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "../index.module.css";
import { InputComponent } from "../../Input";
import { ButtonComponent } from "../../Button";
import { SelectComponent } from "../../Select";
import { selectGender } from "../../../helper/selectInstance";
import { LoginContext } from "../../../context/LoginContext";
import { ViaCEP } from "../../../services/Geolocalizador";
import {
  cadastrarUsuario,
  deletarUsuario,
  editarUsuario,
  lerUsuariosPorId,
} from "../../../services/Usuarios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../helper/formatInstance";
import Swal from "sweetalert2";
import { AuthContext } from "../../../context/AuthContext";

export const FormRegisterUsuarioComponent = () => {
  const { showLogin } = useContext(LoginContext);
  const { logout } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const { id } = useParams();

  const getAdress = async () => {
    const cep = getValues("cep");

    if (cep.length === 8) {
      const data = await ViaCEP(cep);
      setValue("logradouro", data.logradouro);
      setValue("bairro", data.bairro);
      setValue("cidade", data.localidade);
      setValue("estado", data.estado);
    }
  };

  useEffect(() => {
    if (id) {
      const configUser = async () => {
        const userData = await lerUsuariosPorId(id);
        setValue("nome", userData.nome);
        setValue("cpf", userData.cpf);
        setValue("sexo", userData.sexo);
        setValue("dataNascimento", userData.dataNascimento.split("T")[0]);
        setValue("email", userData.email);
        const endereco = userData.enderecos[0];
        if (endereco) {
          setValue("cep", endereco.cep);
          setValue("logradouro", endereco.logradouro);
          setValue("bairro", endereco.bairro);
          setValue("cidade", endereco.cidade);
          setValue("estado", endereco.estado);
          setValue("complemento", endereco.complemento);
          setValue("numero", endereco.numero);
        }
      };
      configUser();
    }
  }, []);

  const registerUser = async (data) => {
    try {
      const body = { ...data, dataNascimento: formatDate(data.dataNascimento) };
      let response;
      if (id) {
        response = await editarUsuario(id, body);
      } else {
        response = await cadastrarUsuario(body);
      }
      console.log("resposta", response);
      if (response?.status === 201) {
        toast.success(
          id ? "Conta atualizada com sucesso" : `Conta criada com sucesso!`,
          {
            position: "top-center",
            theme: "colored",
            autoClose: 2000,
          }
        );
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(`Email ou CPF já cadastrados!`, {
            position: "top-center",
            theme: "colored",
            autoClose: 2000,
          });
        } else {
          toast.error("Erro ao criar a conta.", {
            position: "top-center",
            theme: "colored",
            autoClose: 2000,
          });
        }
      }
    }
  };

  const deleteFunction = async () => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Você não poderá reverter isso!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      const deletedUser = await deletarUsuario(id);

      if (deletedUser && deletedUser.status !== 204) {
        toast.error(deletedUser.data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
      } else {
        toast.success("Sua conta foi deletada com sucesso!", {
          position: "top-center",
          theme: "colored",
          autoClose: 2000,
        });
        logout();
      }
    }
  };
  return (
    <div className={styles.form}>
      <h2 className={styles.formTitle}>
        {!id ? "Formulário de Cadastro" : "Configuração"}
      </h2>
      <form className={styles.formlogin} onSubmit={handleSubmit(registerUser)}>
        <div className={styles.formRow}>
          <InputComponent
            label="Nome"
            type="text"
            id="nome"
            placeholder="Nome Sobrenome"
            register={register("nome", {
              required: "Obrigatório o preenchimento",
              maxLength: { value: 60, message: "máximo de 60 caracteres" },
            })}
            error={errors.nome}
            errorMessage={errors.nome?.message}
          />

          <InputComponent
            label="CPF"
            type="text"
            id="cpf"
            readOnly={!id ? false : true}
            placeholder="000000000 - apenas números"
            register={register("cpf", {
              required: "Obrigatório o preenchimento",
              maxLength: { value: 11, message: "são 11 caracteres" },
              minLength: { value: 11, message: "mínimo de 11 caracteres" },
            })}
            error={errors.cpf}
            errorMessage={errors.cpf?.message}
          />

          <SelectComponent
            id={"sexo"}
            label={"Gênero"}
            error={!!errors.sexo}
            helperText={errors.sexo?.message}
            option={selectGender}
            register={{
              ...register("sexo", { required: "Selecione uma das opções" }),
            }}
          />
        </div>
        <div className={styles.formRow}>
          <InputComponent
            label="Nascimento"
            type="date"
            id="dataNascimento"
            register={register("dataNascimento", {
              required: "Obrigatório o preenchimento",
            })}
            error={errors.nascimento}
            errorMessage={errors.nascimento?.message}
          />

          <InputComponent
            label="Email"
            type="email"
            id="email"
            placeholder="email@email.com.br"
            register={register("email", {
              required: "Obrigatório o preenchimento",
            })}
            error={errors.email}
            errorMessage={errors.email?.message}
          />
          {!id && (
            <InputComponent
              label="Senha"
              type="password"
              id="senha"
              register={register("senha", {
                required: "Obrigatório o preenchimento",
                minLength: { value: 6, message: "mínimo de 6 caracteres" },
              })}
              error={errors.senha}
              errorMessage={errors.senha?.message}
            />
          )}
        </div>
        <div className={styles.formRow}>
          <InputComponent
            label="CEP"
            type="text"
            id="cep"
            placeholder="00000000 - apenas números"
            register={register("cep", {
              onBlur: getAdress,
              required: "Obrigatório o preenchimento",
              maxLength: { value: 8, message: "máximo de 8 caracteres" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Apenas números são permitidos",
              },
            })}
            error={errors.cep}
            errorMessage={errors.cep?.message}
            cep={true}
          />

          <InputComponent
            label="Logradouro"
            type="text"
            id="logradouro"
            readOnly={true}
            placeholder="Logradouro"
            register={register("logradouro", {
              required: "Necessário o preenchimento",
            })}
            error={errors.logradouro}
            errorMessage={errors.logradouro?.message}
          />

          <InputComponent
            label="Bairro"
            type="text"
            id="bairro"
            placeholder="Bairro"
            readOnly={true}
            register={register("bairro", {
              required: "Necessário o preenchimento",
            })}
            error={errors.bairro}
            errorMessage={errors.bairro?.message}
          />
        </div>
        <div className={styles.formRow}>
          <InputComponent
            label="Cidade"
            type="text"
            id="cidade"
            placeholder="Cidade"
            readOnly={true}
            register={register("cidade", {
              required: "Necessário o preenchimento",
            })}
            error={errors.cidade}
            errorMessage={errors.cidade?.message}
          />

          <InputComponent
            label="Estado"
            type="text"
            id="estado"
            placeholder="Estado"
            readOnly={true}
            register={register("estado", {
              required: "Necessário o preenchimento",
              maxLength: { value: 150, message: "máximo de 150 caracteres" },
              minLength: { value: 5, message: "mínimo de 5 caracteres" },
            })}
            error={errors.estado}
            errorMessage={errors.estado?.message}
          />

          <InputComponent
            label="Complemento"
            type="text"
            id="complemento"
            placeholder="Detalhes diferenciais"
            register={register("complemento", {
              required: "Necessário o preenchimento",
            })}
            error={errors.complemento}
            errorMessage={errors.complemento?.message}
          />
          <InputComponent
            label="Número"
            type="text"
            id="numero"
            placeholder="número"
            register={register("numero", {
              required: "Necessário o preenchimento",
              maxLength: { value: 4, message: "máximo de 4 caracteres" },
              pattern: {
                value: /^[0-9]*$/,
                message: "Apenas números são permitidos",
              },
            })}
            error={errors.numero}
            errorMessage={errors.numero?.message}
          />
        </div>
        <div className={styles.formRow}>
          {!id ? (
            <>
              <ButtonComponent
                type="submit"
                variant="contained"
                text="Cadastrar"
              />
              <span className={styles.styledLink} onClick={showLogin}>
                Voltar para o login?
              </span>
            </>
          ) : (
            <>
              <ButtonComponent
                variant="contained"
                type="submit"
                text="Editar"
                preset="edit"
              />
              <ButtonComponent
                variant="contained"
                type="button"
                text="Deletar"
                preset="delete"
                onClick={deleteFunction}
              />
            </>
          )}
        </div>
      </form>
    </div>
  );
};
