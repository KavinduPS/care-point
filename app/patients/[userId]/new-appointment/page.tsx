import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/services/patientServices";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP */}
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto max-w-[860px] flex-1 justify-between">
          <Image
            src={"/assets/icons/mhs-logo-full.svg"}
            height={1500}
            width={1500}
            alt="logo"
            className="mb-10 mt-12 h-20 w-fit"
          />
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient?.userId}
          />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-gray-400 xl:text-left">
              © 2025 CarePoint
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewAppointment;
