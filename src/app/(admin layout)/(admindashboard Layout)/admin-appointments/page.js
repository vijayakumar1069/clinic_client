import Appointment from "@/components/AdminComponents/AppointmentsComponents/Appointment";
import { fetchServerSideData } from "@/lib/fetchServerSideData";

export default async function AdminAppointmentsPage() {
  let appointmentsdetails = [];
  let doctorDetails = [];

  const res = await fetchServerSideData(
    "/api/admin-appointment/get-appointments",
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (res) {
    appointmentsdetails = res;
  } else {
    throw new Error(res.message || "Something went wrong");
  }
  const doctors = await fetchServerSideData("/api/all-doctors", {
    method: "GET",
    cache: "no-cache",
  });
  if (doctors) {
    doctorDetails = doctors;
  } else {
    throw new Error(doctors.message || "Something went wrong");
  }

  return (
    <div className="">
      <Appointment doctors={doctorDetails} appointments={appointmentsdetails} />
    </div>
  );
}
