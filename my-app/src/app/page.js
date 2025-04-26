'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { StyledLoginContainer, StyledMainButton } from '~/styles'

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
      <div className='buttons__container'>
        <StyledMainButton className='login__button' onClick={() => signIn('spotify')}>Log in to Spotify</StyledMainButton>
        <StyledMainButton className='demo__button' onClick={() => signIn('spotify')}>Demo</StyledMainButton>
      </div>
    </StyledLoginContainer>
  )
}


export default Login;
