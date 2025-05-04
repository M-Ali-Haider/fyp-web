"use client";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-3 text-primary-blue mt-[30px] cursor-pointer"
    >
      <MoveLeft /> <span>Go back</span>
    </div>
  );
};

export default GoBack;
