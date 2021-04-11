import { IContext } from 'deno-fen/server.ts'
import { STATE_STORE_URL } from '../utils/dapr.ts'

const STATE_URL = STATE_STORE_URL
const ORDER_URL = `${STATE_URL}/order`

export async function getHandler(ctx: IContext) {
    try {
        const resp = await fetch(ORDER_URL)
        if (!resp.ok) {
            throw 'Could not get state.'
        }

        const respBody = await resp.text()

        console.log(`Got a order: ${respBody}`)

        ctx.body = respBody
        ctx.status = 200
    } catch (e) {
        console.error(e)
        ctx.status = 500
        ctx.body = {message: e}
    }
}

export async function postHandler(ctx: IContext) {
    try {
        const data = ctx.reqBody.data
        const orderId = data.orderId

        console.log(`Got a new order! Order ID: ${orderId}`)

        const state = [{
            key: 'order',
            value: data,
        }]

        const resp = await fetch(STATE_URL, {
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
}
