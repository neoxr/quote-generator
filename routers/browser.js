const chrome = require('chrome-aws-lambda')
exports.routes = {
   category: 'main',
   path: '/browser',
   parameter: ['url'],
   method: 'get',
   execution: async (req, res, next) => {
      try {
         const { url } = req.query
         const browser = await chrome.puppeteer.launch({
            args: chrome.args,
            executablePath: await chrome.executablePath, // comment this line when working on localhost
            headless: true
         })
         const page = await browser.newPage()
         await page.setViewport({
            width: 600,
            height: 600,
            deviceScaleFactor: 2
         })
         const pageRes = await page.goto(url)
         const html = await page.content()
         res.send(html)
         await page.close()
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