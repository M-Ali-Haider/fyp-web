"use client";

import firebaseApp from "@/firebase";
import useFcmToken from "@/hooks/useFCMToken";
import { getMessaging, onMessage } from "firebase/messaging";
import { ReactNode, useEffect } from "react";

export default function FcmTokenProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { notificationPermissionStatus } = useFcmToken();

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (notificationPermissionStatus === "granted") {
        const messaging = getMessaging(firebaseApp);
        const unsubscribe = onMessage(messaging, (payload) =>
          console.log("Foreground push notification received:", payload)
        );
        return () => {
          unsubscribe(); // Unsubscribe from the onMessage event on cleanup
        };
      }
    }
  }, [notificationPermissionStatus]);

  return <>{children}</>;
}
