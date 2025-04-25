import getWrapper from "~/app/api/spotify/getWrapper";

/**
 * Get current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 *  @returns {Promise}
 */

const getMorePlaylists = (playlistsNextUrl) => {
  return getWrapper({ url: playlistsNextUrl })
}

export default getMorePlaylists