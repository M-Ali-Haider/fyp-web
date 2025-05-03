import { auth } from "@/auth";
import FcmTokenProvider from "@/providers/firebase-foreground";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session?.doctor) return redirect("/portal");
  return <FcmTokenProvider>{children}</FcmTokenProvider>;
};

export default AuthLayout;
