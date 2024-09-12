from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import hero_databases

app = Flask(__name__)
cors = CORS(app, origins="*")

@app.route("/api/update", methods=["PUT"])
def updateData():
    testing = request.get_json()
    for key in testing.keys():
        new_content = testing.get(key)
        hero_databases.catch_new_data(key, new_content)
    return "Content updated"

@app.route("/api/hero", methods=["GET"])
def hero ():
    with open("databases/landing_data.json") as hero_data:
        data = json.load(hero_data)
    return data

if __name__ == "__main__":
    app.run(debug=True, port=8080)