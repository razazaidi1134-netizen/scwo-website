import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from './mongodb';
import { User } from '../models/User';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user || !user.isActive) throw new Error('Invalid credentials');
        const isMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        return {
          id:    user._id.toString(),
          email: user.email,
          name:  user.name,
          role:  user.role,
        };
      },
    }),
  ],
  session: { strategy: 'jwt', maxAge: 30 * 24 * 60 * 60 },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id   = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id   = token.id;
      }
      return session;
    },
  },
  // ← REMOVED pages: { signIn: '/admin/login' }
  // That line was causing NextAuth to redirect every unauthenticated
  // request back to /admin/login, creating an infinite loop.
  secret: process.env.NEXTAUTH_SECRET || 'scwo-secret-key-2024',
};