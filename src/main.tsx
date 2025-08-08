import "leaflet/dist/leaflet.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import CustomToaster from "./pages/CustomToaster.tsx";
import routes from "./routes/Routes.tsx";
import { store } from "./store/store.ts";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <CustomToaster />
    </Provider>
  </StrictMode>
);
