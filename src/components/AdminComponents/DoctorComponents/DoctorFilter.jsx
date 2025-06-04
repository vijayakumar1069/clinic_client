import React from "react";

import { specializations, timeSlots } from "@/lib/consts/doctorConsts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DoctorFilter = ({
  searchTerm,
  onSearchChange,
  specializationFilter,
  onSpecializationChange,
  timeSlotFilter,
  onTimeSlotChange,
  resultCount,
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filter Doctors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={specializationFilter} onValueChange={onSpecializationChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by specialization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specializations</SelectItem>
              {specializations.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={timeSlotFilter} onValueChange={onTimeSlotChange}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by time slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time Slots</SelectItem>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot.charAt(0).toUpperCase() + slot.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {(searchTerm || specializationFilter !== 'all' || timeSlotFilter !== 'all') && (
          <div className="mt-3 text-sm text-muted-foreground">
            Showing <span className="font-medium">{resultCount}</span> result{resultCount !== 1 ? 's' : ''} 
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorFilter;
