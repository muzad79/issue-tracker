import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions:NextAuthOptions ={
    adapter: PrismaAdapter(prisma),
  providers:[
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!
      })
  ],
//   callbacks: {
//     async redirect() {
//       // Custom redirection logic here
//       return '/'
//     }
// },
//     async signIn() {
//       // Custom redirection logic after a successful sign-in
//       return '/'
//     },
//     // async signOut() {
//     //   // Custom redirection logic after a sign-out
//     //   return '/'
//     // },
//     // Add other callback functions here as needed
//   },
  session:{
    strategy: 'jwt'
  }
}

export default authOptions