'use client'
import { ArtistsGrid, Loader, SectionWrapper, TimeRangeButtons } from '~/components'

const TopArtists = ({ topArtists, activeRange, setActiveRange, isLoading, isDemo = false }) => {
  return (
    <main>
      <SectionWrapper title="Top Artists" breadcrumb={true} isDemo={isDemo}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />
        <div style={{ minHeight: '60vh', position: 'relative' }}>
          {!isLoading && topArtists && topArtists.items ? (
            <ArtistsGrid artists={topArtists.items} />
          ) : (
            <Loader />
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}

export default TopArtists