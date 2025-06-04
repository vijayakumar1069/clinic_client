import Doctor from "@/components/AdminComponents/DoctorComponents/Doctor";
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
      <Doctor doctors={doctors} />
    </div>
  );
}
