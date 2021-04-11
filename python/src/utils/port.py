import os


__port = int(os.environ.get('HTTP_PORT', '3000'))


def getPort():
    return __port
