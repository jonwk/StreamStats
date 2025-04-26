import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

/**
 * Custom hook for handling authentication errors
 * @returns {Function} Function to handle authentication errors
 */
const useLogoutOnError = () => { 
  const router = useRouter()

  return async () => {
    const session = await getSession()
    if (!session) {
      signOut({callbackUrl: '/'})
      router.push('/')
    }
  }
}

export default useLogoutOnError