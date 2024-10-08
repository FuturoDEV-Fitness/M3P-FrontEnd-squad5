import { createBrowserRouter } from "react-router-dom";
import PaginaErro from "../pages/PaginaErro.jsx";
import PaginaLista from "../pages/lista/index.jsx";
import DashBoard from "../pages/dashboard/index.jsx";
import { PaginaLogin } from "../pages/login/index.jsx";
import { CadastroLocalExercicio } from "../pages/cadastro/index.jsx";
import { PrivateRoutes } from "./Private.routes.jsx";
import { Layout } from "../layout/Layout.jsx";
import { Configuracao } from "../pages/configuracao/index.jsx";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <PaginaLogin />,
  },

  {
    path: "/",
    element: <Layout />,
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
      {
        path: "/configuracao/:id?",
        element: (
          <PrivateRoutes>
            <Configuracao />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default routes;
