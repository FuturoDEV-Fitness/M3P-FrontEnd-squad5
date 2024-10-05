import { axiosInstance } from "../../helper/axiosInstance";
import { getLocalStorage } from "../../helper/LocalStorageInstance";

export const lerUsuarios = async () => {
  try {
    const data = await axiosInstance
      .get("/usuario")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Erro durante a requisição: ", error);
      });
    return data;
  } catch (error) {
    console.log("Erro ao buscar usuários: ", error);
  }
};
// Função verificar CPF
//porém é feita pelo backend agora!!!
//   export const buscarCpf = async (novoUsuario) => {
//     try {
//       const { data } = await axiosInstance.get("usuarios");
//       const cpfExistente = data.some(user => user.cpf === novoUsuario.cpf);

//       if (cpfExistente) {
//         alert("CPF já cadastrado. Por favor, insira um CPF único.");
//       } else {
//         await cadastrarUsuario(novoUsuario);
//       }
//     } catch (error) {
//       console.log("Erro ao verificar CPF: ", error);
//       alert("Erro ao buscar usuários.");
//     }
//   };

// Função para buscar um usuário pelo ID

export const lerUsuariosPorId = async (id) => {
  try {
    const response = await axiosInstance.get(`/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    });
    return response;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;
  }
};

// Função para cadastrar um novo usuário
export const cadastrarUsuario = async (novoUsuario) => {
  await axiosInstance
    .post(`/usuario`, novoUsuario)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err: ", err.response.data);
      console.log(`Erro ao cadastrar: ${err.response.data.message}`);
    });
};

// Função para deletar um usuário pelo ID
export const deletarUsuario = async (id) => {
  try {
    await axiosInstance
      .delete(`usuario/${id}`, {
        headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.log("Erro ao deletar usuário: ", error);
  }
};

// Função para editar os dados de um usuário
export const editarUsuario = async (id, dadosUsuario) => {
  try {
    await axiosInstance
      .put(`usuario/${id}`, dadosUsuario, {
        headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
      })
      .then((res) => {
        return res;
      });
  } catch (error) {
    console.log("Erro ao atualizar usuário: ", error);
    alert("Erro ao atualizar usuário!");
  }
};
