'use client'
import { Loader, PlaylistsGrid, SectionWrapper } from '~/components'

const Playlists = ({ playlists, loading, isDemo = false }) => {
  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true} isDemo={isDemo}>
        <div style={{ minHeight: '60vh', position: 'relative' }}>
          {!loading && playlists ? (
            <PlaylistsGrid playlists={playlists} isDemo={isDemo} />
          ) : (
            <Loader />
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}

export default Playlists