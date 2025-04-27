'use client'
import { useEffect, useState } from 'react'
import { RecentlyPlayed } from '~/components/Pages'
import { getRecentlyPlayed } from '~/app/api/spotify'
import { catchErrors } from '~/util'

const RecentlyPlayedPage = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const userRecentlyPlayed = await getRecentlyPlayed()
      setRecentlyPlayed(userRecentlyPlayed)
      setIsLoading(false)
    }

    catchErrors(fetchData())
  }, [])

  return (
    <RecentlyPlayed
      recentlyPlayed={recentlyPlayed}
      isLoading={isLoading}
    />
  )
}

export default RecentlyPlayedPage