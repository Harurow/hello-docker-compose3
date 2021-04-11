import os
import sys
from bottle import get, post, HTTPResponse, response, request
import requests
import json

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
from utils.dapr import getStateStoreUrl

STATE_URL = getStateStoreUrl()
ORDER_URL = STATE_URL + '/order'

@get('/order')
def get():
    try:
        resp = requests.get(ORDER_URL)

        if not resp.ok:
            error_msg = 'Could not get state. {0}'.format(resp.status_code)
            print(error_msg)
            body = json.dumps({'message': error_msg})
            r = HTTPResponse(status=500, body=body)
            r.set_header('Content-Type', 'application/json')
            return r

        print('Got a order: {0}'.format(resp.text))

        r = HTTPResponse(status=200, body=resp.text)
        r.set_header('Content-Type', 'application/json')
        return r

    except Exception as e:
        print(e)
        body = json.dumps({'message': e})
        r = HTTPResponse(status=500, body=body)
        r.set_header('Content-Type', 'application/json')
        return r

@post('/order')
def post():
    try:
        body = request.json

        print('Got a new order! Order Id: {0}'.format(body['data']['orderId']))

        state = [{'key': 'order', 'value': body['data']}]
        resp = requests.post(STATE_URL, json=state)

        if not resp.ok:
            error_msg = 'Could not set state. {0}'.format(resp.status_code)
            print(error_msg)
            body = json.dumps({'message': error_msg})
            r = HTTPResponse(status=500, body=body)
            r.set_header('Content-Type', 'application/json')
            return r

        print('Successfully psersisted state.')

        r = HTTPResponse(status=204, body='')
        r.set_header('Content-Type', 'application/json')
        return r

    except Exception as e:
        print(e)
        body = json.dumps({'message': e})
        r = HTTPResponse(status=500, body=body)
        r.set_header('Content-Type', 'application/json')
        return r
