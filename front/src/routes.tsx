import AuthGuard from "./components/authentication/AuthGuard";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import GuestGuard from "./components/authentication/GuestGuard";
import DashboardLayout from "./components/Layouts/DashboardLayout";
import LoadingScreen from "./components/LoadingScreen";
  
const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// authentication pages
const Login = Loadable(lazy(() => import("./pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("./pages/authentication/Register"))
);
const DashboardSaaS = Loadable(lazy(() => import("./pages/dashboards/SaaS")));

const UserProfile = Loadable(lazy(() => import("./pages/UserProfile")));

const Tickets = Loadable(lazy(() => import("./pages/userManagement/Tickets"))); 

const MapsSupervision = Loadable(lazy(() => import("./pages/Maps")));

const Error = Loadable(lazy(() => import("./pages/404")));


const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },

  {
    path: "login",
    element: (
      <GuestGuard>
        <Login />
      </GuestGuard>
    ),
  },

  {
    path: "Inscription",
    element: <Register />,
  },

   {
    path: "Maps",
    element: <MapsSupervision />,
  },
  {
    path: "dashboard",
    element: (
       <AuthGuard>
        <DashboardLayout />
    
      </AuthGuard>
    ),
    
    children: [
      {
        path: "",
        element: <DashboardSaaS />,
      },
      {
        path: "Profile",
        element: <UserProfile />,
      },

      {
        path: "Claims",
        element: <Tickets />,
      },
    ],
  },
  
  {
    path: "user-profile",
    element: <UserProfile />,
  },


  {
    path: "*",
    element: <Error />,
  },
];

export default routes;
