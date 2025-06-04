"use client";
import React, { useState } from "react";
import AppointmentFilter from "./AppointmentFilter";
import AppointmentTable from "./AppointmentTable";
import { AlertCircle } from "lucide-react";
import useFetch from "@/app/hooks/useFetch";
import useAccessToken from "@/app/hooks/useAccessToken";

const Appointment = ({
  doctors = [],
  appointments: initialAppointments = [],
}) => {
  const [appointments, setAppointments] = useState(initialAppointments);

  const { loading, error, fetchData } = useFetch();
  const { token } = useAccessToken();

  // Mock API call function - replace with your actual API call
  const fetchAppointments = async (searchParams = {}) => {
    // Build query string from search params
    const queryString = new URLSearchParams(searchParams).toString();
    const url = `/api/admin-appointment/get-appointments${
      queryString ? `?${queryString}` : ""
    }`;
    const res = await fetchData(url, "GET", null, token);

    setAppointments(res.data || res);
  };

  const handleFilter = async (searchParams) => {
    await fetchAppointments(searchParams);
  };

  const handleClear = async () => {
    await fetchAppointments();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Appointment Management
          </h1>
          <p className="text-gray-600">
            Manage and view all patient appointments
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        <AppointmentFilter
          doctors={doctors}
          onFilter={handleFilter}
          onClear={handleClear}
        />

        <AppointmentTable
          appointments={appointments}
          doctors={doctors}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Appointment;
