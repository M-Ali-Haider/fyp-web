"use client";
import LogoutSVG from "@/assets/logout";
import { signOut } from "next-auth/react";
import React from "react";

const HeaderLogout = () => {
  return (
    <button onClick={() => signOut()} className="cursor-pointer">
      <LogoutSVG className="size-7" />
    </button>
  );
};

export default HeaderLogout;
