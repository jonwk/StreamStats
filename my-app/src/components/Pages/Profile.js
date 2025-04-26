'use client'
import {
  ArtistsGrid,
  Loader,
  PlaylistsGrid,
  SectionWrapper,
  TrackItem,
  TrackList
} from '~/components'
import { getLink } from '~/util'
import { StyledHeader, StyledTrackList } from '~/styles'

const Profile = ({ profile, playlists, topArtists, topTracks, recentlyPlayed, loading, isDemo = false }) => {
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
            <SectionWrapper title="Top artists this month" seeAllLink={getLink('/top-artists', isDemo)}>
              {topArtists ? (<ArtistsGrid artists={topArtists.items.slice(0, 10)} />) : (<Loader />)}
            </SectionWrapper>

            <SectionWrapper title="Top tracks this month" seeAllLink={getLink('/top-tracks', isDemo)}>
              {topTracks ? (<TrackList tracks={topTracks.items.slice(0, 10)} />) : (<Loader />)}
            </SectionWrapper>

            <SectionWrapper title="Recently Played" seeAllLink={getLink('/recently-played', isDemo)}>
              {recentlyPlayed ? (
                <StyledTrackList>
                  {recentlyPlayed.items.slice(0, 10).map(({ track }, index) => (
                    <TrackItem track={track} key={index} />
                  ))}
                </StyledTrackList>
              ) : (<Loader />)}
            </SectionWrapper>

            <SectionWrapper title="Public Playlists" seeAllLink={getLink('/playlists', isDemo)}>
              {playlists ? (<PlaylistsGrid playlists={playlists.items.slice(0, 10)} />) : (<Loader />)}
            </SectionWrapper>
          </main>
        </div>
      )}
    </div>
  )
}

export default Profile