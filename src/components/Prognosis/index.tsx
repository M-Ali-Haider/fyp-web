"use client";
import { getLLMReport, getPrognosisById } from "@/actions/actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import CardWrapper from "../Wrapper/card";
import Image from "next/image";
import { toast } from "sonner";
import MainButton from "../Button/MainButton";
import MaxWidthWrapper from "../Wrapper/maxWidthWrapper";
import GoBack from "../goBack";

const titles = [
  "Base Interictal",
  "Base Preictal",
  "Critical Zone",
  "Difference Heatmap",
];

export type AuthErrorResponse = { message: string };

const Prognosis = ({ patient_id }: { patient_id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["prognosis", patient_id],
    queryFn: () => getPrognosisById(patient_id),
  });

  const images = data?.data;

  const reportMutation = useMutation({
    mutationFn: () => getLLMReport(patient_id),
    onSuccess: async (data) => {
      try {
        const pdfUrl = data?.report;
        const fileName = pdfUrl.split("/").pop().split("?")[0];

        const response = await fetch(pdfUrl);
        if (!response.ok) throw new Error("Failed to download PDF");

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link to trigger download
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
        toast.success("PDF downloaded successfully.");
      } catch (error) {
        const err = error as AuthErrorResponse;
        toast.error("Error downloading PDF: " + err.message);
      }
    },
    onError: (error: unknown) => {
      const err = error as AuthErrorResponse;
      toast.error(err?.message || "Login Failed");
    },
  });

  return (
    <>
      <MaxWidthWrapper className="pb-20">
        <GoBack />

        <div className="px-6 mt-[60px] grid grid-cols-1 md:grid-cols-2 gap-9">
          {isLoading ? (
            <>
              {titles.map((title, index) => (
                <CardWrapper key={index} title={title}>
                  <div className="rounded-lg bg-gray-200 animate-pulse aspect-[500/300]"></div>
                </CardWrapper>
              ))}
            </>
          ) : isError ? (
            <div>Error getting Prognosis data</div>
          ) : (
            <>
              <CardWrapper title="Base Interictal">
                <Image
                  src={images?.Baseline_interictal}
                  alt="Baseline Interictal"
                  width={500}
                  height={300}
                  className="rounded-md object-contain w-full h-auto"
                  unoptimized
                />
              </CardWrapper>
              <CardWrapper title="Base Preictal">
                <Image
                  src={images?.Baseline_preictal}
                  alt="Baseline Preictal"
                  width={500}
                  height={300}
                  className="rounded-md object-contain w-full h-auto"
                  unoptimized
                />
              </CardWrapper>
              <CardWrapper title="Critical Zone">
                <Image
                  src={images?.critical_zone}
                  alt="Critical Zone"
                  width={500}
                  height={300}
                  className="rounded-md object-contain w-full h-auto"
                  unoptimized
                />
              </CardWrapper>
              <CardWrapper title="Difference Heatmap">
                <Image
                  src={images?.diff_heatmap}
                  alt="Difference Heatmap"
                  width={500}
                  height={300}
                  className="rounded-md object-contain w-full h-auto"
                  unoptimized
                />
              </CardWrapper>
            </>
          )}
        </div>
        <div className="flex justify-center mt-9">
          <MainButton
            onClick={() => reportMutation.mutate()}
            isLoading={reportMutation.isPending}
            label="Generate LLM Report"
            className="bg-primary-blue text-white"
          />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Prognosis;
