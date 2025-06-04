import AdminsDoctor from "@/components/AdminComponents/AdminsDoctor";
import { fetchServerSideData } from "@/lib/fetchServerSideData";

export default async function AdminDoctorsPage() {
  let errorMessage = null;
  let doctors = [];

  try {
    doctors = await fetchServerSideData("/api/admin-doctor/get-doctors", {
      method: "GET",
      cache: "no-cache",
    });
  } catch (error) {
    errorMessage = error?.message || "Failed to load client information";
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return (
    <div>
      <AdminsDoctor doctors={doctors} />
    </div>
  );
}
