import os


from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

music_dir = os.environ.get("music_dir")
PORT = os.environ.get("PORT")

@app.route("/")
def get_folders():
    folders = os.listdir(music_dir)
    return {
        'home_folder': music_dir,
        'server_port': 'http://localhost:{}'.format(PORT),
        'all_folders': folders
        }

@app.route("/<folder>")
def get_files(folder):
    files = os.listdir("/home/cwilvx/Music/" + folder)
    print(files)
    return {'all_files': files}


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)

