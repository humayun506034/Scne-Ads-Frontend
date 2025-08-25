import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import { UserDashboardLayout } from "@/Layout/UserLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import { AdminDashboardLayout } from "@/Layout/AdminLayout";
import AdminDashboardHomePage from "@/pages/AdminDashboard/AdminDashboardHomePage";
import CampaignTablePage from "@/pages/UserDashboard/CampaignTableSection";
import NewCampaignPage from "@/pages/UserDashboard/NewCampaignPage";
import UserDashboard from "@/pages/UserDashboard/UserDashboard";
import UserDashboardMetrics from "@/pages/UserDashboard/UserDashboardMetrics";
import UserPanel from "@/pages/UserDashboard/UserPanel";
import UserChangePassword from "@/pages/UserDashboard/UserChangePassword";
import UserBillingPersonalAcc from "@/pages/UserDashboard/UserBillingPersonalAcc";
import UserBillingInfo from "@/pages/UserDashboard/UserBillingInfo";
import UserPaymentMethod from "@/pages/UserDashboard/UserPaymentMethod";
import UserAdsCredit from "@/pages/UserDashboard/UserAdsCredit";
import UserBillingBusinessAcc from "@/pages/UserDashboard/UserBillingBusinessAcc";
import UserInvoice from "@/pages/UserDashboard/UserInvoice";
import AdminBasicInfo from "@/pages/AdminDashboard/AdminBasicInfo";
import AdminChangePassword from "@/pages/AdminDashboard/AdminChangePassword";
import AdminCampaignData from "@/pages/AdminDashboard/AdminCampaignData";
import AdminCampaignManagement from "@/pages/AdminDashboard/AdminCampaignsManagement";
import ScreenScheduleManagement from "@/pages/AdminDashboard/ScreenScheduleManagement";
import DynamicPricingManagement from "@/pages/AdminDashboard/DynamicPricingManagement";
import CampaignPerformanceAnalytics from "@/pages/AdminDashboard/CampaignPerformanceAnalytics";
import CostEstimator from "@/pages/UserDashboard/CostEstimator";

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
      { path: "change-password", element: <UserChangePassword /> },
      { path: "campaigns", element: <CampaignTablePage /> },
      { path: "userBillingPersonalAcc", element: <UserBillingPersonalAcc /> },
      { path: "userBillingInfo", element: <UserBillingInfo /> },

      {
        path: "userBillingBusinessAcc",
        element: <UserBillingBusinessAcc />,
      },
      {
        path: "userPaymentMethod",
        element: <UserPaymentMethod />,
      },
      {
        path: "userAdsCredit",
        element: <UserAdsCredit />,
      },
      {
        path: "userInvoice",
        element: <UserInvoice />,
      },
      { path: "costEstimator", element: <CostEstimator /> },

        path: "campaigns",
        element: <CampaignTablePage />,
      },

    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminDashboardHomePage />,
      },

      {
        path: "adminBasicInfo",
        element: <AdminBasicInfo />,
      },
      { path: "adminChangePassword", element: <AdminChangePassword /> },
      {
        path: "adminCampaignData",
        element: <AdminCampaignData />,
      },
      {
        path: "adminAnalytics",
        element: <CampaignPerformanceAnalytics />,
      },
      { path: "campaigns", element: <AdminCampaignManagement /> },
      { path: "screen-scheduling", element: <ScreenScheduleManagement /> },
      { path: "pricing-management", element: <DynamicPricingManagement /> },

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
