import os
import http.server
import socketserver

from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

PORT = 9891

def handler_from(directory):
    def _init(self, *args, **kwargs):
        return http.server.SimpleHTTPRequestHandler.__init__(self, *args, directory=self.directory, **kwargs)
    return type(f'HandlerFrom<{directory}>',
                (http.server.SimpleHTTPRequestHandler,),
                {'__init__': _init, 'directory': directory})

with socketserver.TCPServer(("", PORT), handler_from("/home/cwilvx/Music/")) as httpd:
    socketserver.TCPServer.allow_reuse_address = True
    print("serving at http://localhost:"+str(PORT))
    httpd.serve_forever()

# handler = http.server.SimpleHTTPRequestHandler
# class myHttpRequestHandler(http.server.SimpleHTTPRequestHandler):
#     def do_GET(self):
#         self.path = "/"
#         self.
#         return http.server.SimpleHTTPRequestHandler.do_GET(self)

# handler_object = myHttpRequestHandler
# my_server = socketserver.TCPServer(("", PORT), handler_object)
# my_server.serve_forever()

# with socketserver.TCPServer(("", PORT), handler) as httpd:
#     print("Serving files at http://localhost:" + str(PORT))
#     httpd.serve_forever()

home = "/home/cwilvx/Music"

@app.route("/")
def get_folders():
    folders = os.listdir(home)
    return {
        'home_folder': home,
        'all_folders': folders
        }

@app.route("/<folder>")
def get_files(folder):
    files = os.listdir("/home/cwilvx/Music/" + folder)
    print(files)
    return {'all_files': files}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)