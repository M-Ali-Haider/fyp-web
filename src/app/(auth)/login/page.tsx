"use client";
import { login } from "@/actions/auth";
import MainButton from "@/components/Button/MainButton";
import AuthInputField from "@/components/InputField/auth";
import useFcmToken from "@/hooks/useFCMToken";
import { useMutation } from "@tanstack/react-query";
import { MoveLeft } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export type AuthErrorResponse = { error: string };

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token: webPushToken } = useFcmToken();
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: () => login(username.trim(), password.trim(), webPushToken),
    onSuccess: async (data) => {
      const { doctor_id, name, username, phone_number, total_patients } =
        data.doctor;
      await signIn("credentials", {
        redirect: false,
        doctor_id,
        name,
        username,
        phone_number,
        total_patients,
      });
      toast.success("Login Successful");
      router.replace("/portal");
    },
    onError: (error: unknown) => {
      const err = error as AuthErrorResponse;
      toast.error(err?.error || "Login Failed");
    },
  });

  const disabled = username === "" || password === "" || webPushToken === "";

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate();
        }}
        className="p-9 max-w-[566px] w-full
        border border-primary-border rounded-3xl
        bg-white
        font-dmSans"
      >
        <Link href={"/"} className="flex items-center gap-3 text-primary-blue">
          <MoveLeft /> <span>Go back</span>
        </Link>
        <div className="mt-7 text-primary-text font-semibold text-5xl">
          Login with the provided credentials
        </div>
        <div className="mt-3 text-secondary-text font-medium">
          Enter the details below to gain access to your account
        </div>
        <div className="mt-9 flex flex-col gap-6">
          <AuthInputField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="e.g Bob"
          />
          <AuthInputField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            placeholder="Password"
          />
          <MainButton
            isLoading={loginMutation.isPending}
            disabled={disabled || loginMutation.isPending}
            type="submit"
            label="Login"
            className="bg-primary-blue text-white max-w-fit"
          />
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
