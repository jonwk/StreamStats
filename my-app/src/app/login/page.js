'use client'
import styled from 'styled-components'
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

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>You are logged in!</p>
        <code>{JSON.stringify(session, null, 2)}</code>
      </div>
    )
  } else {
    return (
      <StyledLoginContainer>
        <StyledLoginButton onClick={() => signIn('spotify')}>Log in to Spotify</StyledLoginButton>
      </StyledLoginContainer>
    )
  }
}


export default Login
