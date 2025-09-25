import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

import { UserDashboardLayout } from "@/Layout/UserLayout";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import { AdminDashboardLayout } from "@/Layout/AdminLayout";
import AdminBasicInfo from "@/pages/AdminDashboard/AdminBasicInfo";
import AdminCampaignData from "@/pages/AdminDashboard/AdminCampaignData";
import AdminCampaignManagement from "@/pages/AdminDashboard/AdminCampaignsManagement";

import AdminChangePassword from "@/pages/AdminDashboard/AdminChangePassword";
import AdminDashboardHomePage from "@/pages/AdminDashboard/AdminDashboardHomePage";
import CampaignTablePage from "@/pages/UserDashboard/CampaignTableSection";

import { MapOfBoardPage } from "@/pages/MapOfBoardsPage";
import NewCampaignPage from "@/pages/UserDashboard/NewCampaignPage";
import UserAdsCredit from "@/pages/UserDashboard/UserAdsCredit";
import UserBillingBusinessAcc from "@/pages/UserDashboard/UserBillingBusinessAcc";
import UserBillingInfo from "@/pages/UserDashboard/UserBillingInfo";
import UserBillingPersonalAcc from "@/pages/UserDashboard/UserBillingPersonalAcc";
import UserChangePassword from "@/pages/UserDashboard/UserChangePassword";
import UserDashboard from "@/pages/UserDashboard/UserDashboard";
import UserDashboardMetrics from "@/pages/UserDashboard/UserDashboardMetrics";
import UserInvoice from "@/pages/UserDashboard/UserInvoice";
import UserPanel from "@/pages/UserDashboard/UserPanel";
import UserPaymentMethod from "@/pages/UserDashboard/UserPaymentMethod";

import CampaignPerformanceAnalytics from "@/pages/AdminDashboard/CampaignPerformanceAnalytics";
import DynamicPricingManagement from "@/pages/AdminDashboard/DynamicPricingManagement";
import ScreenScheduleManagement from "@/pages/AdminDashboard/ScreenScheduleManagement";
import ProtectedRoute from "@/pages/ProtectedRoutes";
import CostEstimator from "@/pages/UserDashboard/CostEstimator";
import AdminScreenManagement from "@/pages/AdminDashboard/AdminScreenManagement";
import AdminBundleCampaignManagement from "@/pages/AdminDashboard/AdminBundleCampaignManagement";
import AdminScreenCampaignManagement from "@/pages/AdminDashboard/AdminScreenCampaignManagement";
import UserBundleCampaignManagement from "@/pages/UserDashboard/UserBundleCampaignManagement";
import UserScreenCampaignManagement from "@/pages/UserDashboard/UserScreenCampaignManagement";

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
    element: (
      <ProtectedRoute allowedRoles={["customer"]}>
        <UserDashboardLayout />
      </ProtectedRoute>
    ),
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

      { path: "bundle-campaigns", element: <UserBundleCampaignManagement /> },
      { path: "screen-campaigns", element: <UserScreenCampaignManagement /> },
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

      { path: "campaigns", element: <CampaignTablePage /> },
    ],
  },
  {
    path: "/admin-dashboard",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminDashboardLayout />
      </ProtectedRoute>
    ),
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
      { path: "bundle-campaigns", element: <AdminBundleCampaignManagement /> },
      { path: "screen-campaigns", element: <AdminScreenCampaignManagement /> },
      {
        path: "adminCampaignData",
        element: <AdminCampaignData />,
      },
            { path: "screen", element: <AdminScreenManagement /> },

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
    path: "mapOfBoard",
    element: <MapOfBoardPage />,
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
