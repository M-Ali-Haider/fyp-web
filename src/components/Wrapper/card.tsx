import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const CardWrapper = ({
  className,
  children,
  title,
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) => {
  return (
    <div
      className={cn(
        `p-6 rounded-3xl border border-primary-border bg-white`,
        className
      )}
    >
      {title && (
        <div className="mb-9 text-[32px] leading-[35px] font-semibold font-dmSans">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default CardWrapper;
