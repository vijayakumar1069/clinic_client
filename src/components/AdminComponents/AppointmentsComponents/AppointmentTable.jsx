import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AppointmentTable = ({
  appointments = [],
  doctors = [],
  loading = false,
}) => {

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDoctorName = (doctorId) => {
    
    const doctor = doctors.find((d) => d._id === doctorId);
    return doctor ? `Dr. ${doctor.name}` : "Doctor Not Found";
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading appointments...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          Appointments ({appointments.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-500 uppercase tracking-wider">
                        Patient Details
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-sm text-gray-500 uppercase tracking-wider">
                        Time Slot
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment, index) => (
                      <tr 
                        key={appointment._id} 
                        className={`border-b border-gray-200 hover:bg-gray-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div className="font-medium text-gray-900">
                            {appointment.name}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-sm">
                            <div className="text-gray-900">{appointment.email}</div>
                            <div className="text-gray-500">{appointment.mobile}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {getDoctorName(appointment.doctor?._id)}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">
                          {formatDate(appointment.date)}
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            {appointment.timing.charAt(0).toUpperCase() +
                              appointment.timing.slice(1)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment._id} className="border border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header with name and timing */}
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 text-base">
                            {appointment.name}
                          </h3>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100 ml-3 shrink-0">
                          {appointment.timing.charAt(0).toUpperCase() +
                            appointment.timing.slice(1)}
                        </Badge>
                      </div>
                      
                      {/* Contact Information */}
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                          Contact
                        </p>
                        <div className="space-y-1">
                          <p className="text-sm text-gray-900">{appointment.email}</p>
                          <p className="text-sm text-gray-600">{appointment.mobile}</p>
                        </div>
                      </div>
                      
                      {/* Doctor and Date Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                            Doctor
                          </p>
                          <p className="text-sm text-gray-900 font-medium">
                            {getDoctorName(appointment.doctor?._id)}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-xs font-medium text-gray-500 uppercase mb-1">
                            Date
                          </p>
                          <p className="text-sm text-gray-900 font-medium">
                            {formatDate(appointment.date)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentTable;