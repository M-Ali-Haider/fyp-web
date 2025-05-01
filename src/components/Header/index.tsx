// import { auth } from "@/auth";
import MainButton from "../Button/MainButton";

const Header = async () => {
  //   const session = await auth();
  return (
    <header
      className="px-8 py-6 
      flex items-center justify-between 
      font-dmSans
      border-b border-primary-border"
    >
      <div className="font-bold text-primary-blue text-2xl">FYP</div>
      <MainButton
        href="/login"
        label="Login"
        className="text-primary-blue font-medium 
        border-2 border-primary-blue"
      />
    </header>
  );
};

export default Header;
