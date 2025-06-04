import "../globals.css";

export const metadata = {
  title: "Admin Login",
  description: "Admin Login",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
