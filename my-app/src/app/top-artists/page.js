'use client'
import { useEffect, useState } from 'react'
import { ArtistsGrid, Loader, SectionWrapper, TimeRangeButtons } from '~/components'
import { getCurrentUserTopArtists } from '~/app/api/spotify'
import { catchErrors } from '~/util'

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState()
  const [activeRange, setActiveRange] = useState('short')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const topArtists = await getCurrentUserTopArtists(`${activeRange}_term`)
      setTopArtists(topArtists)
      setIsLoading(false)
    }

    catchErrors(fetchData())
  }, [activeRange])

  return (
    <main>
      <SectionWrapper title="Top Artists" breadcrumb={true}>
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
