import getWrapper from "~/app/api/spotify/getWrapper";

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */

const getCurrentUserTopTracks = (time_range = 'short_term') => {
  return getWrapper(`/me/top/tracks?time_range=${time_range}`)
}

export default getCurrentUserTopTracks