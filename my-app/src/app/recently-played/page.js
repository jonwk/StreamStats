'use client'
import { useEffect, useState } from 'react'
import { Loader, SectionWrapper, TrackItem } from '~/components'
import { getRecentlyPlayed } from '~/app/api/spotify'
import { StyledTrackList } from '~/styles'
import { catchErrors } from '~/util'

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const recentlyPlayedTracks = await getRecentlyPlayed()
      setRecentlyPlayed(recentlyPlayedTracks)
    }
    catchErrors(fetchData())
  }, [])

  return (
    <main>
      <SectionWrapper title="Recently Played" breadcrumb={true}>
        {recentlyPlayed && recentlyPlayed.items.length > 0 ? (
          <StyledTrackList>
            {recentlyPlayed.items.map(({ track }, index) => (<TrackItem track={track} key={index} />))}
          </StyledTrackList>
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  )
}

export default RecentlyPlayed