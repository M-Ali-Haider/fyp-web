"use client";
import React from "react";
import CardWrapper from "../Wrapper/card";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNotificationsContext } from "@/context/GetNotifications";

dayjs.extend(relativeTime);

const NotificationsBox = () => {
  const { notifications, isLoading } = useNotificationsContext();
  const regex = /Patient\s(.+?)\srequires attention/;

  return (
    <CardWrapper
      className="max-w-[484px] w-full min-w-[250px]"
      title="Notifications"
    >
      {isLoading ? (
        <NotificationBoxSkeleton />
      ) : (
        <div className="flex flex-col gap-3 max-h-[132px] overflow-y-auto no-scrollbar">
          {notifications?.map((item, index) => {
            const name = item.body.match(regex);
            const timestamp = dayjs.unix(item.timestamp.seconds);
            const timeAgo = dayjs().to(timestamp);

            // Custom minimalistic format
            const minimalTimeAgo = timeAgo
              .replace(/second(s?)/g, "s")
              .replace(/minute(s?)/g, "m")
              .replace(/hour(s?)/g, "h")
              .replace(/day(s?)/g, "d")
              .replace(/week(s?)/g, "w")
              .replace(/month(s?)/g, "mo")
              .replace(/year(s?)/g, "y");

            return (
              <div key={index} className={`flex items-center justify-between`}>
                <div className="flex items-center gap-4">
                  <div className={`rounded-full size-9 bg-primary-blue`} />
                  <div>
                    <div className="font-bold text-noti-text text-sm leading-[20px] text-center">
                      {name?.[1]}
                    </div>
                    <div className="font-medium font-noto-sans text-xs leading-[16px]">
                      <span className="text-secondary-text text-center">
                        Patient ID:&nbsp;
                      </span>
                      <span className="text-dark-gray text-center">
                        {item.patient_id.slice(0, 5)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-[2.5px] font-inter font-medium">
                  {!item.read && (
                    <span className="text-green-textbh bg-green-bg py-1 px-2 rounded-full text-xs text-center">
                      Requires Attention
                    </span>
                  )}
                  <span className="px-2 py-1 rounded-full text-xs bg-gray-bg text-secondary-text text-center">
                    {minimalTimeAgo}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </CardWrapper>
  );
};

export default NotificationsBox;

const NotificationBoxSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 max-h-[132px] overflow-y-auto no-scrollbar">
      {[...Array(3)]?.map((_, index) => {
        return (
          <div key={index} className={`flex items-center justify-between`}>
            <div className="flex items-center gap-4">
              <div className={`rounded-full size-9 bg-primary-blue`} />
              <div>
                <div className="font-bold text-transparent bg-gray-200 animate-pulse rounded-full text-sm leading-[20px] text-center">
                  Abdullah Khalil
                </div>
                <div className="mt-0.5 font-medium font-noto-sans text-xs leading-[16px]">
                  <span className="text-transparent bg-gray-200 animate-pulse rounded-full text-center">
                    Patient ID:&nbsp;
                  </span>
                  <span className="text-transparent bg-gray-200 animate-pulse rounded-full text-center">
                    33333
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[2.5px] font-inter font-medium">
              <span className="text-transparent bg-gray-200 animate-pulse rounded-full py-1 px-2 text-xs text-center">
                Requires Attention
              </span>
              <span className="px-2 py-1 text-xs text-transparent bg-gray-200 animate-pulse rounded-full text-center">
                1 min ago
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
