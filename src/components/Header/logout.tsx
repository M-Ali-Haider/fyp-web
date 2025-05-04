"use client";
import LogoutSVG from "@/assets/logout";
import { signOut } from "next-auth/react";
import React from "react";

const HeaderLogout = () => {
  return (
    <button
      onClick={() => signOut()}
      className="cursor-pointer hover:scale-95 active:scale-75 duration-300 transition-all"
    >
      <LogoutSVG className="size-7" />
    </button>
  );
};

export default HeaderLogout;
