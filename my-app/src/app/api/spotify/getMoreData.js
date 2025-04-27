import getWrapper from '~/app/api/spotify/getWrapper'

/**
 * Get current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 *  @returns {Promise}
 */

const getMoreData = (nextUrl) => {
  return getWrapper({ url: nextUrl })
}

export default getMoreData