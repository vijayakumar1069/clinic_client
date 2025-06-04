"use client";
import React, { useState } from "react";

const AppointmentFilter = ({ doctors = [], onFilter, onClear }) => {
  const [filters, setFilters] = useState({
    doctorId: "",
    date: "",
    timeSlot: "",
  });

  const timeSlots = ["morning", "afternoon", "evening", "night"];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleSearch = () => {
    const searchParams = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value) acc[key] = value;
      return acc;
    }, {});
    onFilter(searchParams);
  };

  const handleClear = () => {
    const clearedFilters = { doctorId: "", date: "", timeSlot: "" };
    setFilters(clearedFilters);
    onClear();
  };
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Filter Appointments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Doctor
          </label>
          <select
            value={filters.doctorId}
            onChange={(e) => handleFilterChange("doctorId", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Doctors</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                Dr. {doctor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange("date", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Time Slot
          </label>
          <select
            value={filters.timeSlot}
            onChange={(e) => handleFilterChange("timeSlot", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Time Slots</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>
                {slot.charAt(0).toUpperCase() + slot.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search Appointments
        </button>
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default AppointmentFilter;
