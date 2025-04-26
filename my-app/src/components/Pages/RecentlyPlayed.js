'use client'
import { Loader, SectionWrapper, TrackList } from '~/components'

const RecentlyPlayed = ({ recentlyPlayed, isLoading, isDemo = false }) => {
  return (
    <main>
      <SectionWrapper title="Recently Played" breadcrumb={true} isDemo={isDemo}>
        <div style={{ minHeight: '60vh', position: 'relative' }}>
          {!isLoading && recentlyPlayed && recentlyPlayed.items ? (
            <TrackList tracks={recentlyPlayed.items.map(({ track }) => track)} />
          ) : (
            <Loader />
          )}
        </div>
      </SectionWrapper>
    </main>
  )
}

export default RecentlyPlayed