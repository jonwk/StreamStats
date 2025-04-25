'use client'
import { useEffect, useState } from 'react'
import { Loader, SectionWrapper, TimeRangeButtons, TrackList } from '~/components'
import { getCurrentUserTopTracks } from '~/app/api/spotify'
import { catchErrors } from '~/util'

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState()
  const [activeRange, setActiveRange] = useState('short')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const currentUsertopTracks= await getCurrentUserTopTracks(`${activeRange}_term`)
      setTopTracks(currentUsertopTracks)
      setIsLoading(false)
    }

    catchErrors(fetchData())
  }, [activeRange])

  return (
    <main>
      <SectionWrapper title="Top Tracks" breadcrumb={true}>
        <TimeRangeButtons
          activeRange={activeRange}
          setActiveRange={setActiveRange}
        />
        {!isLoading && topTracks && topTracks.items ? (
          <TrackList tracks={topTracks.items} />
        ) : (
          <Loader />
        )}
      </SectionWrapper>
    </main>
  )
}

export default TopTracks