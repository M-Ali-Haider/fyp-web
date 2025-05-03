import { getDoctorPatients } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";

export const useGetPatients = (doctor_id: string) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["doctorPatients", doctor_id],
    queryFn: () => getDoctorPatients(doctor_id),
    enabled: !!doctor_id,
  });
  return { data, error, isLoading, isError };
};
