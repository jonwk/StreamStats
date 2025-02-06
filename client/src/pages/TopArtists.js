import React, { useEffect, useState } from 'react'
import { ArtistsGrid, Loader, SectionWrapper, TimeRangeButtons } from 'src/components'
import FadeIn from 'src/animations/FadeIn'
import { getCurrentUserTopArtists } from 'src/spotify'
import { catchErrors } from 'src/util'


const TopArtists = () => {
    const [topArtists, setTopArtists] = useState()
    const [activeRange, setActiveRange] = useState('short')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const { data } = await getCurrentUserTopArtists(`${activeRange}_term`)
            setTopArtists(data)
            setIsLoading(false)
        }

        catchErrors(fetchData())
    }, [activeRange])

    return (
        <FadeIn>
            <main>
                <SectionWrapper title="Top Artists" breadcrumb={true}>
                    <TimeRangeButtons
                        activeRange={activeRange}
                        setActiveRange={setActiveRange}
                    />
                    <div style={{ minHeight: '60vh', position: 'relative' }}>
                        {!isLoading && topArtists && topArtists.items ? (
                            <FadeIn
                                key={activeRange}
                                delay={100}
                                transitionDuration={600}
                            >
                                <ArtistsGrid artists={topArtists.items} />
                            </FadeIn>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </SectionWrapper>
            </main>
        </FadeIn>
    )
}

export default TopArtists
