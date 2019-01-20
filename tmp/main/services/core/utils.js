const crypto = require('crypto')
const bitoin = require('bitcoinjs-lib')
const _ = require('lodash')

const encrypt = (str, secret) => {
  var cipher = crypto.createCipher('aes256', secret)
  var enc = cipher.update(str, 'utf8', 'hex')
  enc += cipher.final('hex')
  return enc
}

const decrypt = (str, secret) => {
  var decipher = crypto.createDecipher('aes256', secret)
  var dec = decipher.update(str, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

const hash160 = (m) => {
  return bitoin.crypto.hash160(m)
}

class Logger {
  /**
   * 标准化日志
   * @param {String} category 主类别
   * @param {String} sub 子类别
   */
  constructor (category, sub) {
    this._category = category || 'Default'
    this._sub = sub
  }

  /**
   * 生成LogPrefix
   * @param {String[]} tags 各类日志标签
   * @returns {String}
   */
  _buildPrefix (tags) {
    const category = !this._sub ? `[${this._category}]` : `[${this._category} - ${this._sub}]`
    const tagsStr = _.map(tags, t => `[${t}]`).join('')
    return `${new Date().toLocaleString()}|${category}${tagsStr}|`
  }

  /**
   * @param {String} message 日志记录
   * @param {String[]} tags 各类日志标签
   */
  log (message, tags) {
    console.log(this._buildPrefix(tags) + message)
  }

  /**
   * @param {String} message info记录
   * @param {Error} err 错误对象
   * @param {String[]} tags 各类日志标签
   */
  error (message, err, tags) {
    tags = tags || []
    tags.unshift('ERROR')

    const e = (err instanceof Error) ? err : new Error(err.message || err)
    let errStr = `message=${e.message},name=${e.name}`
    if (process.env.NODE_ENV !== 'production') {
      errStr += `,stack=${e.stack}}`
    }
    if (message !== '' && message !== null) {
      errStr = `info=${message},${errStr}`
    }
    console.error(this._buildPrefix(tags) + errStr)

    return err
  }
}

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

module.exports = {encrypt, decrypt, hash160, Logger, NBError}
