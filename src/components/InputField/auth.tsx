import { cn } from "@/lib/utils";
import React, { InputHTMLAttributes } from "react";

interface AuthInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  className?: string;
}

const AuthInputField = ({
  label,
  id,
  className,
  ...props
}: AuthInputFieldProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="font-medium">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={cn(
          `border border-primary-border p-6 rounded-[12px]
          placeholder:text-placeholder`,
          className
        )}
      />
    </div>
  );
};

export default AuthInputField;
