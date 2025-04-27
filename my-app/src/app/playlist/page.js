'use client'
import { useEffect, useMemo, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader } from '~/components'
import { getPlaylistById, getMoreData } from '~/app/api/spotify'
import { catchErrors } from '~/util'
import { Playlist } from '~/components/Pages'

const PlaylistPage = () => {
  const searchParameters = useSearchParams()
  const id = searchParameters.get('id')

  const [playlist, setPlaylist] = useState()
  const [tracksData, setTracksData] = useState()
  const [tracks, setTracks] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const playlistData = await getPlaylistById(id)
      setPlaylist(playlistData)
      setTracksData(playlistData.tracks)

      setLoading(false)

    }

    catchErrors(fetchData())
  }, [id])

  // When tracksData updates, compile arrays of tracks and audioFeatures
  useEffect(() => {
    if (!tracksData) {
      return
    }

    // When tracksData updates, check if there are more tracks to fetch
    // then update the state variable
    const fetchMoreData = async () => {
      if (tracksData.next) {
        const moreTracksData = await getMoreData(tracksData.next)
        setTracksData(moreTracksData)
      }
    }
    setTracks(tracks => ([
      ...tracks ?? [],
      ...tracksData.items
    ]))

    catchErrors(fetchMoreData())
  }, [tracksData])

  const tracksForTracklist = useMemo(() => {
    if (!tracks) {
      return
    }
    return tracks.map(({ track }) => track)
  }, [tracks])

  return (
    <Playlist
      playlist={playlist}
      tracksForTracklist={tracksForTracklist}
      loading={loading}
    />
  )
}

const SuspensePlaylist = () => {
  return (
    <Suspense fallback={<Loader />}>
      <PlaylistPage />
    </Suspense>
  )
}

export default SuspensePlaylist