import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Loader, SectionWrapper, TrackList } from 'src/components'
import { getPlaylistById } from 'src/spotify'
import { StyledHeader } from 'src/styles'
import { catchErrors } from 'src/util'
import FadeIn from 'src/animations/FadeIn'

const Playlist = () => {
    const { id } = useParams()
    const [playlist, setPlaylist] = useState()
    const [tracksData, setTracksData] = useState()
    const [tracks, setTracks] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getPlaylistById(id)
            setPlaylist(data)
            setTracksData(data.tracks)
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
                const { data } = await axios.get(tracksData.next)
                setTracksData(data)
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
        <FadeIn>
            {playlist && (
                <>
                    <FadeIn delay={50}>
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
                    </FadeIn>

                    <main>
                        <SectionWrapper title="Playlist" breadcrumb={true}>
                            {tracksForTracklist ? (
                                <FadeIn delay={100}>
                                    <TrackList tracks={tracksForTracklist} />
                                </FadeIn>
                            ) : (
                                <Loader />
                            )}
                        </SectionWrapper>
                    </main>
                </>
            )}
        </FadeIn>
    )
}

export default Playlist