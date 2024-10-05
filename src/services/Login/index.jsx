import { axiosInstance } from "../../helper/axiosInstance";

export const Auth = async (dados) => {
  try {
    const response = await axiosInstance.post("login", dados).then((res) => {
      return res;
    });
    return response;
  } catch (error) {
    return error.response || error;
  }
};
