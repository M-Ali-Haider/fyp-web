"use client";
import NotificationSVG from "@/assets/notification";
import { useNotificationsContext } from "@/context/GetNotifications";
import Link from "next/link";

const NotificationsHeader = () => {
  const { notifications } = useNotificationsContext();
  const unreadNotificationsCount = notifications.filter(
    (notification) => !notification.read
  ).length;
  return (
    <Link href={"/portal"} className="relative">
      <div className="absolute size-4  -top-0.5 right-0 bg-red-500 text-white text-[8px] rounded-full flex items-center justify-center">
        {unreadNotificationsCount}
      </div>
      <NotificationSVG className="size-7" />
    </Link>
  );
};

export default NotificationsHeader;
