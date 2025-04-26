'use client'
import { useEffect, useState } from 'react'
import { TopTracks } from '~/components/Pages'

const DemoTopTracks = () => {
  const [topTracks, setTopTracks] = useState()
  const [activeRange, setActiveRange] = useState('short')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await import(`../../demo/data/topTracks_${activeRange}_term.json`)
        setTopTracks(data.default)
      } catch (error) {
        console.error('Error loading demo data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [activeRange])

  return (
    <TopTracks
      topTracks={topTracks}
      activeRange={activeRange}
      setActiveRange={setActiveRange}
      isLoading={isLoading}
      isDemo={true}
    />
  )
}

export default DemoTopTracks