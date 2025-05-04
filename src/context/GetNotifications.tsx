"use client";

import firebaseApp from "@/firebase";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type NotificationInterface = {
  id: string;
  read: boolean;
  patient_id: string;
  body: string;
  title: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
};

type NotificationContextType = {
  notifications: NotificationInterface[];
  isLoading: boolean;
  error: string | null;
};

export const db = getFirestore(firebaseApp);

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotificationsContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotificationsContext must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({
  children,
  doctorId,
}: {
  children: ReactNode;
  doctorId: string;
}) => {
  const [notifications, setNotifications] = useState<NotificationInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) return;

    const q = query(
      collection(db, `doctors/${doctorId}/notifications`),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<NotificationInterface, "id">),
        }));
        setNotifications(docs);
        setIsLoading(false);
      },
      (err) => {
        console.error("Error fetching notifications:", err);
        setError(err.message);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [doctorId]);

  return (
    <NotificationContext.Provider value={{ notifications, isLoading, error }}>
      {children}
    </NotificationContext.Provider>
  );
};
