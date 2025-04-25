'use client'
import styled from 'styled-components'
import { signOut } from "next-auth/react";

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`

const LogoutButton = () => {
  return (
    <StyledLogoutButton onClick={() => signOut({callbackUrl: '/'})}>
      Log Out
    </StyledLogoutButton>
  )
}

export default LogoutButton