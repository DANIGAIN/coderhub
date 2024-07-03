import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import { connect } from "@/db/dbConfig";
import User from "@/modals/userModel";
import bcryptjs from 'bcryptjs'
import Role from "@/modals/roleModel";

await connect();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          const user = await User.findOne({ email });
          if (!user && !credentials?._id) {
            throw new Error("User can not exist")
          }
          const hashPassword = await bcryptjs.compare(password, user.password)
          if (!hashPassword) {
            throw new Error("Invalid password")
          }
          if(!user.isVerified){
            throw new Error("Email can not Verified")
          }

          return user
        } catch (error) {
          throw new Error(error.message)
        }
      }
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt(params) {
      try {
        const user = await User.findOne({ email: params.token.email })
        params.token.role = user.role
        params.token.uid = user._id
        return params.token;
      } catch (e) {
        return params.token;
      }
    },
    async signIn({ user }) {
      try {
        const role = await Role.findOne({ name: "Supper-Admin", isActive: true })
        const userObj = {
          name: user.name,
          email: user.email,        
          image: user.image,
          providerId: user.id,
          role: role._id,
          isVerified:true,
        };
        const existUser = await User.findOne({ email: user.email });
        if (!existUser) {
          const user = await User.create(userObj)
          return user;
        }
        return existUser

      } catch (error) {
        return false;
      }

    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user.id = token.uid
      session.user.role = token.role
      return session
    },
    async redirect({ url, baseUrl }) {
      if (new URL(url).origin != baseUrl) return url
      return baseUrl
    }
  },
  pages: {
    error: '/auth/error',
  }
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };