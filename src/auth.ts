import NextAuth, { CredentialsSignin, Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

export class InvalidLoginError extends CredentialsSignin {
  code = "custom";
  constructor(message: string) {
    super(message);
    this.code = message;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        doctor_id: { label: "Doctor ID", type: "text" },
        name: { label: "Name", type: "text" },
        username: { label: "Username", type: "text" },
        phone_number: { label: "Phone Number", type: "text" },
        total_patients: { label: "Total Patients", type: "text" },
      },
      async authorize(credentials) {
        const { doctor_id, name, username, phone_number, total_patients } =
          credentials ?? {};

        if (
          !doctor_id ||
          !name ||
          !username ||
          !phone_number ||
          !total_patients
        ) {
          return null;
        }

        // Type assertion here ensures you're returning a valid User
        return {
          doctor_id: doctor_id as string,
          name: name as string,
          username: username as string,
          phone_number: phone_number as string,
          total_patients: total_patients as string,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.doctor_id) {
        token.doctor_id = user.doctor_id;
        token.name = user.name;
        token.username = user.username;
        token.phone_number = user.phone_number;
        token.total_patients = user.total_patients;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.doctor = {
        doctor_id: token.doctor_id,
        name: token.name,
        username: token.username,
        phone_number: token.phone_number,
        total_patients: token.total_patients,
      };
      return session;
    },
  },
});
