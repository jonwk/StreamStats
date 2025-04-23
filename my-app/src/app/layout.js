'use client';

import { Inter } from "next/font/google";
import AuthProvider from "./AuthProvider";
import StyledComponentsRegistry from '../lib/registry'
import theme from '../styles/theme'
import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <StyledComponentsRegistry>
            <GlobalStyle />
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </StyledComponentsRegistry>
        </AuthProvider>
      </body>
    </html>
  );
}