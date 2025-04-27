import getWrapper from '~/app/api/spotify/getWrapper'

/**
 * Get current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 *  @returns {Promise}
 */

const getCurrentUserProfile = () => {
  return getWrapper({ urlEndpoint: '/me' })
}

export default getCurrentUserProfile