import clsx from "clsx";
import { Input } from "../ui/input";
import React, { type InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string;
  placeholder?: string;
  className?: string;
  Icon?: React.ElementType; // Allow passing a custom icon component
}

function FormInput({
  error,
  placeholder,
  className,
  Icon, // Default to Input icon if no icon is provided
  ...props
}: FormInputProps) {
  return (
    <div
      className={clsx(
        "flex items-center w-full border rounded-md px-2 transition-all",
        error
          ? "border-error border-2 focus-visible:border-error focus-visible:ring-error/50"
          : "focus-visible:border-primary focus-visible:ring-2 focus-within:shadow-input transition-colors"
      )}
    >
      <div className="relative flex gap-1 items-center w-full">
        {Icon && <Icon className="size-4" />}
        <Input
          placeholder={placeholder}
          autoComplete="off"
          className={clsx(
            className,
            "flex-1 border-0 bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:border-0 py-4"
          )}
          {...props}
        />
        {error && <p className="text-error text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}

export default FormInput;
