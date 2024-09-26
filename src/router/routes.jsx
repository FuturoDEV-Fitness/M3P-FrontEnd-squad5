import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import PaginaErro from "../pages/PaginaErro";
import PaginaLista from "../pages/lista/index.jsx";
import DashBoard from "../pages/dashboard/index.jsx";
import { PaginaLogin } from "../pages/login/index.jsx";
import { getLocalStorage } from "../helper/LocalStorageInstance.jsx";
import { CadastroLocalExercicio } from "../pages/cadastro/index.jsx";

const usuarioLogado = getLocalStorage("user");

const PrivateRoute = ({ children }) => {
  return usuarioLogado ? children : <Navigate to="/login" />;
};
const routes = createBrowserRouter([
  {
    path: "/login",
    element: <PaginaLogin />,
  },

  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    errorElement: <PaginaErro />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },

      {
        path: "/cadastro/:id?",
        element: <CadastroLocalExercicio />,
      },
      {
        path: "/lista",
        element: <PaginaLista />,
      },
    ],
  },
]);

export default routes;
