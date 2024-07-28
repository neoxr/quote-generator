const quoteApi = require('@neoxr/quote-api')
exports.routes = {
   category: 'main',
   path: '/',
   method: 'get',
   execution: async (req, res, next) => {
      res.json({
         creator: global.creator,
         msg: {
            script: 'https://github.com/neoxr/quote-generator'
         }
      })
   },
   error: false
}