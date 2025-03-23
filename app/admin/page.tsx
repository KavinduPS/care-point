import StatCard from "@/components/StatCard";
import { getRecentAppointmentList } from "@/services/appointmentServices";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/columns";
import { convertFirebaseTimestamp, formatDateTime } from "@/lib/utils";

const Admin = async () => {
  const appointmentsRaw = await getRecentAppointmentList();

  const appointments = {
    ...appointmentsRaw,
    docs:
      appointmentsRaw?.docs.map((doc) => ({
        ...doc,
        schedule: formatDateTime(convertFirebaseTimestamp(doc.schedule))
          .dateTime,
      })) || [],
  };
  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="sticky top-3 z-20 mx-3 flex items-center justify-between rounded-2xl bg-gray-950 px-[5%] py-5 shadow-lg xl:px-12">
        <Link href={"/"} className="cursor-pointer">
          <Image
            src="/assets/icons/mhs-logo-full.svg"
            height={32}
            width={32}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>
        <p>Admin dashboard</p>
      </header>
      <main className="flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12">
        <section className="w-full space-y4">
          <h1 className="text-[32px] font-bold md:text-[36px]">Welcome 👋</h1>
          <p className="text-gray-400">
            Start the day with managing appointments
          </p>
        </section>
        <section className="flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10">
          <StatCard
            type="appointments"
            count={appointments?.scheduledCount!}
            label="Scheduled appointments"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments?.pendingCount!}
            label="Pending appointments"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments?.cancelledCount!}
            label="Cancelled appointments"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={columns} data={appointments?.docs} />
      </main>
    </div>
  );
};

export default Admin;
