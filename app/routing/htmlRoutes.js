var path = require('path')

'use strict'

var htmlRoutes = require('express').Router()

htmlRoutes.get('/survey', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"))
})

htmlRoutes.get('/matchPhotos/:image', function (req, res) {
    res.sendFile(path.join(__dirname, `../public/matchPhotos/${req.params.image}`))
})

htmlRoutes.get('/css/:css', function (req, res) {
    res.sendFile(path.join(__dirname, `../public/css/${req.params.css}`))
})

htmlRoutes.get('/javascript/:javascript', function (req, res) {
    res.sendFile(path.join(__dirname, `../public/javascript/${req.params.javascript}`))
})

htmlRoutes.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

module.exports = htmlRoutes
