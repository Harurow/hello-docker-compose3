import time
import requests
import os
import sys
import random

print("python > hello, docker.")

DAPR_HTTP_PORT = os.getenv("DAPR_HTTP_PORT", 3500)
BASE_URL = "http://localhost:{0}/v1.0/invoke/{{}}//method/order" \
    .format(DAPR_HTTP_PORT)


def post_order(app_id, num_of_start):
    n = num_of_start
    URL = BASE_URL.format(app_id)

    def _func():
        nonlocal n
        try:
            message = {"data": {"orderId": n}}
            requests.post(URL, json=message)
            print("OK: POST {0} / order".format(app_id))
        except Exception as e:
            print("NG: POST {0} / order : {1}".format(app_id, e))
        n += 1

    return _func


def get_order(app_id):
    URL = BASE_URL.format(app_id)

    def _func():
        try:
            resp = requests.get(URL, json={})
            print("OK: GET  {0} / order > {1}".format(app_id, resp.text))
        except Exception as e:
            print("NG: GET  {0} / order : {1}".format(app_id, e))

    return _func


def main():
    node_post_order = post_order("node-app", random.randint(0, 10000))
    deno_post_order = post_order("deno-app", random.randint(0, 10000))
    golang_post_order = post_order("golang-app", random.randint(0, 10000))

    node_get_order = get_order("node-app")
    deno_get_order = get_order("deno-app")
    golang_get_order = get_order("golang-app")

    while True:
        node_post_order()
        deno_post_order()
        golang_post_order()

        time.sleep(1.0)

        node_get_order()
        deno_get_order()
        golang_get_order()

        time.sleep(1.0)


if __name__ == '__main__':
    main()
