import { axiosInstance } from "../../helper/axiosInstance";

export const GetLocations = async () => {
  try {
    const data = await axiosInstance
      .get("listaLocais")
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
      .get(`listaLocais/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch((e) => console.log(e));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const GetByUserId = async (userId) => {
  try {
    const data = await axiosInstance
      .get(`listaLocais?user_id=${userId}`)
      .then((r) => {
        return r.data;
      })
      .catch((e) => console.log(e));

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const Delete = async (id) => {
  await axiosInstance
    .delete(`listaLocais/${id}`)
    .then(() => {
      return "Local removido com sucesso";
    })
    .catch((err) => {
      console.log("err: ", err.response.data);
    });
};

export const Store = async (data) => {
  try {
    await axiosInstance
      .post(`listaLocais`, data)
      .then(async () => {
        return "Local cadastrado com sucesso";
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
    .put(`locations/${id}`, newData)
    .then(() => {
      return "Atualizado com sucesso";
    })
    .catch((err) => {
      console.log("err: ", err);
      console.log(`Erro ao atualizar ${err.message}`);
    });
};
