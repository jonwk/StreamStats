import React, { useEffect, useState } from 'react'
import { Loader, SectionWrapper, TrackItem } from 'src/components'
import FadeIn from 'src/animations/FadeIn'
import { getRecentlyPlayed } from 'src/spotify'
import { StyledTrackList } from 'src/styles'
import { catchErrors } from 'src/util'


const RecentlyPlayed = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getRecentlyPlayed()
            setRecentlyPlayed(data)
            console.log('recentlyPlayed', data)
        }
        catchErrors(fetchData())
    }, [])

    return (
        <FadeIn>
            <main>
                <SectionWrapper title="Recently Played" breadcrumb={true}>
                    {recentlyPlayed && recentlyPlayed.items ? (
                        // <RecentlyPlayedList tracks={recentlyPlayed.items} />
                        <FadeIn delay={100}>
                            <StyledTrackList>
                                {recentlyPlayed.items.map(({ track }, index) => (<TrackItem track={track} key={index} />))}
                            </StyledTrackList>
                        </FadeIn>
                    ) : (
                        <Loader />
                    )}
                </SectionWrapper>
            </main>
        </FadeIn >
    )
}

export default RecentlyPlayed