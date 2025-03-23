import clsx from "clsx";
import Image from "next/image";
import React from "react";

interface StatCardProps {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
}
const StatCard = ({ type, count = 0, label, icon }: StatCardProps) => {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg",
        {
          "bg-gray-900": type === "appointments",
          "bg-gray-800": type === "pending",
          "bg-gray-700": type === "cancelled",
        }
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={32}
          width={32}
          alt={label}
          className="size-8 w-fit"
        />
        <h2 className="text-[32px] font-bold text-white">{count}</h2>
      </div>
      <p className="text-[14px]">{label}</p>
    </div>
  );
};

export default StatCard;
