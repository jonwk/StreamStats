'use client'
import { useEffect, useState } from 'react'
import { getCurrentUserTopArtists } from '~/app/api/spotify'
import { catchErrors } from '~/util'
import { TopArtists } from '~/components/Pages'

const TopArtistsPage = () => {
  const [topArtists, setTopArtists] = useState()
  const [activeRange, setActiveRange] = useState('short')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const currentUserTopArtists = await getCurrentUserTopArtists(`${activeRange}_term`)
      setTopArtists(currentUserTopArtists)
      setIsLoading(false)
    }

    catchErrors(fetchData())
  }, [activeRange])

  return (
    <TopArtists
      topArtists={topArtists}
      activeRange={activeRange}
      setActiveRange={setActiveRange}
      isLoading={isLoading}
    />
  )
}

export default TopArtistsPage
