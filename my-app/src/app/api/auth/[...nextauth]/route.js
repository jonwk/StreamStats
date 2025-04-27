import NextAuth from 'next-auth/next'
import SpotifyProvider from 'next-auth/providers/spotify'

const SPOTIFY_REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET

const refreshAccessToken = async (token) => {
  try {
    const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      'base64'
    )
    const response = await fetch(SPOTIFY_REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      })
    })

    const data = await response.json()
    
    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
    }
  } catch (error) {
    console.log('auth/callback/spotify error', error)
    return {
      ...token,
      error: `RefreshAccessTokenError: ${error.message}`,
    }
  }
}

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
      clientId: CLIENT_ID || '',
      clientSecret: CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at * 1000,
          user
        }
      }
      if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
        return token
      }
      const newToken = await refreshAccessToken(token)
      return newToken
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken
      session.error = token.error
      session.user = token.user
      return session
    },
  }
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }


