import Image from "next/image";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import { SearchParamProps } from "@/types";
import PasskeyModal from "@/components/PasskeyModal";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}
      <section className="remove-scrollbar relative flex-1 overflow-y-auto px-[5%] my-auto">
        <div className="mx-auto max-w-[496px]">
          <Image
            src={"/assets/icons/mhs-logo-full.svg"}
            height={1500}
            width={1500}
            alt="logo"
            className="mb-10 mt-12 h-20 w-fit"
          />
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-gray-400 xl:text-left">
              © 2025 CarePoint
            </p>
            <Link href="/?admin=true" className="text-green-500 mb-4">
              Admin
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
