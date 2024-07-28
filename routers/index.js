const quoteApi = require('@neoxr/quote-api')
exports.routes = {
   category: 'main',
   path: '/',
   parameter: ['json'],
   method: 'post',
   execution: async (req, res, next) => {
      const json = await quoteApi(req.body.json)
      res.json(json)
   },
   error: false
}