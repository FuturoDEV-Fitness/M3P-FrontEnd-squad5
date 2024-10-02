import axios from "axios";
import { axiosInstance } from "../../helper/axiosInstance";

export const Auth = async (dados) => {
  try {
    const response = await axios
      .post("http://localhost:3003/login", dados)
      .then((res) => {
        return res;
      });
    return response;
  } catch (error) {
    return error.response || error;
  }
};
