"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import AppointmentForm from "./forms/AppointmentForm";
import { Appointment } from "@/types";

interface AppointmentModalProps {
  type: "schedule" | "cancel";
  patientId: string;
  userId: string;
  appointment?: Appointment;
}

const AppointmentModal = ({
  type,
  patientId,
  userId,
  appointment,
}: AppointmentModalProps) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`capitalize ${
            type === "schedule" && "text-green-500"
          } cursor-pointer`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize ">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please fill in the following detals to {type} an appointment
          </DialogDescription>
        </DialogHeader>
        <AppointmentForm
          patientId={patientId}
          userId={userId}
          type={type}
          appointment={appointment}
          setOpen={() => setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
