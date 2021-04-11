const { getStateStoreUrl } = require("../utils");

const STATE_URL = getStateStoreUrl()
const ORDER_URL = `${STATE_URL}/order`

async function getHandler(req, res) {
    try {
        const resp = await fetch(ORDER_URL)
        if (!resp.ok) {
            throw 'Could not get state.'
        }

        const respBody = await resp.text()

        console.log(`Got a order: ${respBody}`)

        res.status(200)
            .send(respBody)
    } catch (e) {
        console.error(e)
        res.status(500)
            .send({message: e})
    }
}

async function postHandler(req, res) {
    try {
        const data = req.body.data
        const orderId = data.orderId

        console.log(`Got a new order! OrderId: ${orderId}`)

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

        res.status(200)
            .send()
    } catch (e) {
        console.error(e)
        res.status(500)
            .send({message: e})
    }
}

module.exports = {
    getHandler,
    postHandler,
}