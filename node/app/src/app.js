const express = require('express')
const orders = require('./handlers/orders')
require('isomorphic-fetch')

const server = express()
server.use(express.json())

const { getHttpPort } = require('./utils')

const PORT = getHttpPort()

server.get('/order', orders.getHandler)
server.post('/order', orders.postHandler)

try {
    server.listen(PORT, () => console.log(`node.js > Hello, docker. (${PORT})`))
} catch (e) {
    console.error(e)
}
