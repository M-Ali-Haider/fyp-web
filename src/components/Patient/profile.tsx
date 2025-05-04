import Image from "next/image";
import React from "react";
import CardWrapper from "../Wrapper/card";

export interface PatientProfileInterface {
  name: string;
  patient_id: string;
  phone_number: string;
  email: string;
}

const PatientProfile = ({
  name,
  patient_id,
  phone_number,
  email,
}: PatientProfileInterface) => {
  return (
    <CardWrapper className="flex-1" title="Your Profile">
      <div className="flex items-center gap-6">
        <div className="relative size-[140px] bg-gray-300 overflow-hidden rounded-xl">
          <Image
            src={"/userplaceholder.webp"}
            alt="Doctor pfp"
            className="object-cover"
            fill
            priority
            sizes="400px"
            quality={100}
          />
        </div>
        <div className="font-dmSans">
          <PatientProfileInfo label="Patient Name" value={name} />
          <PatientProfileInfo label="Patient ID" value={patient_id} />
          <PatientProfileInfo label="Phone Number" value={phone_number} />
          <PatientProfileInfo label="Email" value={email} />
        </div>
      </div>
    </CardWrapper>
  );
};

export default PatientProfile;

const PatientProfileInfo = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="h-[35px] font-bold text-dark-gray flex items-center gap-3">
      <span className="text-secondary-text font-semibold">{label}:</span>
      <span>&nbsp;{value}</span>
    </div>
  );
};

export const PatientProfileSkeleton = () => {
  return (
    <CardWrapper className="flex-1" title="Your Profile">
      <div className="flex items-center gap-6">
        <div className="relative size-[140px] bg-gray-300 animate-pulse overflow-hidden rounded-xl" />
        <div className="font-dmSans">
          <PatientProfileInfoSkeleton
            label="Patient Name"
            value={"Hamza Farooq"}
          />
          <PatientProfileInfoSkeleton label="Patient ID" value={"34234"} />
          <PatientProfileInfoSkeleton
            label="Phone Number"
            value={"03205657368"}
          />
          <PatientProfileInfoSkeleton
            label="Email"
            value={"example@gmail.com"}
          />
        </div>
      </div>
    </CardWrapper>
  );
};

const PatientProfileInfoSkeleton = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="h-[35px] font-bold text-dark-gray flex items-center gap-3">
      <span className="text-transparent bg-gray-200 animate-pulse rounded-full font-semibold">
        {label}:
      </span>
      <span className="text-transparent bg-gray-200 rounded-full animate-pulse">
        &nbsp;{value}
      </span>
    </div>
  );
};
