'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession, signIn } from 'next-auth/react'
import { StyledLoginContainer, StyledMainButton } from '~/styles'
import { MotionFade } from '~/animations'

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
      <MotionFade y={20}>
        <h1 className="login__title">StreamStats</h1>
        <h2 className="login__subtext">Spotify stats visulaized</h2>
        <div className='buttons__container'>
          <MotionFade delay={0.3}>
            <StyledMainButton className='login__button' onClick={() => signIn('spotify')}>
              Log in to Spotify
            </StyledMainButton>
          </MotionFade>
          <MotionFade delay={0.5}>
            <StyledMainButton className='demo__button' onClick={() => router.push('demo/profile')}>
              Demo
            </StyledMainButton>
          </MotionFade>
        </div>
      </MotionFade>
    </StyledLoginContainer>
  )
}

export default Login
