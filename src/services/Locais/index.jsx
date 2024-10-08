import { axiosInstance } from "../../helper/axiosInstance";
import { getLocalStorage } from "../../helper/LocalStorageInstance";

export const GetLocations = async () => {
  try {
    const data = await axiosInstance
      .get("local")
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetID = async (id) => {
  try {
    const data = await axiosInstance
      .get(`local/${id}`, {
        headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const Delete = async (id) => {
  try {
    const res = await axiosInstance.delete(`local/${id}`, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    });
    return res;
  } catch (err) {
    console.log("Erro ao deletar: ", err.response?.data || err.message);
    throw err;
  }
};
export const Store = async (data) => {
  try {
    const response = await axiosInstance.post(`local`, data, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    });
    return response;
  } catch (error) {
    console.log(
      "Erro ao cadastrar: ",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
export const Update = async (id, newData) => {
  try {
    const response = await axiosInstance.put(`local/${id}`, newData, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    });
    return response;
  } catch (error) {
    console.log(
      "Erro ao atualizar:",
      error.response?.data?.message || error.message
    );
    throw error;
  }
};
