'use client'
import { useEffect, useState } from 'react'
import { Loader, PlaylistsGrid, SectionWrapper } from '~/components'
import { getCurrentUserPlaylists, getMoreData } from '~/app/api/spotify'
import { catchErrors } from '~/util'

const Playlists = () => {
  const [playlistsData, setPlaylistsData] = useState()
  const [playlists, setPlaylists] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const currentUserPlaylists = await getCurrentUserPlaylists()
      setPlaylistsData(currentUserPlaylists)
      console.log('currentUserPlaylists', currentUserPlaylists)
    }

    catchErrors(fetchData())
  }, [])

  // When playlistsData updates, check if there are more playlists to fetch
  // then update the state variable
  useEffect(() => {
    if (!playlistsData) {
      return
    }

    // Playlist endpoint only returns 20 playlists at a time, so we need to
    // make sure we get ALL playlists by fetching the next set of playlists
    const fetchMoreData = async () => {
      if (playlistsData.next) {
        const morePlaylistData = await getMoreData(playlistsData.next)
        setPlaylistsData(morePlaylistData)
      }
    }

    // Use functional update to update playlists state variable
    // to avoid including playlists as a dependency for this hook
    // and creating an infinite loop
    setPlaylists(playlists => ([
      ...playlists ?? [],
      ...playlistsData.items
    ]))

    // Fetch next set of playlists as needed
    catchErrors(fetchMoreData())

  }, [playlistsData])

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true}>
        {playlists ? (
          <PlaylistsGrid playlists={playlists} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  )
}

export default Playlists