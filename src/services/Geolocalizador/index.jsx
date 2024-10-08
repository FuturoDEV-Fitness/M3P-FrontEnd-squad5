import axios from "axios";

const NOMINATIM_API = "https://nominatim.openstreetmap.org/search";
const API_VIACEP = `http://viacep.com.br/ws/CEP/json/`;

export const GetNominatim = async (streetName, neighborhood, city, state) => {
  try {
    const response = await axios.get(NOMINATIM_API, {
      params: {
        q: `${streetName}, ${neighborhood}, ${city}, ${state}, Brazil`,
        format: "json",
        limit: 1,
      },
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error("Endereço não encontrado");
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const ViaCEP = async (cep) => {
  let data;
  await axios.get(API_VIACEP.replace("CEP", cep)).then((res) => {
    data = res.data;
  });
  return data;
};
