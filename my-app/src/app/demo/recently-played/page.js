'use client'
import { useEffect, useState } from 'react'
import { RecentlyPlayed } from '~/components/Pages'

const DemoRecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await import('~/app/demo/data/userRecentlyPlayed.json')
        setRecentlyPlayed(data.default)
      } catch (error) {
        console.error('Error loading demo data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <RecentlyPlayed
      recentlyPlayed={recentlyPlayed}
      isLoading={isLoading}
      isDemo={true}
    />
  )
}

export default DemoRecentlyPlayed