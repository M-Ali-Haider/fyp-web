import Patient from "@/components/Patient";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <Patient patient_id={id} />;
};

export default Page;
