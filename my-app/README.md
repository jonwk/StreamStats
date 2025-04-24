This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Developer notes
For the Spotify API to work, you need to create a Spotify app and get the client id and secret. You can do this by following the steps in the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications).

Once you have the client id and secret, you can set them as environment variables in a `.env` file in the root directory of your project. For example:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

You can also set these variables as environment variables in your shell. For example, in a Mac or Linux terminal:

```
export SPOTIFY_CLIENT_ID=your_client_id
export SPOTIFY_CLIENT_SECRET=your_client_secret
```


Then, make sure to add the following Redirect URI to your Spotify app: `‼️ Very important for auth to work ‼️`

```
http://localhost:3000/api/auth/callback/spotify
```

For Styled Components to work with theme and global styles, look at this [blog post](https://dev.to/rashidshamloo/using-styled-components-with-nextjs-v13-typescript-2l6m)

NextAuth Spotify Refresh Token implementation: [Reddit Link](https://www.reddit.com/r/nextjs/comments/10o6aup/next_auth_spotify_reauthentication_access_token/)