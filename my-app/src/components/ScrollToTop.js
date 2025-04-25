import { useEffect } from 'react'
import { useRouter } from "next/navigation"

const ScrollToTop = () => {
  const router = useRouter()
  const { pathname } = router

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
export default ScrollToTop