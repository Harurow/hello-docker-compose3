const HTTP_PORT = process.env.HTTP_PORT ?? "3000"

function getHttpPort() {
    return parseInt(HTTP_PORT, 10)
}

exports.getHttpPort = getHttpPort
