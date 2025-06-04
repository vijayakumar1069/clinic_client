import { Home, Settings, User } from "lucide-react";

export const adminSidebarValues = [
  {
    id: 1,
    title: "Dashboard",
    path: "/admin-dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Doctors",
    path: "/admin-doctors",
    icon: User,
  },
  {
    id: 3,
    title: "Appointments",
    path: "/admin-appointments",
    icon: Settings,
  },
];

export const doctorSidebarValues = [
  {
    id: 1,
    title: "Dashboard",
    path: "/doctor-dashboard",
    icon: Home,
  },

  {
    id: 2,
    title: "Appointments",
    path: "/doctor-appointments",
    icon: Settings,
  },
];
