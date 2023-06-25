// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOption = {
//   // Configure one or more authentication providers
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     // ...add more providers here
//   ],
//   pages: {
//     signIn: "/sign-in",
//   },
// };

// const handler = NextAuth(authOption)
// export { handler as GET, handler as POST };

import axios from 'axios';
import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

const options = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    // Add more providers as needed
  ],
  pages: {
        signIn: "/sign-in",
      },
  callbacks: {
    async jwt(token, user, account) {
      console.log(token, user)
      if (user) {
        token.email = user.email; // Add the user's email to the JWT token
      }
      return token;
    },

    async signIn(user, account, profile) {
      const idToken = process.env.GOOGLE_CLIENT_ID;
      try {
        const userData = {
          email: user.email,

        };
        // Send the user data to your backend
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/google-sign-in`, idToken, userData);
      } catch (error) {
        console.error("Error sending user data:", error);
        // Handle the error as needed
      }
      
      return true; // Continue the sign-in process
    },
  },
};

export default (req, res) => NextAuth(req, res, options);