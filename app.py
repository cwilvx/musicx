from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

@app.route("/")
def get_folders():
    folders = os.listdir("/home/cwilvx/Music")
    return {'all_folders': folders}

@app.route("/<folder>")
def get_files(folder):
    files = os.listdir("/home/cwilvx/Music/" + folder)
    return {'all_files': files}

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)