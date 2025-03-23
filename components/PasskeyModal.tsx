"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const [passkey, setPasskey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessKey")
      : null;

  useEffect(() => {
    const accessKey = encryptedKey && decryptKey(encryptedKey);
    if (path) {
      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY?.toString()) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true);
      }
    }
  }, [encryptedKey]);

  const handleModalClose = () => {
    setOpen(false);
    router.push("/");
  };

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accessKey", encryptedKey);
      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="space-y-5 bg-gray-950 border-gray-600 outline-none !important">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Admin access verification
            <Image
              className="cursor-pointer"
              src="/assets/icons/close.svg"
              height={20}
              width={20}
              alt="close"
              onClick={() => handleModalClose()}
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="w-full flex justify-between !important">
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-500 rounded-lg size-16 gap-4 !important"
                index={0}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-500 rounded-lg size-16 gap-4 !important"
                index={1}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-500 rounded-lg size-16 gap-4 !important"
                index={2}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-500 rounded-lg size-16 gap-4 !important"
                index={3}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-500 rounded-lg size-16 gap-4 !important"
                index={4}
              />
              <InputOTPSlot
                className="text-[36px] font-bold justify-center flex border border-gray-500 rounded-lg size-16 gap-4 !important"
                index={5}
              />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="text-red-400 text-[14px] mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={(e) => validatePasskey(e)}
            className="bg-green-500 text-white w-full cursor-pointer"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PasskeyModal;
