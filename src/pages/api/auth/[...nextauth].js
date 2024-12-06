import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  // Configure one or more authentication providers
  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace this with your own logic to validate the credentials
        // For example, you can query your database to find the user
        const user = await authenticateUser(
          credentials.username,
          credentials.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },
};

async function authenticateUser(username, password) {
  // Replace this with your own logic to authenticate the user
  // For example, you can query your database to find the user
  if (username === "admin" && password === "admin") {
    return { id: 1, name: "John Doe", email: "johndoe@mail.com" };
  }
  return null;
}

export default NextAuth(authOptions);
