## Quote Generator

> This package comes from [LyoSU - Quote API](https://github.com/LyoSU/quote-api) which I modified slightly.

### Example

```Javascript
const quoteApi = require('@neoxr/quote-api')
const fs = require('node:fs')

const text = "Hello World"
const username = "Alι_Aryαɴ"
const avatar = "https://telegra.ph/file/59952c903fdfb10b752b3.jpg"

const json = {
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

quoteApi(json).then(res => {
   const buffer = Buffer.from(res.image, 'base64')
      fs.writeFile('Quotly.png', buffer, (err) => {
      if (err) throw err
   })
})
```