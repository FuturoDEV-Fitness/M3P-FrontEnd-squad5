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
export const lerUsuariosPorId = async (id) => {
  try {
    const response = await axiosInstance.get(`/usuario/${id}`, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar usuário por ID:", error);
    throw error;
  }
};

export const cadastrarUsuario = async (novoUsuario) => {
  try {
    const res = await axiosInstance.post(`/usuario`, novoUsuario);

    return res;
  } catch (err) {
    console.log("err: ", err.response.data);
    console.log(`Erro ao cadastrar: ${err.response.data.message}`);
    throw err;
  }
};

export const deletarUsuario = async (id) => {
  try {
    const res = await axiosInstance.delete(`usuario/${id}`, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    });

    return res;
  } catch (err) {
    console.log("Erro ao deletar usuário: ", err);
    throw err;
  }
};

export const editarUsuario = async (id, dadosUsuario) => {
  try {
    const res = await axiosInstance.put(`usuario/${id}`, dadosUsuario, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    });
    return res;
  } catch (err) {
    console.log("Erro ao atualizar usuário: ", err);
    throw err;
  }
};
