import getWrapper from '~/app/api/spotify/getWrapper'

/**
 * Get current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 *  @returns {Promise}
 */

const getCurrentUserPlaylists = (limit = 20) => {
  return getWrapper({ urlEndpoint: `/me/playlists?limit=${limit}` })
}

export default getCurrentUserPlaylists