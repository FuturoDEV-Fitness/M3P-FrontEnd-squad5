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
        return res;
      })
      .catch((e) => console.log(e));

    return data;
  } catch (error) {
    console.log(error);
  }
};

/*
export const GetByUserId = async (userId) => {
  try {
    const data = await axiosInstance
      .get(`local?user_id=${userId}`)
      .then((r) => {
        return r.data;
      })
      .catch((e) => console.log(e));

    return data;
  } catch (error) {
    console.log(error);
  }
};*/

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
    await axiosInstance
      .post(`local`, data, {
        headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log("err: ", err.response.data);
        console.log(`Erro ao cadastrar ${err.response.data.message}`);
      });
  } catch (error) {
    console.log(error);
  }
};

export const Update = async (id, newData) => {
  await axiosInstance
    .put(`local/${id}`, newData, {
      headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log("err: ", err);
      console.log(`Erro ao atualizar ${err.message}`);
    });
};
