import { auth } from "@/auth";
import MainButton from "@/components/Button/MainButton";
import Card from "@/components/Homepage/card";

export default async function Home() {
  const session = await auth();
  return (
    <>
      <main className="mt-24 flex flex-col items-center">
        <div
          className="max-w-[928px] 
          font-medium text-dark-blue text-[64px] text-center"
        >
          Stay Ahead of Seizures with AI-Powered Predictions.
        </div>
        <div className="mt-3 text-secondary-text text-center">
          Empowering users with early detection, real-time insights, and smarter
          healthcare decisions.
        </div>
        <MainButton
          className="mt-9 text-white bg-primary-blue"
          label={session?.doctor ? "Back to portal" : `Login to get access`}
          href="/login"
        />
        <div className="mt-32 overflow-hidden relative px-[50px] w-full pt-10">
          <div className="relative flex justify-center">
            <Card className="absolute -rotate-12 -translate-x-[550px] translate-y-32" />
            <Card className="absolute z-[9] -rotate-6 -translate-x-[275px] translate-y-14" />
            <Card
              label="AI-Powered Seizure Prediction"
              className="relative z-10"
            />
            <Card className="absolute z-[9] rotate-6 translate-x-[275px] translate-y-14" />
            <Card className="absolute rotate-12 translate-x-[550px] translate-y-32" />
          </div>
        </div>
      </main>
    </>
  );
}
