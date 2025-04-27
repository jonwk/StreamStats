'use client'
import { useEffect, useState } from 'react'
import { Playlists } from '~/components/Pages'

const DemoPlaylists = () => {
  const [playlists, setPlaylists] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const data = await import('~/app/demo/data/allPlaylists.json')
        setPlaylists(data.default)
      } catch (error) {
        console.error('Error loading demo data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Playlists
      playlists={playlists}
      isLoading={isLoading}
      isDemo={true}
    />
  )
}

export default DemoPlaylists