import getWrapper from "~/app/api/spotify/getWrapper";

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 * @returns {Promise}
 */

const getPlaylistById = (playlist_id) => {
  return getWrapper(`/playlists/${playlist_id}`)
}

export default getPlaylistById