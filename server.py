import os
import http.server
import socketserver

music_dir = str(os.environ.get("music_dir"))
PORT = int(os.environ.get("PORT"))
print(PORT)

def handler_from(directory):
    def _init(self, *args, **kwargs):
        return http.server.SimpleHTTPRequestHandler.__init__(self, *args, directory=self.directory, **kwargs)
    return type(f'HandlerFrom<{directory}>',
                (http.server.SimpleHTTPRequestHandler,),
                {'__init__': _init, 'directory': directory})


with socketserver.TCPServer(("", PORT), handler_from(music_dir)) as httpd:
    socketserver.TCPServer.allow_reuse_address = True
    # print("serving at http://localhost:"+str(PORT))
    try:
        httpd.serve_forever()
    except(KeyboardInterrupt):
        httpd.shutdown()
        httpd.server_close()
