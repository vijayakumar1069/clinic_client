import React from "react";

import DoctorForm from "@/components/Forms/DoctorForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const DoctorDialog = ({ doctor, isOpen, onOpenChange, onSubmit, loading }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{doctor ? "Edit Doctor" : "Add New Doctor"}</DialogTitle>
        </DialogHeader>
        <DoctorForm
          doctor={doctor}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DoctorDialog;
