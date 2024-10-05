import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getLocalStorage } from "../helper/LocalStorageInstance";
import { GetDashboard, UserLoggedDashboard } from "../services/Dashboard";

export const DashboardContext = createContext();

export const DashboardContextProvider = ({ children }) => {
  const [dashboardData, setDashboardData] = useState({
    usuarios: 0,
    locais: 0,
    locaisUsuario: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const token = getLocalStorage("token");
    let data;

    if (token) {
      data = await UserLoggedDashboard();
    } else {
      data = await GetDashboard();
    }

    if (data && data.data) {
      setDashboardData({
        usuarios: data.data.usuarios,
        locais: data.data.locais,
        locaisUsuario: data.data.locaisUsuario || 0,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboardData, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

DashboardContextProvider.propTypes = {
  children: PropTypes.node,
};
