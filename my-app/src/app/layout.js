import AuthProvider from "~/app/AuthProvider";
import StyledComponentsRegistry from '~/lib/registry'
import { AuthenticatedClientLayout } from '~/components'

export const metadata = {
  title: 'StreamStats',
  description: 'Web app for visualzing personalized Spotify Stats',
  themeColor: '#1DB954',
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/favicons/site.webmanifest',
  openGraph: {
    title: 'StreamStats',
    description: 'Web app for visualzing personalized Spotify Stats',
    images: '/og.png'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StreamStats',
    description: 'Web app for visualzing personalized Spotify Stats',
    creator: '@jonwk',
    images: '/og.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='streamstas-body'>
        <AuthProvider>
          <StyledComponentsRegistry>
            <AuthenticatedClientLayout>
              {children}
            </AuthenticatedClientLayout>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}