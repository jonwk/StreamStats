'use client'
import { useEffect, useState } from 'react'
import { TopTracks } from '~/components/Pages'
import { getCurrentUserTopTracks } from '~/app/api/spotify'
import { catchErrors } from '~/util'

const TopTracksPage = () => {
  const [topTracks, setTopTracks] = useState()
  const [activeRange, setActiveRange] = useState('short')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const currentUsertopTracks= await getCurrentUserTopTracks(`${activeRange}_term`)
      setTopTracks(currentUsertopTracks)
      setIsLoading(false)
    }

    catchErrors(fetchData())
  }, [activeRange])

  return (
    <TopTracks
      topTracks={topTracks}
      activeRange={activeRange}
      setActiveRange={setActiveRange}
      isLoading={isLoading}
    />
  )
}

export default TopTracksPage