import { auth } from "@/auth";
import MainButton from "../Button/MainButton";
import HeaderLogout from "./logout";
import NotificationsHeader from "./notifications";
import { NotificationProvider } from "@/context/GetNotifications";

const Header = async () => {
  const session = await auth();
  return (
    <header
      className="px-8 py-6 
      flex items-center justify-between 
      font-dmSans
      border-b border-primary-border"
    >
      <div className="font-bold text-primary-blue text-2xl">FYP</div>
      {session?.doctor ? (
        <div className="flex items-center gap-10">
          <NotificationProvider doctorId={session.doctor.doctor_id}>
            <NotificationsHeader />
          </NotificationProvider>
          <HeaderLogout />
        </div>
      ) : (
        <MainButton
          href="/login"
          label="Login"
          className="text-primary-blue font-medium 
          border-2 border-primary-blue"
        />
      )}
    </header>
  );
};

export default Header;
