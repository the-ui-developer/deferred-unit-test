const path = require('path')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)
const express = require('express')
const app = express()
const productDetails = require('./mock-data/product-details.json')

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
)

app.get('/', (req, resp) => {
  resp.redirect('/preview')
})
app.get('/preview', (req, resp) => {
  resp.sendFile(path.join(__dirname, 'preview', 'preview.html'))
})

app.get('/api/products/list', (req, resp) => {
  resp.status(200).sendFile(path.resolve('mock-data', 'products.json'))
})

app.get('/api/product/details/:id', (req, resp) => {
  const id = req.params.id
  setTimeout(() => {
    if (id in productDetails) {
      resp.status(200).send(productDetails[id])
    } else {
      resp.status(404).send({ error: 'not found' })
    }
  }, 500)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
