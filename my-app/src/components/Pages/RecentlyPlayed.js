'use client'
import { Loader, SectionWrapper, TrackList } from '~/components'
import { MotionFade } from '~/animations'

const RecentlyPlayed = ({ recentlyPlayed, isLoading, isDemo = false }) => {
  return (
    <MotionFade>
      <main>
        <SectionWrapper title="Recently Played" breadcrumb={true} isDemo={isDemo}>
          <div style={{ minHeight: '60vh', position: 'relative' }}>
            {!isLoading && recentlyPlayed && recentlyPlayed.items ? (
              <MotionFade delay={0.2}>
                <TrackList tracks={recentlyPlayed.items.map(({ track }) => track)} />
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

export default RecentlyPlayed