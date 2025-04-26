'use client'
import { Loader, PlaylistsGrid, SectionWrapper } from '~/components'

const Playlists = ({ playlists, isLoading, isDemo = false }) => {
  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true} isDemo={isDemo}>
        <div style={{ minHeight: '60vh', position: 'relative' }}>
          {!isLoading && playlists ? (
            <PlaylistsGrid playlists={playlists} />
          ) : (
            <Loader />
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}

export default Playlists