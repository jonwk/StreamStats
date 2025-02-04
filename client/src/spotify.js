import axios from 'axios'

// localStorage keys
const LOCALSTORAGE_KEYS = {
  access_token: 'spotify_access_token',
  refresh_token: 'spotify_refresh_token',
  expires_in: 'spotify_token_expires_in',
  timestamp: 'spotify_token_timestamp',
}

// localStorage values
const LOCALSTORAGE_VALUES = {
  access_token: globalThis.localStorage.getItem(LOCALSTORAGE_KEYS.access_token),
  refresh_token: globalThis.localStorage.getItem(LOCALSTORAGE_KEYS.refresh_token),
  expires_in: globalThis.localStorage.getItem(LOCALSTORAGE_KEYS.expires_in),
  timestamp: globalThis.localStorage.getItem(LOCALSTORAGE_KEYS.timestamp),
}

/**
 * Checks if the amount of time that has elapsed between the timestamp in localStorage
 * and now is greater than the expiration time of 3600 seconds (1 hour).
 * @returns {boolean} Whether or not the access token in localStorage has expired
 */
const hasTokenExpired = () => {
  const { access_token, timestamp, expires_in } = LOCALSTORAGE_VALUES
  if (!access_token || !timestamp) {
    return false
  }
  const millisecondsElapsed = Date.now() - Number(timestamp)
  return millisecondsElapsed / 1000 > Number(expires_in)
}

/**
 * Use the refresh token in localStorage to hit the /refresh_token endpoint
 * in our Node app, then update values in localStorage with data from response.
 * @returns {void}
 */
const refreshToken = async () => {
  try {
    // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
    if (!LOCALSTORAGE_VALUES.refresh_token || LOCALSTORAGE_VALUES.refresh_token === 'undefined'
      || !globalThis.localStorage.getItem(LOCALSTORAGE_KEYS.access_token) || Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000) {
      console.error('No refresh token available')
      logout()
    }

    const refreshApi = axios.create({
      baseURL: 'http://localhost:8888',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })

    const { data } = await refreshApi.get('/refresh_token', {
      params: {
        refresh_token: LOCALSTORAGE_VALUES.refresh_token
      }
    })

    globalThis.localStorage.setItem(
      LOCALSTORAGE_KEYS.access_token,
      data.access_token
    )
    globalThis.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())

    globalThis.location.reload()
  } catch (error) {
    console.error(error)
  }
}

const getAccessToken = () => {
  const queryString = globalThis.location.search
  const urlParameters = new URLSearchParams(queryString)
  const hasError = urlParameters.get('error')

  if (urlParameters.size > 0) {
    for (const [key, value] of urlParameters) {
      globalThis.localStorage.setItem(LOCALSTORAGE_KEYS[key], value)
    }
    globalThis.localStorage.setItem(LOCALSTORAGE_KEYS.timestamp, Date.now())
    return urlParameters.get('access_token')
  }

  if (LOCALSTORAGE_VALUES.access_token && LOCALSTORAGE_VALUES.access_token !== 'undefined') {
    return LOCALSTORAGE_VALUES.access_token
  }

  if (hasError || hasTokenExpired() || LOCALSTORAGE_VALUES.access_token === 'undefined') {
    refreshToken()
  }

  // should never get here
  return false
}

export const access_token = getAccessToken()

if (access_token) {
  axios.defaults.baseURL = 'https://api.spotify.com/v1'
  axios.defaults.headers['Authorization'] = `Bearer ${access_token}`
  axios.defaults.headers['Content-Type'] = 'application/json'
}

/**
 * Get current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-current-users-profile
 *  @returns {Promise}
 */
export const getCurrentUserProfile = async () => {
  try {
    const response = await axios.get('/me')
    return response
  } catch (error) {
    if (error.response?.status === 401) {
      // token expired, refresh and retry
      const newToken = getAccessToken()
      if (newToken) {
        return await axios.get('/me')
      }
      // logout()
    }
    throw error
  }
}

/**
* Get a List of Current User's Playlists
* https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-a-list-of-current-users-playlists
* @returns {Promise}
*/
export const getCurrentUserPlaylists = (limit = 20) => {
  return axios.get(`/me/playlists?limit=${limit}`)
}

/**
 * Get a User's Top Artists and Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getCurrentUserTopArtists = (time_range = 'short_term') => {
  return axios.get(`/me/top/artists?time_range=${time_range}`)
}

/**
 * Get a User's Top Tracks
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-users-top-artists-and-tracks
 * @param {string} time_range - 'short_term' (last 4 weeks) 'medium_term' (last 6 months) or 'long_term' (calculated from several years of data and including all new data as it becomes available). Defaults to 'short_term'
 * @returns {Promise}
 */
export const getCurrentUserTopTracks = (time_range = 'short_term') => {
  return axios.get(`/me/top/tracks?time_range=${time_range}`)
}

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/#endpoint-get-playlist
 * @param {string} playlist_id - The Spotify ID for the playlist.
 * @returns {Promise}
 */
export const getPlaylistById = (playlist_id) => {
  return axios.get(`/playlists/${playlist_id}`)
}

/**
 * Get Current User's Recently Played Tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */

export const getRecentlyPlayed = () => axios.get('/me/player/recently-played')

/**
 * Clear out all localStorage items we've set and reload the page
 * @returns {void}
 */
export const logout = () => {
  // Clear all localStorage items
  for (const key in LOCALSTORAGE_KEYS) {
    globalThis.localStorage.removeItem(LOCALSTORAGE_KEYS[key])
  }
  // Redirect to login or homepage
  globalThis.location.href = globalThis.location.origin
}
