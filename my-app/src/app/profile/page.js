'use client'
import { useEffect, useState } from 'react'
import {
  ArtistsGrid,
  Loader,
  PlaylistsGrid,
  SectionWrapper,
  TrackItem,
  TrackList
} from '~/components'
import {
  getCurrentUserPlaylists,
  getCurrentUserProfile,
  getCurrentUserTopArtists,
  getCurrentUserTopTracks,
  getRecentlyPlayed
} from '~/app/api/spotify'
import FadeIn from '~/animations/FadeIn'
import { StyledHeader, StyledTrackList } from '~/styles'
import { catchErrors } from '~/util'
import useLogoutOnError from '~/hooks/useLogoutOnError'

const Profile = () => {
  const handleLogoutError = useLogoutOnError()
  const [profile, setProfile] = useState()
  const [playlists, setPlaylists] = useState()
  const [topArtists, setTopArtists] = useState()
  const [topTracks, setTopTracks] = useState()
  const [recentlyPlayed, setRecentlyPlayed] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const userProfile = await getCurrentUserProfile()
        setProfile(userProfile)

        const userPlaylists = await getCurrentUserPlaylists()
        setPlaylists(userPlaylists)

        const topArtists = await getCurrentUserTopArtists()
        setTopArtists(topArtists)

        const userRecentlyPlayed = await getRecentlyPlayed()
        setRecentlyPlayed(userRecentlyPlayed)

        const topTracks = await getCurrentUserTopTracks()
        setTopTracks(topTracks)
      } catch (error) {
        console.log('Error fetching data:', error)
        await handleLogoutError()
      } finally {
        setLoading(false)
      }
    }

    catchErrors(fetchData())
  }, [])


  return (
    <div>
      {loading ? (
        <Loader />
      ) : profile && (
        <div>
          <StyledHeader type="user">
            <div className="header__inner">
              {profile.images && profile.images.length > 0 && profile.images[0].url && (
                <p>
                  <img
                    className="header__img"
                    src={profile.images[0].url}
                    alt="profile-pic"
                  />
                </p>
              )}
              <div>
                <div className="header__overline">Profile</div>
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  {playlists && (
                    <span>
                      {playlists.total} Playlist
                      {playlists.total === 1 ? '' : 's'}
                    </span>
                  )}
                  <span>
                    {profile.followers.total} Follower
                    {profile.followers.total === 1 ? '' : 's'}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            <SectionWrapper title="Top artists this month" seeAllLink="/top-artists">
              {topArtists ? (<ArtistsGrid artists={topArtists.items.slice(0, 10)} />) : (<Loader />)}
            </SectionWrapper>

            <SectionWrapper title="Top tracks this month" seeAllLink="/top-tracks">
              {topTracks ? (<TrackList tracks={topTracks.items.slice(0, 10)} />) : (<Loader />)}
            </SectionWrapper>

            <SectionWrapper title="Recently Played" seeAllLink="/recently-played">
              {recentlyPlayed ? (
                <StyledTrackList>
                  {recentlyPlayed.items.slice(0, 10).map(({ track }, index) => (
                    <TrackItem track={track} key={index} />
                  ))}
                </StyledTrackList>
              ) : (<Loader />)}
            </SectionWrapper>

            <SectionWrapper title="Public Playlists" seeAllLink="/playlists">
              {playlists ? (<PlaylistsGrid playlists={playlists.items.slice(0, 10)} />) : (<Loader />)}
            </SectionWrapper>
          </main>
        </div>
      )}
    </div >
  )
}

export default Profile
