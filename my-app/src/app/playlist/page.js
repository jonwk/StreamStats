'use client'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Loader, SectionWrapper, TrackList } from '~/components'
import { getPlaylistById, getMoreData } from '~/app/api/spotify'
import { StyledHeader } from '~/styles'
import { catchErrors } from '~/util'

const Playlist = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [playlist, setPlaylist] = useState()
  const [tracksData, setTracksData] = useState()
  const [tracks, setTracks] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const playlistData = await getPlaylistById(id)
      console.log(playlistData)
      setPlaylist(playlistData)
      setTracksData(playlistData.tracks)
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

  return playlist && (
    <>
      <StyledHeader>
        <div className="header__inner">
          {playlist.images && playlist.images.length > 0 && playlist.images[0].url && (
            <img className="header__img" src={playlist.images[0].url} alt="Playlist Artwork" />
          )}
          <div>
            <div className="header__overline">Playlist</div>
            <h1 className="header__name">{playlist.name}</h1>
            <p className="header__meta">
              {playlist.followers.total ? (
                <span>{playlist.followers.total} {`follower${playlist.followers.total === 1 ? '' : 's'}`}</span>
              ) : undefined}
              <span>{playlist.tracks.total} {`song${playlist.tracks.total === 1 ? '' : 's'}`}</span>
            </p>
          </div>
        </div>
      </StyledHeader>

      <main>
        <SectionWrapper title="Playlist" breadcrumb={true}>
          {tracksForTracklist ? (
            <TrackList tracks={tracksForTracklist} />
          ) : (
            <Loader />
          )}
        </SectionWrapper>
      </main>
    </>
  )
}


export default Playlist