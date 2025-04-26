/**
 * Format milliseconds to time duration
 * @param {number} ms number of milliseconds
 * @returns {string} formatted duration string
 * @example 216699 -> '3:36'
 */
const formatDuration = (ms) => {
  const minutes = Math.floor(ms / 60_000)
  const seconds = Math.floor((ms % 60_000) / 1000)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export default formatDuration