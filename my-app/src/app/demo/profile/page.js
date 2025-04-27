'use client'
import { useEffect, useState } from 'react'
import { Profile } from '~/components/Pages'

const DemoProfilePage = () => {
  const [data, setData] = useState({
    profile: null,
    playlists: null,
    topArtists: null,
    topTracks: null,
    recentlyPlayed: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDemoData = async () => {
      try {
        const [
          userProfile,
          userPlaylists,
          topArtistsData,
          topTracksData,
          recentlyPlayedData
        ] = await Promise.all([
          import('~/app/demo/data/userProfile.json'),
          import('~/app/demo/data/userPlaylists.json'),
          import('~/app/demo/data/topArtists.json'),
          import('~/app/demo/data/topTracks.json'),
          import('~/app/demo/data/userRecentlyPlayed.json')
        ])

        setData({
          profile: userProfile.default,
          playlists: userPlaylists.default,
          topArtists: topArtistsData.default,
          topTracks: topTracksData.default,
          recentlyPlayed: recentlyPlayedData.default
        })
      } catch (error) {
        console.error('Error loading demo data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDemoData()
  }, [])

  return (
    <Profile
      profile={data.profile}
      playlists={data.playlists}
      topArtists={data.topArtists}
      topTracks={data.topTracks}
      recentlyPlayed={data.recentlyPlayed}
      loading={loading}
      isDemo={true}
    />
  )
}

export default DemoProfilePage