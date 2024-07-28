## QUOTE API

> An implementation of [@neoxr/quote-api](https://www.npmjs.com/package/@neoxr/quote-api), i made it so it can run on Vercel.

### Example

The following is a class function that you can use.

```Javascript
const axios = require('axios')
const fs = require('node:fs')

class QuoteAPI {
   constructor() {
      // replace with your website
      this.baseUrl = 'https://quote-generator-green-three.vercel.app/'
   }

   generate = params => new Promise(async resolve => {
      try {
         // default parameter is "json"
         const json = await (await axios.post(this.baseUrl, {
            json: params
         })).data
         if (!json.status) return resolve(json)
         resolve(json)
      } catch (e) {
         resolve({
            creator: global.creator,
            status: false,
            msg: e.message
         })
      }
   })

   download = image => {
      const buffer = Buffer.from(image, 'base64')
      fs.writeFile('Quotly.png', buffer, err => {
         if (err) throw err
      })
   }
}
```

This is an example of its use :

```Javascript
const text = "Hello World"
const username = "Wildan Izzudin"
const avatar = "https://telegra.ph/file/59952c903fdfb10b752b3.jpg"

const params = {
  "type": "quote",
  "format": "png",
  "backgroundColor": "#FFFFFF",
  "width": 512,
  "height": 768,
  "scale": 2,
  "messages": [
    {
      "entities": [],
      "avatar": true,
      "from": {
        "id": 1,
        "name": username,
        "photo": {
          "url": avatar
        }
      },
      "text": text,
      "replyMessage": {}
    }
  ]
}

const qc = new QuoteAPI
// print as JSON
qc.generate(params).then(console.log)
// download as Image
qc.generate(params).then(result => qc.download(result.data.image))
```

For other input, you can see the original repository [LyoSU](https://github.com/LyoSU/quote-api).