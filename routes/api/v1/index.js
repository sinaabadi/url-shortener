const express = require('express')
const router = express.Router()
const shortId = require('shortid')
const {isUri} = require('valid-url')
const {shortenBaseUrl} = require('config/app')
module.exports = ({UrlModel}) => {
  router.get('/:code', async function (req, res, next) {
    try {
      const {
        params: {
          code
        }
      } = req
      const url = await UrlModel.findOne({code})
      if (!url) return res.render('404.ejs')
      return res.redirect(url.original)
    } catch (e) {
      next(e)
    }
  })

  router.post('/urls', async function (req, res, next) {
    try {
      const {
        body: {
          url
        }
      } = req
      if (!isUri(url)) return res.status(422).json({message: 'Invalid url provided'})
      const code = shortId.generate()
      await UrlModel.create({
        original: url,
        code,
      })

      return res.json({
        payload: {
          shorten_url: `${shortenBaseUrl}/${code}`
        }
      })

    } catch (e) {
      next(e)
    }
  })
  return router
}
