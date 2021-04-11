import os

STATE_STORE_NAME = 'statestore'
STATE_STORE_BASE_URL = 'http://localhost:{0}/v1.0/state/{1}'


__port = int(os.environ.get('DAPR_HTTP_PORT', '3500'))
__state_store_url = STATE_STORE_BASE_URL.format(__port, STATE_STORE_NAME)


def getStateStoreUrl():
    return __state_store_url
