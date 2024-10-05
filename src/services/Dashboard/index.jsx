import { axiosInstance } from "../../helper/axiosInstance";
import { getLocalStorage } from "../../helper/LocalStorageInstance";

export const GetDashboard = async () => {
  try {
    const data = await axiosInstance
      .get("dashboard")
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
export const UserLoggedDashboard = async () => {
  try {
    const data = await axiosInstance
      .get("dashboard/logged", {
        headers: { Authorization: `Bearer ${getLocalStorage("token")}` },
      })
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
