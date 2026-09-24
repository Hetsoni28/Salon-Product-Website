"use client";

import React from "react";
import { Input, type InputProps } from "@/components/atoms";

export interface FormFieldProps extends Omit<InputProps, "label" | "hint"> {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  error,
  required,
  value,
  onChange,
  className = "",
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        aria-invalid={!!error}
        {...rest}
      />
    </div>
  );
};

export default FormField;
