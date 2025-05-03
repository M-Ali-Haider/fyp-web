import NotificationSVG from "@/assets/notification";
import { auth } from "@/auth";
import Link from "next/link";
import MainButton from "../Button/MainButton";
import HeaderLogout from "./logout";

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
          <Link href={"/portal"}>
            <NotificationSVG className="size-7" />
          </Link>
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
