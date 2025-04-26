'use client'
import styled from 'styled-components'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const StyledLoginButton = styled.button`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    filter: brightness(1.1);
  }
`
const StyledDemoButton = styled.button`
  display: inline-block;
  color: var(--green);
  border: 2px solid var(--green);
  border-radius: var(--border-radius-pill);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);

  &:hover,
  &:focus {
    text-decoration: none;
    color: var(--black);
    background-color: var(--white);
    border-color: transparent;
    filter: brightness(1.1);
  }
`

const Login = () => {
  const router = useRouter()
  const { data: session } = useSession()
  useEffect(() => {
    if (session && !session.error) {
      router.push('/profile')
    }
  }, [session])

  return (
    <StyledLoginContainer>
      <StyledLoginButton onClick={() => signIn('spotify')}>Log in to Spotify</StyledLoginButton>
      <StyledDemoButton onClick={() => signIn('spotify')}>Demo</StyledDemoButton>
    </StyledLoginContainer>
  )
}


export default Login;
