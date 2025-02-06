import React, { useEffect, useState } from 'react'
import { Loader, SectionWrapper, TimeRangeButtons, TrackList } from 'src/components'
import FadeIn from 'src/animations/FadeIn'
import { getCurrentUserTopTracks } from 'src/spotify'
import { catchErrors } from 'src/util'

const TopTracks = () => {
    const [topTracks, setTopTracks] = useState()
    const [activeRange, setActiveRange] = useState('short')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const { data } = await getCurrentUserTopTracks(`${activeRange}_term`)
            setTopTracks(data)
            setIsLoading(false)
        }

        catchErrors(fetchData())
    }, [activeRange])

    return (
        <FadeIn>
            <main>
                <SectionWrapper title="Top Tracks" breadcrumb={true}>
                    <TimeRangeButtons
                        activeRange={activeRange}
                        setActiveRange={setActiveRange}
                    />
                    {!isLoading && topTracks && topTracks.items ? (
                        <FadeIn
                            key={activeRange}
                            delay={100}
                            transitionDuration={600}
                        >
                            <TrackList tracks={topTracks.items} />
                        </FadeIn>
                    ) : (
                        <Loader />
                    )}
                </SectionWrapper>
            </main>
        </FadeIn>
    )
}

export default TopTracks