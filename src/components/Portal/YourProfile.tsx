import Image from "next/image";
import React from "react";
import CardWrapper from "../Wrapper/card";

export interface YourProfileInterface {
  name: string;
  doctor_id: string;
  phone_number: string;
  total_patients: string;
}

const YourProfile = ({
  name,
  doctor_id,
  phone_number,
  total_patients,
}: YourProfileInterface) => {
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
          <YourProfileInfo label="Name" value={`Dr. ${name}`} />
          <YourProfileInfo label="Doctor ID" value={doctor_id} />
          <YourProfileInfo label="Phone Number" value={phone_number} />
          <YourProfileInfo label="Total Patients" value={total_patients} />
        </div>
      </div>
    </CardWrapper>
  );
};

export default YourProfile;

const YourProfileInfo = ({
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
