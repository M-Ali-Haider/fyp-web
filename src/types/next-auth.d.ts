import "next-auth";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//   }

//   interface User {
//     token?: string;
//   }
// }

declare module "next-auth" {
  interface Session {
    doctor: {
      doctor_id: string;
      name: string;
      phone_number: string;
      username: string;
      total_patients: string;
    };
  }

  interface User {
    doctor_id: string;
    name: string;
    phone_number: string;
    username: string;
    total_patients: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    doctor_id: string;
    name: string;
    phone_number: string;
    username: string;
    total_patients: string;
  }
}
