'use client'
import { Loader, SectionWrapper, TimeRangeButtons, TrackList } from '~/components'
import { MotionFade } from '~/animations'

const TopTracks = ({ topTracks, activeRange, setActiveRange, isLoading, isDemo = false }) => {
  return (
    <MotionFade>
      <main>
        <SectionWrapper title="Top Tracks" breadcrumb={true} isDemo={isDemo}>
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <div style={{ minHeight: '60vh', position: 'relative' }}>
            {!isLoading && topTracks && topTracks.items ? (
              <MotionFade key={activeRange} delay={0.2}>
                <TrackList tracks={topTracks.items} />
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

export default TopTracks