import Prognosis from "@/components/Prognosis";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <Prognosis patient_id={id} />;
};

export default Page;
