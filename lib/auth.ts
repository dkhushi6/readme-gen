import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: { params: { scope: "read:user repo" } }, // include 'repo' to access private repos
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // store access token in JWT
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // expose token to the client session
      session.user.accessToken = token.accessToken as string;
      return session;
    },
  },
});
