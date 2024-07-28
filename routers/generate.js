const quoteApi = require('@neoxr/quote-api')
exports.routes = {
   category: 'main',
   path: '/',
   parameter: ['json'],
   method: 'post',
   execution: async (req, res, next) => {
      try {
         const json = await quoteApi(req.body)
         if (!json.image) return res.json({
            creator: global.creator,
            status: false,
            msg: `Something went wrong!`
         })
         res.json({
            creator: global.creator,
            status: true,
            data: json
         })
      } catch (e) {
         res.json({
            creator: global.creator,
            status: false,
            msg: e.message
         })
      }
   },
   error: false
}