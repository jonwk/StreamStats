'use client'
import { useEffect, useState } from 'react'
import {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getCurrentUserTopArtists,
  getCurrentUserTopTracks,
  getRecentlyPlayed
} from '~/app/api/spotify'
import { catchErrors } from '~/util'
import useLogoutOnError from '~/hooks/useLogoutOnError'
import { Profile } from '~/components/Pages'

const ProfilePage = () => {
  const handleLogoutError = useLogoutOnError()
  const [data, setData] = useState({
    profile: null,
    playlists: null,
    topArtists: null,
    topTracks: null,
    recentlyPlayed: null,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const [
          userProfile,
          userPlaylists,
          topArtists,
          recentlyPlayed,
          topTracks
        ] = await Promise.all([
          getCurrentUserProfile(),
          getCurrentUserPlaylists(),
          getCurrentUserTopArtists(),
          getRecentlyPlayed(),
          getCurrentUserTopTracks()
        ])

        setData({
          profile: userProfile,
          playlists: userPlaylists,
          topArtists,
          topTracks,
          recentlyPlayed
        })
      } catch (error) {
        console.error('Error fetching data:', error)
        await handleLogoutError()
      } finally {
        setLoading(false)
      }
    }

    catchErrors(fetchData())
  }, [])


  return (
    <Profile
      profile={data.profile}
      playlists={data.playlists}
      topArtists={data.topArtists}
      topTracks={data.topTracks}
      recentlyPlayed={data.recentlyPlayed}
      loading={loading}
    />
  )
}

export default ProfilePage
