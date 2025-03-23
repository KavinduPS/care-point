import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { getAppointment } from "@/services/appointmentServices";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment?.primaryPhysician
  );

  return (
    <div className="flex h-screen px-[5%]">
      <div className="m-auto flex flex-1 flex-col items-center justify-between gap-6 py-1">
        <Link href={"/"}>
          <Image
            src={"/assets/icons/mhs-logo-full.svg"}
            height={1000}
            width={1000}
            alt="logo"
            className="h-15 w-fit"
          />
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src={"/assets/icons/appointment-success.gif"}
            height={1000}
            width={1000}
            alt="success"
            className="h-20 w-fit"
          />
          <h2 className="text-[32px] font-bold md:text-[36px] mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to confirm.</p>
        </section>
        <section className="flex w-full flex-col items-center gap-8 border-y-2 border-gray-900 py-8 md:w-fit md:flex-row">
          <p>Requested appointment details</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2 ">
            <Image
              src={"/assets/icons/calendar.svg"}
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment?.schedule.toDate()).dateTime}</p>
          </div>
        </section>
        <Button
          variant={"outline"}
          className="bg-green-500 text-white !important"
          asChild
        >
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="justify-items-end text-gray-400 xl:text-left">
          © 2025 CarePoint
        </p>
      </div>
    </div>
  );
};

export default Success;
