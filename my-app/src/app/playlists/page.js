'use client'
import { useEffect, useState } from 'react'
import { Playlists } from '~/components/Pages'
import { getCurrentUserPlaylists, getMoreData } from '~/app/api/spotify'
import { catchErrors } from '~/util'

const PlaylistsPage = () => {
  const [playlistsData, setPlaylistsData] = useState()
  const [playlists, setPlaylists] = useState()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const userPlaylists = await getCurrentUserPlaylists()
      setPlaylistsData(userPlaylists)
    }

    catchErrors(fetchData())
  }, [])

  useEffect(() => {
    if (!playlistsData) {
      return
    }

    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const morePlaylistData = await getMoreData(playlistsData.next)
        setPlaylistsData(morePlaylistData)
      }
    }

    setPlaylists(playlists => ([
      ...playlists ?? [],
      ...playlistsData.items
    ]))

    catchErrors(fetchMoreData())
    setIsLoading(false)
  }, [playlistsData])

  return (
    <Playlists
      playlists={playlists}
      isLoading={isLoading}
    />
  )
}

export default PlaylistsPage