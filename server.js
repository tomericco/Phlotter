var path = require('path')
var webpack = require('webpack')
var webpackConfig = require('./webpack.dev.config')
var express = require('express')
var fetcher = require('./server/fetcher')
var app = new express()
var compiler = webpack(webpackConfig)
var storageConfig = require('./storage.config')
var isProduction = process.env.NODE_ENV === 'production'
var port = process.env.PORT || 5000

if (!isProduction) {
    var webpackDevMiddleware = require('webpack-dev-middleware')
    var webpackHotMiddleware = require('webpack-hot-middleware')
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}))
    app.use(webpackHotMiddleware(compiler))
}

var distPath = path.join(__dirname, 'dist')
var assetsPath = path.join(__dirname, 'assets')

app.use('/assets', express.static(assetsPath));
app.use('/dist', express.static(distPath));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.get('/photos', function (req, res) {
    fetcher.fetchPhotos(storageConfig).then(photos => {
        res.json({ photos: photos || [] })
    }).catch(err => {
        console.error(err)
        res.status(500).send({ error: err });
    })
})

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
        console.info('Loaded config file', storageConfig)

        Object.keys(storageConfig).forEach(config => {
            if (!!storageConfig[config]) {
                console.error(`Error: Configuration ${config} is not defined. The app would not work as expected`)
            }
        });
    }
})
