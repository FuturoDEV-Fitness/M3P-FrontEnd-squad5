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

// Metodos de criar e atualizar, serão refatorados quando o backend estiver pronto
/*
export const Store = async (data) => {
  try {
    const sportsTypesArray = [
      { name: "Musculação", hasOption: data.option1 },
      { name: "Futebol", hasOption: data.option2 },
      { name: "Natação", hasOption: data.option3 },
      { name: "Basquete", hasOption: data.option4 },
      { name: "Tênis", hasOption: data.option5 },
      { name: "Vôlei", hasOption: data.option6 },
      { name: "Corrida", hasOption: data.option7 },
      { name: "Yoga", hasOption: data.option8 },
      { name: "Outros", hasOption: data.option9 },
    ];

    await axiosInstance
      .post(`locations`, {
        user_id: data.user_id,
        name: data.name,
        description: data.description,
        location: data.location,
        zipcode: data.zipcode,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        coordinates: {
          latitude: data.latitude,
          longitude: data.longitude,
        },
        sports_types: sportsTypesArray,
      })
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
  const sportsTypesArray = [
    { name: "Musculação", hasOption: newData.option1 },
    { name: "Futebol", hasOption: newData.option2 },
    { name: "Natação", hasOption: newData.option3 },
    { name: "Basquete", hasOption: newData.option4 },
    { name: "Tênis", hasOption: newData.option5 },
    { name: "Vôlei", hasOption: newData.option6 },
    { name: "Corrida", hasOption: newData.option7 },
    { name: "Yoga", hasOption: newData.option8 },
    { name: "Outros", hasOption: newData.option9 },
  ];
  const data = {
    user_id: newData.user_id,
    name: newData.name,
    description: newData.description,
    location: newData.location,
    zipcode: newData.zipcode,
    neighborhood: newData.neighborhood,
    city: newData.city,
    state: newData.state,
    coordinates: {
      latitude: newData.latitude,
      longitude: newData.longitude,
    },
    sports_types: sportsTypesArray,
  };

  await axiosInstance
    .put(`locations/${id}`, data)
    .then(() => {
      return "Atualizado com sucesso";
    })
    .catch((err) => {
      console.log("err: ", err);
      console.log(`Erro ao atualizar ${err.message}`);
    });
};*/
