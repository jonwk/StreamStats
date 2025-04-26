'use client'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from '~/styles'
import { LogoutButton, ScrollToTop } from "~/components"
import { useSession } from "next-auth/react"
import { usePathname } from 'next/navigation'

const AuthenticatedClientLayout = ({ children }) => {
  const { data: session } = useSession()
  const pathname = usePathname()
  const isDemo = pathname?.startsWith('/demo')

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={theme}>
        {(session || isDemo) && <LogoutButton />}
        <ScrollToTop />
        {children}
      </ThemeProvider>
    </>
  )
}

export default AuthenticatedClientLayout