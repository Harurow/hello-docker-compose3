import { Server } from 'deno-fen/server.ts'
import { Router } from 'deno-fen/tool/router.ts'
import { HTTP_PORT } from './utils/port.ts'
import * as orders from './handlers/orders.ts'

const server = new Server()
const router = new Router()

server.setController(router.controller)
server.port = HTTP_PORT
server.logger.changeLevel('ALL')

router.get('/order', orders.getHandler)
router.post('/order', orders.postHandler)

server.start()
console.log(`deno > Hello, docker. (${server.port})`)
