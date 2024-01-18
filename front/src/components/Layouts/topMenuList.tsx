import { ROLES } from "../../constants";
import Icons from "../../icons/sidebar";

const index = (role: string) => {
  const common = [
    {
      title: "Dashboard",
      Icon: Icons.DashboardIcon,
      path: "/dashboard",
    },

    {
      title: "Supervision de la flotte",
      Icon: Icons.LocationOnIcon,
      path: "../maps",
    },

    {
      title: "Mon Profil",
      Icon: Icons.UserProfileIcon,
      path: "/dashboard/Profile",
    },

    {
      title: "Réclamation",
      Icon: Icons.BugReportIcon,
      path: "/dashboard/Claims",
    },
   
    {
      title: "Déconnexion",
      Icon: Icons.LoginIcon,
      path: "/login",
    },
    
  ];
  

  return common
}

export default index; 