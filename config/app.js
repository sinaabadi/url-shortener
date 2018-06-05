const {IP, PORT, SHORTEN_BASE_URL} = process.env

module.exports = {
  ip: IP || '0.0.0.0',
  port: PORT || '8080',
  shortenBaseUrl : SHORTEN_BASE_URL
}