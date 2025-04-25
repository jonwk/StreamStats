import getWrapper from "~/app/api/spotify/getWrapper";

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/get-recently-played
 * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * Default: limit=20Range: 0 - 50Example: limit=10
 */

const getRecentlyPlayed = async (limit = 50) => {
  const { items, ...recentlyPlayed } = await getWrapper(`/me/player/recently-played?limit=${limit}`)
  const processedTracks = items.reduce((acc, recentlyPlayedItem, index, array) => {
    const { track, ...rest } = recentlyPlayedItem
    const prevTrack = index > 0 ? array[index - 1].track : null
    const isConsecutive = prevTrack && prevTrack.id === track.id
    if (isConsecutive) {
      acc[acc.length - 1].track.playCount += 1
      return acc
    } else {
      acc.push({
        ...rest,
        track: {
          ...track,
          playCount: 1
        },
      })
      return acc
    }
  }, [])
  return { ...recentlyPlayed, items: processedTracks }
}

export default getRecentlyPlayed
