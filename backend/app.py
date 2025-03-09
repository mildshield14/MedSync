from flask import Flask
import json
import os


app = Flask(__name__)

project_root = os.path.abspath(os.path.dirname(__file__))

@app.route('/')
def home():
    return "/"


if __name__ == '__main__':
    app.run(debug=True)


