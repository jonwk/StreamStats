'use client'
import { ArtistsGrid, Loader, SectionWrapper, TimeRangeButtons } from '~/components'
import { MotionFade } from '~/animations'

const TopArtists = ({ topArtists, activeRange, setActiveRange, isLoading, isDemo = false }) => {
  return (
    <MotionFade>
      <main>
        <SectionWrapper title="Top Artists" breadcrumb={true} isDemo={isDemo}>
          <TimeRangeButtons
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <div style={{ minHeight: '60vh', position: 'relative' }}>
            {!isLoading && topArtists && topArtists.items ? (
              <MotionFade key={activeRange} delay={0.2}>
                <ArtistsGrid artists={topArtists.items} />
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

export default TopArtists