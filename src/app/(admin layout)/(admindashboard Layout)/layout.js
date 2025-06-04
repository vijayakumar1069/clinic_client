import LayoutWrapper from "@/components/LayoutWrapper";
import "../../globals.css";

export const metadata = {
  title: "Admin Login",
  description: "Admin Login",
};

export default function AdminDashboardRootLayout({ children }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
