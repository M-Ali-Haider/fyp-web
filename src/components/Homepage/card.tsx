import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Card = ({
  className,
  label = "Real-Time Monitoring",
}: {
  className?: string;
  label?: string;
}) => {
  return (
    <div className={cn(`max-w-[322px] w-full aspect-[322/321]`, className)}>
      <div className="relative size-full bg-white rounded-[12px] border border-primary-border flex justify-center">
        <Image
          src={"/card.png"}
          fill
          priority
          quality={100}
          className="object-contain rounded-[12px]"
          alt="card image"
        />
        <div className="absolute bg-white h-[40px] flex items-center justify-center -top-5 border border-primary-border text-center text-secondary-text font-inter px-6 rounded-full">
          {label}
        </div>
      </div>
    </div>
  );
};

export default Card;
