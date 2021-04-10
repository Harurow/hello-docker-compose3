import { Server, IContext } from 'https://github.com/fen-land/deno-fen/raw/master/server.ts'
import { Router } from 'https://github.com/fen-land/deno-fen/raw/master/tool/router.ts'
import { process } from 'https://deno.land/std/node/process.ts'

const DAPR_PORT = process.env.DAPR_HTTP_PORT ?? 3500
const STATE_STORE_NAME = `statestore`;
const URL = `http://localhost:${DAPR_PORT}/v1.0/state/${STATE_STORE_NAME}`;
const PORT = 3001;

const server = new Server()
const app = new Router()

server.setController(app.controller)
server.port = PORT
server.logger.changeLevel('ALL')

app.get('/order', async (ctx: IContext) => {
    try {
        const resp = await fetch(`${URL}/order`)
        if (!resp.ok) {
            throw 'Could not get state.'
        }

        const body = await resp.text()
        
        console.log(`Got a order: ${body}`)

        ctx.body = body
        ctx.status = 200
    } catch (e) {
        console.error(e)
        ctx.status = 500
        ctx.body = {message: e}
    }
})

app.post('/order', async (ctx: IContext) => {
    try {
        const data = ctx.reqBody.data
        const orderId = data.orderId

        console.log(`Got a new order! Order ID: ${orderId}`)

        const state = [{
            key: 'order',
            value: data,
        }]

        const resp = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state)
        })

        if (!resp.ok) {
            throw 'Faild to persist state.'
        }

        console.log('Successfully persisted state.')

        ctx.status = 200
        ctx.body = ''
    } catch (e) {
        console.error(e)
        ctx.status = 500
        ctx.body = {message: e}
    }
})

server.start()

console.log(`deno > Hello, docker. (${PORT})`)
