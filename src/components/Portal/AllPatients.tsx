"use client";

import { usePatients } from "@/context/GetPatients";
import CardWrapper from "../Wrapper/card";
import PatientsTable from "./PatientsTable";
import TableSkeleton from "./TableSkeleton";

const AllPatients = () => {
  const { data, error, isLoading } = usePatients();

  return (
    <CardWrapper className="mt-9 overflow-x-auto" title="All Patients">
      {isLoading && <TableSkeleton />}

      {error && (
        <div className="text-red-500">
          Error loading patients: {error.message}
        </div>
      )}

      {!isLoading && !error && data.patients.length === 0 && (
        <div>No patients found.</div>
      )}

      {!isLoading && !error && <PatientsTable data={data.patients} />}
    </CardWrapper>
  );
};

export default AllPatients;
