import { process } from 'node/process.ts'

const port = process.env.DAPR_HTTP_PORT ?? '3500'
const stateStoreName = 'statestore'
export const STATE_STORE_URL = `http://localhost:${port}/v1.0/state/${stateStoreName}`;
