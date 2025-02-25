import type { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      ghanaCardNumber: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    ghanaCardNumber: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    ghanaCardNumber: string
    role: string
  }
}

