export function getRoleTitle(role) {
  switch (role) {
    case "admin":
      return "ADMIN";
    case "doctor":
      return "DOCTOR";
   
    default:
      return "Unknown Role";
  }
}