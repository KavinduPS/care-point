"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Select, SelectContent, SelectValue } from "./ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomFormFieldProps {
  name: string;
  fieldType: FormFieldType;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldProps;
}) => {
  const {
    fieldType,
    iconSrc,
    iconAlt,
    placeholder,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-gray-500 bg-gray-950">
          {iconSrc && (
            <Image
              src={iconSrc}
              height={12}
              width={24}
              alt={iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="bg-gray-950 placeholder:text-gray-600 border-gray-100 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 !important border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className="bg-gray-950 placeholder:text-dark-600 border-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 !important;"
            disabled={props.disabled}
          ></Textarea>
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="h-11 rounded-md px-3 text-sm border bg-gray-950 placeholder:text-gray-600 border-gray-500 s !important;"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex w-full flex-1 h-11 rounded-md border border-gray-600 bg-gray-950 items-center justify-center text-gray-200">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            showTimeSelect={showTimeSelect ?? false}
            timeInputLabel="Time:"
            className="w-full h-9 bg-gray-950 text-gray-200 placeholder:text-gray-600 border-0 focus:ring-0 focus:outline-none pl-2"
            wrapperClassName="w-full overflow-hidden"
          />
        </div>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="bg-gray-950 placeholder:text-gray-600 border rounded-md border-gray-500 h-11 focus:ring-0 focus:ring-offset-0 !important;">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-gray-950 border-gray-500 !important;">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <label
              htmlFor={props.name}
              className="cursor-pointer text-sm font-medium text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, name, fieldType, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 w-full">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400 !important" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
