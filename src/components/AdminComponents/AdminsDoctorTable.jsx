import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";

const AdminsDoctorTable = ({ doctors, onEdit, onDelete }) => {
  const getTimeSlotColor = (slot) => {
    const colors = {
      morning: "bg-yellow-100 text-yellow-800",
      afternoon: "bg-orange-100 text-orange-800",
      evening: "bg-purple-100 text-purple-800",
      night: "bg-blue-100 text-blue-800",
    };
    return colors[slot] || "bg-gray-100 text-gray-800";
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Doctors List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">
                  Specialization
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  Time Slot
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No doctors found
                  </TableCell>
                </TableRow>
              ) : (
                doctors.map((doctor) => (
                  <TableRow key={doctor._id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-muted-foreground sm:hidden">
                          {doctor.email}
                        </div>
                        <div className="text-sm text-muted-foreground md:hidden">
                          {doctor.specialization}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {doctor.email}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {doctor.specialization}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge
                        className={getTimeSlotColor(doctor.availableTimeSlot)}
                      >
                        {doctor.availableTimeSlot.charAt(0).toUpperCase() +
                          doctor.availableTimeSlot.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(doctor)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onDelete(doctor._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminsDoctorTable;
