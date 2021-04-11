const DAPR_PORT = process.env.DAPR_HTTP_PORT ?? 3500
const STATE_STORE_NAME = `statestore`;
const URL = `http://localhost:${DAPR_PORT}/v1.0/state/${STATE_STORE_NAME}`;

function getStateStoreUrl() {
    return URL
}

exports.getStateStoreUrl = getStateStoreUrl