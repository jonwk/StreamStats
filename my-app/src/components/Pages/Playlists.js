'use client'
import { Loader, PlaylistsGrid, SectionWrapper } from '~/components'
import { MotionFade } from '~/animations'

const Playlists = ({ playlists, loading, isDemo = false }) => {
  return (
    <MotionFade>
      <main>
        <SectionWrapper title="Public Playlists" breadcrumb={true} isDemo={isDemo}>
          <div style={{ minHeight: '60vh', position: 'relative' }}>
            {!loading && playlists ? (
              <MotionFade delay={0.2}>
                <PlaylistsGrid playlists={playlists} isDemo={isDemo} />
              </MotionFade>
            ) : (
              <Loader />
            )}
          </div>
        </SectionWrapper>
      </main>
    </MotionFade>
  )
}

export default Playlists