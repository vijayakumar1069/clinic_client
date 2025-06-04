"use client";
import React, { useEffect, useMemo, useState } from "react";
import AdminsDoctorFilter from "./AdminsDoctorFilter";
import AdminsDoctorDialog from "./AdminsDoctorDialog";
import AdminsDoctorTable from "./AdminsDoctorTable";
import { sampleDoctors } from "@/lib/consts/doctorConsts";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import useFetch from "@/app/hooks/useFetch";
import useAccessToken from "@/app/hooks/useAccessToken";
import { toast } from "sonner";

const AdminsDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [timeSlotFilter, setTimeSlotFilter] = useState("all");
  const { loading, success, error, fetchData } = useFetch();
  const { token, loading: tokenLoading } = useAccessToken();

  useEffect(() => {
    if (tokenLoading) {
      return;
    }
    const fetchDoctors = async () => {
      try {
        const res = await fetchData(
          `/api/admin-doctor/get-doctors?searchTerm=${searchTerm}&specialization=${specializationFilter}&timeSlot=${timeSlotFilter}`,
          "GET",
          null,
          token
        );

        if (res.success) {
          setDoctors(res.data);
        } else {
          toast.error(res.message || "Something went wrong", {
            description: "Failed to fetch doctors.",
            duration: 5000,
          });
        }
      } catch (err) {
        toast.error(err.message || "Something went wrong", {
          description: "Failed to fetch doctors.",
          duration: 5000,
        });
      }
    };

    fetchDoctors();
  }, [searchTerm, specializationFilter, timeSlotFilter, token]);

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsDialogOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  const handleDeleteDoctor = async (doctorId) => {
    const res = await fetchData(
      `/api/admin-doctor/delete-doctor/${doctorId}`,
      "DELETE",
      {},
      token
    );
    if (res.success) {
      setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
      toast.success("Doctor deleted successfully", {
        description: "Successfully deleted doctor.",
        duration: 5000,
      });
    } else {
      toast.error(res.message || "Something went wrong", {
        description: "Failed to fetch doctors.",
        duration: 5000,
      });
    }
  };

  const handleSubmitDoctor = async (doctorData) => {
    if (selectedDoctor) {
      const res = await fetchData(
        `/api/admin-doctor/update-doctor/${selectedDoctor._id}`,
        "PATCH",
        doctorData,
        token
      );
      if (res.success) {
        setDoctors(
          doctors.map((doctor) =>
            doctor._id === selectedDoctor._id
              ? { ...doctorData, _id: selectedDoctor._id }
              : doctor
          )
        );
        toast.success("Doctor updated successfully", {
          description: "Successfully updated doctor.",
          duration: 5000,
        });
      } else {
        toast.error(res.message || "Something went wrong", {
          description: "Failed to fetch doctors.",
          duration: 5000,
        });
      }
    } else {
      const res = await fetchData(
        "/api/admin-doctor/add-doctor",
        "POST",
        doctorData,
        token
      );
      if (res?.success) {
        setDoctors([...doctors, res?.data]);
        toast.success("Doctor added successfully", {
          description: "Successfully added doctor.",
          duration: 5000,
        });
      } else {
        toast.error(res.message || "Something went wrong", {
          description: "Failed to fetch doctors.",
          duration: 5000,
        });
      }
    }
    setIsDialogOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Doctor Management</h1>
          <p className="text-muted-foreground">
            Manage and organize doctor information
          </p>
        </div>
        <Button onClick={handleAddDoctor} className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Doctor
        </Button>
      </div>

      <AdminsDoctorFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        specializationFilter={specializationFilter}
        onSpecializationChange={setSpecializationFilter}
        timeSlotFilter={timeSlotFilter}
        onTimeSlotChange={setTimeSlotFilter}
        resultCount={doctors.length}
      />

      <AdminsDoctorTable
        doctors={doctors}
        onEdit={handleEditDoctor}
        onDelete={handleDeleteDoctor}
      />

      <AdminsDoctorDialog
        doctor={selectedDoctor}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmitDoctor}
      />
    </div>
  );
};

export default AdminsDoctor;
