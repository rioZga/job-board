import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "user" | "company";
    } & DefaultSession;
  }

  interface User extends DefaultUser {
    role: "user" | "company";
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: "user" | "company";
    id: string;
  }
}
