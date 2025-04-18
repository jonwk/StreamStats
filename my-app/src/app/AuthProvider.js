'use client'
import React from 'react';
import { SessionProvider } from "next-auth/react"

function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default AuthProvider;