import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MainButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  label: string;
  href?: string;
}

const MainButton: React.FC<MainButtonProps> = ({
  className,
  isLoading = false,
  label,
  href,
  ...props
}) => {
  return (
    <>
      {href ? (
        <Link
          className={cn(
            `block px-7 py-4 rounded-full active:scale-90 transition-all duration-300`,
            className
          )}
          href={href}
        >
          {label}
        </Link>
      ) : (
        <button
          className={cn(
            `px-7 py-4 rounded-full cursor-pointer active:scale-90 transition-all duration-300`,
            className
          )}
          {...props}
        >
          {isLoading ? <LoaderCircle className="animate-spin" /> : label}
        </button>
      )}
    </>
  );
};

export default MainButton;
