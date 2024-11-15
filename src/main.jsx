import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./router/App.routes.jsx";
import { AllProviders } from "./AllProviders.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AllProviders>
    <RouterProvider router={routes} />
  </AllProviders>
);
