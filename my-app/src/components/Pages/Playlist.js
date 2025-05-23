'use client'
import { Loader, SectionWrapper, TrackList } from '~/components'
import { StyledHeader } from '~/styles'
import { MotionFade } from '~/animations'

const Playlist = ({ playlist, tracksForTracklist, isLoading, isDemo = false }) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : playlist && (
        <MotionFade>
          <StyledHeader>
            <div className="header__inner">
              {playlist.images.length > 0 && playlist.images[0].url && (
                <img
                  className="header__img"
                  src={playlist.images[0].url}
                  alt="Playlist Artwork"
                />
              )}
              <div>
                <div className="header__overline">Playlist</div>
                <h1 className="header__name">{playlist.name}</h1>
                <p className="header__meta">
                  {playlist.followers.total ? (
                    <span>{playlist.followers.total} {`follower${playlist.followers.total !== 1 ? 's' : ''}`}</span>
                  ) : null}
                  <span>{playlist.tracks.total} {`song${playlist.tracks.total !== 1 ? 's' : ''}`}</span>
                </p>
              </div>
            </div>
          </StyledHeader>

          <main>
            <SectionWrapper title="Playlist" breadcrumb={true} isDemo={isDemo}>
              <div style={{ minHeight: '60vh', position: 'relative' }}>
                {tracksForTracklist ? (
                  <MotionFade delay={0.2}>
                    <TrackList tracks={playlist.tracks.items.map(({ track }) => track)} />
                  </MotionFade>
                ) : (
                  <Loader />
                )}
              </div>
            </SectionWrapper>
          </main>
        </MotionFade>
      )}
    </>
  )
}

export default Playlist