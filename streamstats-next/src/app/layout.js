import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyle } from '@/styles/GlobalStyle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StreamStats',
  description: 'Visualize your Spotify stats',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}