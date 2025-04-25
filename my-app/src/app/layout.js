'use client';

import AuthProvider from "~/app/AuthProvider";
import StyledComponentsRegistry from '~/lib/registry'
import theme from '~/styles/theme'
import GlobalStyles from '~/styles/GlobalStyles'
import { ThemeProvider } from 'styled-components'
import { useSession } from "next-auth/react"
import { LogoutButton, ScrollToTop } from "~/components"

const AuthenticatedLayout = ({ children }) => {
  const { data: session } = useSession()
  return (
    <>
      {session && <LogoutButton />}
      <ScrollToTop />
      {children}
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='streamstas-body'>
        <AuthProvider>
          <StyledComponentsRegistry>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
              <AuthenticatedLayout>
                {children}
              </AuthenticatedLayout>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}