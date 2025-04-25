import getWrapper from "~/app/api/spotify/getWrapper";

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */

const getRecentlyPlayed = (limit = 50) => getWrapper(`/me/player/recently-played?limit=${limit}`) 

export default getRecentlyPlayed
