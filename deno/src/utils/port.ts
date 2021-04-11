import { process } from 'node/process.ts'

const port = process.env.HTTP_PORT ?? '3000'
export const HTTP_PORT = parseInt(port)
