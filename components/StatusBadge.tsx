import { StatusIcon } from "@/constants";
import { Status } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <div
      className={clsx("flex w-fit items-center gap-2 rounded-full px-4 py-2", {
        "bg-green-600": status === "scheduled",
        "bg-blue-600": status === "pending",
        "bg-red-600": status === "cancelled",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="status"
        width={24}
        height={24}
        className="h-ft w-3"
      />
      <p
        className={clsx("text-[12px] capitalize font-semibold", {
          "text-green-200": status === "scheduled",
          "text-blue-200": status === "pending",
          "text-red-200": status === "cancelled",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
