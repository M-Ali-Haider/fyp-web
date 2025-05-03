import { auth } from "@/auth";
import { PatientProvider } from "@/context/GetPatients";
import { redirect } from "next/navigation";

export default async function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session?.doctor) return redirect("/login");
  return (
    <PatientProvider doctor_id={session.doctor.doctor_id}>
      {children}
    </PatientProvider>
  );
}
