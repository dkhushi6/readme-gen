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
      if (account) {
        token.accessToken = account.access_token;

        // fetch GitHub username
        const res = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${account.access_token}`,
          },
        });
        const profile = await res.json();
        token.username = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string; // TS now knows it exists
      session.user.username = token.username as string;
      return session;
    },
  },
});
