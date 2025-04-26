'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { StyledLoginContainer, StyledMainButton } from '~/styles'
import * as motion from "motion/react-client"

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="login__title">StreamStats</h1>
        <h2 className="login__subtext">Spotify stats visulaized</h2>
        <div className='buttons__container'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <StyledMainButton className='login__button' onClick={() => signIn('spotify')}>Log in to Spotify</StyledMainButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <StyledMainButton className='demo__button' onClick={() => router.push('demo/profile')}>Demo</StyledMainButton>
          </motion.div>
        </div>
      </motion.div>
    </StyledLoginContainer>
  )
}

export default Login;
