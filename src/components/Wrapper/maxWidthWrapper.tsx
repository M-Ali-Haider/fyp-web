import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div className="w-full flex justify-center px-6">
      <div className={cn(`max-w-[1120px] w-full`, className)}>{children}</div>
    </div>
  );
};

export default MaxWidthWrapper;
