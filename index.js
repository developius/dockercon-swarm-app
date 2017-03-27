/*
App serves on :3000 and saves the req/s to redis { hostname: count }
*/

const os = require('os')
const express = require('express')
const app = express()

const redis = require('redis')
const client = redis.createClient('redis://redis:6379')

const hostname = os.hostname()
let requests = []

const interval = 1 // seconds

function updateStats(cb) {
  let cnt = 0
  let d = Date.now()
  // count requests in the last ${interval} seconds

  for (var i = requests.length - 1; i >= 0; i--) {
    if (requests[i] >= d - (1000 * interval)) ++cnt
    else break
  }

  client.set(hostname, cnt / interval, function(err, count) {
    if (typeof cb !== 'undefined') {
      cb(cnt / interval)
    }
  })
}

app.get('/', function (req, res) {
  res.send('Hello World! Built by <a href=\'https://finnian.io\'>Finnian Anderson</a>')
  requests.push(Date.now())
  updateStats()
})

app.listen(3000, function () {
  console.log('App listening on port 3000!')
})

setInterval(function(){
  updateStats(function(count) {
    console.log(hostname + ': ' + count)
  })
}, 1000)