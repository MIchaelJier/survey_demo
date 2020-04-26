require('./db');
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const router = require('./router')
const app = express()

// 跨域设置
app.all("*", function(req, res, next) {
  if (req.path !== "/" && !req.path.includes(".")) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", req.headers["origin"] || "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Authorization")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("Content-Type", "application/json;charset=utf-8")
  }
  next()
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api', router)

app.listen('3333', function() {
  console.log('******************************')
  console.log(`* app listening on port 3333 *`)
  console.log('******************************')
})