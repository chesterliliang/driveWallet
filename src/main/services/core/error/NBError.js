class NBError extends Error {
  constructor (code = 10001, ...params) {
    super(...params)

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NBError)
    }

    // Custom debugging information
    this.code = code
    this.date = new Date()
  }
}

module.exports = NBError
