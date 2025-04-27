'use client'
import { useEffect, useState } from 'react'
import { Playlist } from '~/components/Pages'

const DemoPlaylist = () => {
  const [data, setData] = useState({
    playlist: null,
    tracksForTracklist: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [samplePlaylist, sampleTrackList] = await Promise.all([
          import('~/app/demo/data/samplePlaylist.json'),
          import('~/app/demo/data/sampleTrackList.json')
        ])
        setData({
          playlist: samplePlaylist.default,
          tracksForTracklist: sampleTrackList.default,
        })
      } catch (error) {
        console.error('Error loading demo data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <Playlist
      playlist={data.playlist}
      tracksForTracklist={data.tracksForTracklist}
      loading={loading}
      isDemo={true}
    />
  )
}

export default DemoPlaylist