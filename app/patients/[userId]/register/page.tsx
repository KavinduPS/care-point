import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/services/patientServices";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const RegisterPage = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  console.log(user);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto max-w-[496px]">
          <Image
            src={"/assets/icons/mhs-logo-full.svg"}
            height={1500}
            width={1500}
            alt="logo"
            className="mb-6 mt-12 h-20 w-fit"
          />
          {user && <RegisterForm user={user} />}
          <p className="justify-items-end text-gray-400 xl:text-left py-12">
            © 2025 CarePoint
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
