import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import { UserDashboardLayout } from "@/Layout/UserLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import NewCampaignPage from "@/pages/UserDashboard/NewCampaignPage";
import UserDashboard from "@/pages/UserDashboard/UserDashboard";
import UserDashboardMetrics from "@/pages/UserDashboard/UserDashboardMetrics";
import UserPanel from "@/pages/UserDashboard/UserPanel";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/user-dashboard",
    element: <UserDashboardLayout />,
    children: [
      {
        index: true,
        element: <UserDashboard />,
      },
      {
        path: "metrics",
        element: <UserDashboardMetrics />,
      },
      {
        path: "new-campaign",
        element: <NewCampaignPage />,
      },
      {
        path: "userPanel",
        element: <UserPanel />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
