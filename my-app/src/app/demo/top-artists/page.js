'use client'
import { useEffect, useState } from 'react'
import { TopArtists } from '~/components/Pages'

const DemoTopArtistsPage = () => {
  const [topArtists, setTopArtists] = useState()
  const [activeRange, setActiveRange] = useState('short')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await import(`~/app/demo/data/topArtists_${activeRange}_term.json`)
        setTopArtists(data.default)
      } catch (error) {
        console.error('Error loading demo data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
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

export default DemoTopArtistsPage