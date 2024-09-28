import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PaginaErro from "../pages/PaginaErro";
import PaginaLista from "../pages/lista/index.jsx";
import DashBoard from "../pages/dashboard/index.jsx";
import { PaginaLogin } from "../pages/login/index.jsx";
import { CadastroLocalExercicio } from "../pages/cadastro/index.jsx";
import { PrivateRoutes } from "./PrivateRoutes.jsx";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <PaginaLogin />,
  },

  {
    path: "/",
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },

      {
        path: "/cadastro",
        element: (
          <PrivateRoutes>
            <CadastroLocalExercicio />
          </PrivateRoutes>
        ),
      },
      {
        path: "/cadastro/:id?",
        element: (
          <PrivateRoutes>
            <CadastroLocalExercicio />
          </PrivateRoutes>
        ),
      },
      {
        path: "/lista",
        element: (
          <PrivateRoutes>
            <PaginaLista />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default routes;
