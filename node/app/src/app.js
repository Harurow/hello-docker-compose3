const express = require('express')
require('isomorphic-fetch')

const app = express()
app.use(express.json())

const DAPR_PORT = process.env.DAPR_HTTP_PORT ?? 3500
const STATE_STORE_NAME = `statestore`;
const URL = `http://localhost:${DAPR_PORT}/v1.0/state/${STATE_STORE_NAME}`;
const PORT = 3000;

app.get('/order', async (_, res) => {
    try {
        const resp = await fetch(`${URL}/order`)
        if (!resp.ok) {
            throw "Could not get state."
        }

        const body = await resp.text()

        console.log(`Got a order: ${body}`)

        res.status(200)
            .send(body)
    } catch (e) {
        console.error(e)
        res.status(500)
            .send({message: e})
    }
})

app.post('/order', async (req, res) => {
    const data = req.body.data
    const orderId = data.orderId

    console.log(`Got a new order ! OrderId: ${orderId}`)

    const state = [{
        key: 'order',
        value: data,
    }]

    try {
        const resp = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
        })

        if (!resp.ok) {
            throw "Faild to persist state."
        }

        console.log('Successfully persisted state.')

        res.status(200)
            .send()
    } catch (e) {
        console.error(e)
        res.status(500)
            .send({message: e})
    }
})

try {
    app.listen(
        PORT,
        () => {
            console.log(`node.js > Hello, docker. (${PORT})`)
        }
    )
} catch (e) {
    console.error(e)
}
