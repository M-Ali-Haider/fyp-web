import { auth } from "@/auth";
import AllPatients from "@/components/Portal/AllPatients";
import YourProfile from "@/components/Portal/YourProfile";
import CardWrapper from "@/components/Wrapper/card";
import MaxWidthWrapper from "@/components/Wrapper/maxWidthWrapper";

const Page = async () => {
  const session = await auth();
  const { doctor_id, name, phone_number, total_patients } = session!.doctor;
  return (
    <MaxWidthWrapper className="pb-20">
      <div className="mt-[87px] mb-[63px] font-dmSans font-semibold text-5xl leading-[35px]">
        Hey, Doctor Ali
      </div>
      <div className="flex flex-wrap gap-9">
        <YourProfile
          name={name}
          phone_number={phone_number}
          doctor_id={doctor_id}
          total_patients={total_patients}
        />
        <CardWrapper
          className="max-w-[484px] w-full min-w-[250px]"
          title="Notifications"
        >
          <div className="flex flex-col max-h-[132px] overflow-y-scroll"></div>
        </CardWrapper>
      </div>
      <AllPatients />
    </MaxWidthWrapper>
  );
};

export default Page;
