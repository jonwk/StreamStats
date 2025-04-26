/**
* Higher-order function for async/await error handling
* @param {function} fn an async function
* @returns {function}
*/
const catchErrors = (function_) => {
  return function (...args) {
    return function_(...args).catch((error) => {
      console.error(error)
    })
  }
}

export default catchErrors