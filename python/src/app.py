# from utils.port import getPort
# from http.server import HTTPServer
# import handlers


# def main():
#     port = getPort()
#     server = HTTPServer(('0.0.0.0', port), handlers.Handler)
#     print("python > Hello, docker.")
#     server.serve_forever()


# if __name__ == '__main__':
#     main()

from utils.port import getPort
from bottle import run
import handlers.oders

port = getPort()
print("python > Hello, docker. {0}".format(port))
run(host='0.0.0.0', port=port)
