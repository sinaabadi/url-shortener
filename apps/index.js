const server = require('express')()

module.exports = async ({debug}) => {
  const apiV1 = await require('apps/api/v1')({debug})
  server.use('/', apiV1)
  return server
}