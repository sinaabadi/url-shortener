module.exports = async ({debug}) => {
  const express = require('express')
  const app = express()
  app.set('view engine', 'ejs');
  app.use('/', express.static('statics'))
  const {globalMiddleware, initMongoDb} = require('middlewares/index')

  globalMiddleware({app})
  const {UrlModel} = await initMongoDb({app, debug})
  const indexRouter = require('routes/api/v1/index')({UrlModel})
  app.use('/', indexRouter)

// catch 404 and forward to error handler
  app.use(function (req, res, next) {
    return res.status(404).json({message: 'Route note found'})
  })

// error handler
  app.use(function (err, req, res, next) {
    let resMessage
    const {
      status = 500,
      message = 'Please try again later',
      stack = ''
    } = err

    if (process.env.APP_ENV === 'production') {
      resMessage = 'Please try again later'
    } else {
      resMessage = message
    }
    debug(stack)
    return res.status(status).json({message: resMessage})
  })

  return app
}