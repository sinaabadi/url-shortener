const {init} = require('adapters/mongo-db')

module.exports = async ({app, debug = console.log}) => {
  try {
    const mongoose = await init({debug})
    app.set('mongoose', mongoose)
    const UrlModel = require('models/url')({mongoose})
    return  {
      UrlModel
    }
  } catch (e) {
    debug(`Error on connecting to the database -> ${e.stack}`)
    process.exit(1)
  }
}