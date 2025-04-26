'use client'
import { Loader, SectionWrapper, TimeRangeButtons, TrackList } from '~/components'

const TopTracks = ({ topTracks, activeRange, setActiveRange, isLoading, isDemo = false }) => {
  return (
    <main>
      <SectionWrapper title="Top Tracks" breadcrumb={true} isDemo={isDemo}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />
        <div style={{ minHeight: '60vh', position: 'relative' }}>
          {!isLoading && topTracks && topTracks.items ? (
            <TrackList tracks={topTracks.items} />
          ) : (
            <Loader />
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}

export default TopTracks