const path = require('path')
const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const config = require('./webpack.config.js')
const compiler = webpack(config)
const express = require('express')
const app = express()

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

app.listen(3000, () => console.log('Example app listening on port 3000!'))
