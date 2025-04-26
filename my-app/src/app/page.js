'use client'
import styled from 'styled-components'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  
  h1.login__title {
    font-size: clamp(4rem, 10vw, 5.5rem);
    font-weight: 900;
    line-height: 1;
    margin: 0 0 var(--spacing-xs) 0;

    @media (min-width: 768px) {
      margin: 0 0 var(--spacing-xs) -5px;
    }
  } 
  
  h2.login__subtext {
    font-size: 4/3rem;
    letter-spacing: normal;
    color: var(--light-grey);
    line-height: 1;
    margin: -15px 0 var(--spacing-sm) 0;

    @media (min-width: 768px) {
      margin: -15px 0 var(--spacing-md) -5px;
      font-size: var(--fz-xl);
    }
  }
`

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const StyledLoginButton = styled.button`
  display: inline-block;
  background-color: var(--green);
  color: var(--white);
  border-radius: var(--border-radius-pill);
  border: 2px solid var(--green);
  font-weight: 700;
  font-size: var(--fz-lg);
  padding: var(--spacing-sm) var(--spacing-xl);
  
  @media (min-width: 768px) {
    margin-right: var(--spacing-sm);
  }

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
  
  @media (min-width: 768px) {
    margin-right: var(--spacing-sm);
  }

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
      <h1 className="login__title">StreamStats</h1>
      <h2 className="login__subtext">Spotify stats visulaized</h2>
      <StyledButtonsContainer>
        <StyledLoginButton onClick={() => signIn('spotify')}>Log in to Spotify</StyledLoginButton>
        <StyledDemoButton onClick={() => signIn('spotify')}>Demo</StyledDemoButton>
      </StyledButtonsContainer>
    </StyledLoginContainer>
  )
}


export default Login;
