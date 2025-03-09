"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validations";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      // const userData = {name, email, phone};
      // const user = await createUser(userData);
      // if(user) router.push(`/patients/${user.id}/register`)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="text-[32px] md:text-[36px] font-bold">Hi there 🤚</h1>
          <p className="text-gray-300">Schedule your appointment</p>
        </section>
        <CustomFormField
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user-login.svg"
          iconAlt="user"
          fieldType={FormFieldType.INPUT}
          control={form.control}
        />
        <CustomFormField
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/user-email.svg"
          iconAlt="email"
          fieldType={FormFieldType.INPUT}
          control={form.control}
        />
        <CustomFormField
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
