'use client'
import { ThemeProvider } from 'styled-components'
import GlobalStyles from '~/styles/GlobalStyles'
import theme from '~/styles/theme'
import { LogoutButton, ScrollToTop } from "~/components"
import { useSession } from "next-auth/react"

const AuthenticatedClientLayout = ({ children }) => {
  const { data: session } = useSession()
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        {session && <LogoutButton />}
        <ScrollToTop />
        {children}
      </ThemeProvider>
    </>
  )
}

export default AuthenticatedClientLayout