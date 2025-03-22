"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation, UserFormValidation } from "@/lib/validations";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/types";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdType,
  PatientFormDefaultValues,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import FileUploader from "../FileUploader";
import { uploadDoc } from "@/services/uploadServices";
import { registerPatient } from "@/services/patientServices";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { userId } = useParams();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);
    let idDocUrl = "";

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = values.identificationDocument[0];
      idDocUrl = await uploadDoc(blobFile);
    }
    try {
      const patientData = {
        ...values,
        userId,
        birthDate: new Date(values.birthDate),
        identificationDocument: idDocUrl,
      };
      //@ts-ignore
      const patient = await registerPatient(patientData);
      console.log(userId);
      console.log(patient);
      if (patient) router.push(`/patients/${userId}/new-appointment`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="text-[32px] md:text-[36px] font-bold">Welcome 🤚</h1>
          <p className="text-gray-300">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="text-[48px] md:text-[24px] font-bold">
              Personal information
            </h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            name="birthDate"
            label="Date of Birth"
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
          />
          <CustomFormField
            name="gender"
            label="Gender"
            placeholder="(555) 123-4567"
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div
                      key={option}
                      className="flex w-full items-center gap-2 rounded-md border border-dashed border-gray-500 bg-gray-950 p-3"
                    >
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            name="address"
            label="Address"
            placeholder="10th street, California"
            fieldType={FormFieldType.INPUT}
            control={form.control}
          />
          <CustomFormField
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
            fieldType={FormFieldType.INPUT}
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            name="emergencyContactName"
            label="Emergency contact name"
            placeholder="Guardians's name"
            fieldType={FormFieldType.INPUT}
            control={form.control}
          />
          <CustomFormField
            name="emergencyContactNumber"
            label="Emergency contact number"
            placeholder="(555) 123-4567"
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="text-[48px] md:text-[24px] font-bold">
              Medical information
            </h2>
          </div>
        </section>
        <CustomFormField
          name="primaryPhysician"
          label="Primary physician"
          placeholder="Select a physician"
          fieldType={FormFieldType.SELECT}
          control={form.control}
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2 ml-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-gray-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <div className="flex flex-col gap-6  xl:flex-row">
          <CustomFormField
            name="insuranceProvider"
            label="Insurance provider"
            placeholder="BlueCross BlueShield"
            fieldType={FormFieldType.INPUT}
            control={form.control}
          />
          <CustomFormField
            name="insurancePolicyNumber"
            label="Insurance policy number"
            placeholder="ABC123456789"
            fieldType={FormFieldType.INPUT}
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-6  xl:flex-row">
          <CustomFormField
            name="allergies"
            label="Allergies (if any)"
            placeholder="Penicillin"
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
          />
          <CustomFormField
            name="currentMedication"
            label="Current medication (if any)"
            placeholder="Paracetamol 500mg"
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
          />
        </div>
        <div className="flex flex-col gap-6  xl:flex-row">
          <CustomFormField
            name="familyMedicalHistory"
            label="Family medical history"
            placeholder="Mother had brain cancer, Father had heart disease"
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
          />
          <CustomFormField
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="Appendectomy Tonsillectomy"
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
          />
        </div>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="text-[48px] md:text-[24px] font-bold">
              Identification and Verification
            </h2>
          </div>
        </section>
        <CustomFormField
          name="identificationType"
          label="Identification type"
          placeholder="Select an identification type"
          fieldType={FormFieldType.SELECT}
          control={form.control}
        >
          {IdType.map((type) => (
            <SelectItem key={type} value={type}>
              <div className="flex cursor-pointer items-center gap-2 ml-2">
                {type}
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          name="identificationNumber"
          label="Identification number"
          placeholder="123456789"
          fieldType={FormFieldType.INPUT}
          control={form.control}
        />
        <CustomFormField
          name="identificationDocument"
          label="Scanned copy of identification document"
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="text-[48px] md:text-[24px] font-bold">
              Consent and Privacy
            </h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatementConsent"
          label="I consent to treatement"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
