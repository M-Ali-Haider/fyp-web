"use client";
import { getImagesPatientById, getPatientById } from "@/actions/actions";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle, MoveLeft } from "lucide-react";
import Link from "next/link";
import CardWrapper from "../Wrapper/card";
import MaxWidthWrapper from "../Wrapper/maxWidthWrapper";
import { AreaChartComponent } from "./AreaChart";
import PatientTable, { PatientTableSkeleton } from "./PatientTable";
import PatientProfile, { PatientProfileSkeleton } from "./profile";
import Image from "next/image";
import MainButton from "../Button/MainButton";
import GoBack from "../goBack";

const Patient = ({ patient_id }: { patient_id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["patient", patient_id],
    queryFn: () => getPatientById(patient_id),
  });

  const {
    data: imagesData,
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = useQuery({
    queryKey: ["patientImages", patient_id],
    queryFn: () => getImagesPatientById(patient_id),
  });

  return (
    <MaxWidthWrapper className="pb-20">
      <GoBack />
      <div className="mt-[29px] mb-[60px] font-dmSans font-semibold text-5xl leading-[35px]">
        Patient Details
      </div>

      {isLoading ? (
        <>
          <div className="flex flex-wrap gap-9">
            <PatientProfileSkeleton />
            <CardWrapper title="Seizure Graph" className="max-w-[482px] w-full">
              <div className="h-[140px] flex items-center justify-center">
                <LoaderCircle className="animate-spin" />
              </div>
            </CardWrapper>
          </div>
          <CardWrapper className="mt-9" title="Seizure Table">
            <PatientTableSkeleton />
          </CardWrapper>
        </>
      ) : isError || !data?.patient ? (
        <div className="text-red-500 mt-4">Failed to load patient data.</div>
      ) : (
        <>
          <div className="flex flex-wrap gap-9">
            <PatientProfile {...data.patient} />
            <CardWrapper title="Seizure Graph" className="max-w-[482px] w-full">
              <AreaChartComponent data={data?.patient?.stroke_history} />
            </CardWrapper>
          </div>
          <CardWrapper className="mt-9" title="Seizure Table">
            <PatientTable data={data?.patient?.stroke_history} />
          </CardWrapper>
        </>
      )}

      {isImagesLoading ? (
        <CardWrapper title="Graphs" className="mt-9">
          <div></div>
        </CardWrapper>
      ) : isImagesError ? (
        <div className="text-red-500 mt-4">Failed to load patient graphs.</div>
      ) : (
        <>
          <CardWrapper title="Graphs" className="mt-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {imagesData.images.map(
                (img: { url: string; filename: string }, index: number) => (
                  <div
                    key={index}
                    className="relative w-full aspect-square rounded overflow-hidden shadow"
                  >
                    <Image
                      src={img.url}
                      alt={img.filename}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                )
              )}
            </div>
          </CardWrapper>
          <div className="w-full flex justify-center mt-9">
            <MainButton
              href={`/prognosis/${patient_id}`}
              label="Get Prognosis"
              className="bg-primary-blue text-white "
            />
          </div>
        </>
      )}
    </MaxWidthWrapper>
  );
};

export default Patient;
