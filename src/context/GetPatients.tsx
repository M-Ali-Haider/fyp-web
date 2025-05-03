"use client";

import firebaseApp from "@/firebase";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

// Types
export type Patient = {
  id: string;
  [key: string]: string;
};

type PatientContextType = {
  data: {
    patients: Patient[];
    total_patients: number;
  };
  isLoading: boolean;
  error: Error | null;
};

const db = getFirestore(firebaseApp);

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export const usePatients = (): PatientContextType => {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatients must be used within a PatientProvider");
  }
  return context;
};

export const PatientProvider = ({
  children,
  doctor_id,
}: {
  children: ReactNode;
  doctor_id: string;
}) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!doctor_id) return;

    // Reference to the Firestore collection
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("doctor_id", "==", doctor_id));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const patientList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPatients(patientList);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching patients:", err);
        setError(err);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [doctor_id]);
  return (
    <PatientContext.Provider
      value={{
        data: { patients, total_patients: patients.length },
        isLoading,
        error,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
};
