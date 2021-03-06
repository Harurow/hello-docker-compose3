import time
import requests
import os
import random

print("python > Hello, docker.")

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
            resp = requests.post(URL, json=message)
            if resp.ok:
                print("OK: POST {0} / order : {1} > {2}".format(
                    app_id, n, resp.text))
            else:
                print("NG: POST {0} / order : {1} > {2}".format(
                    app_id, n, resp.text))
        except Exception as e:
            print("NG: POST {0} / order : {1} > {2}".format(app_id, n, e))
        n += 1

    return _func


def get_order(app_id):
    URL = BASE_URL.format(app_id)

    def _func():
        try:
            resp = requests.get(URL)
            if resp.ok:
                print("OK: GET  {0} / order : {1}".format(app_id, resp.text))
            else:
                print("NG: GET  {0} / order : {1}".format(app_id, resp.text))
        except Exception as e:
            print("NG: GET  {0} / order : {1}".format(app_id, e))

    return _func


def main():
    node_post_order = post_order("node-server", random.randint(0, 10000))
    deno_post_order = post_order("deno-server", random.randint(0, 10000))
    golang_post_order = post_order("golang-server", random.randint(0, 10000))
    python_post_order = post_order("python-server", random.randint(0, 10000))

    node_get_order = get_order("node-server")
    deno_get_order = get_order("deno-server")
    golang_get_order = get_order("golang-server")
    python_get_order = get_order("python-server")

    while True:
        node_post_order()
        deno_post_order()
        golang_post_order()
        python_post_order()

        time.sleep(1.0)

        node_get_order()
        deno_get_order()
        golang_get_order()
        python_get_order()

        time.sleep(1.0)


if __name__ == '__main__':
    main()
