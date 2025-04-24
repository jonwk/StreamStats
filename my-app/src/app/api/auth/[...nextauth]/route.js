import NextAuth from "next-auth/next";
import SpotifyProvider from 'next-auth/providers/spotify';

const scope = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
  'playlist-read-private',
].join(' ')

const options = {
  providers: [
    SpotifyProvider({
      authorization: {
        params: { scope }
      },
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.access_token = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        token
      };
    },
  }
}

const handler = NextAuth(options);

export { handler as GET, handler as POST };


