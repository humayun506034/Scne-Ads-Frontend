import "leaflet/dist/leaflet.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import CustomToaster from "./pages/CustomToaster";
import routes from "./routes/Routes";
import { persistor, store } from "./store/store.ts";
import { NuqsAdapter } from "nuqs/adapters/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <NuqsAdapter>
        {" "}
        <RouterProvider router={routes} />
        <PersistGate
          loading={null}
          persistor={persistor}
        ></PersistGate>
        <CustomToaster />
      </NuqsAdapter>
    </Provider>
  </StrictMode>
);
