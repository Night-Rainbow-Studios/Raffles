from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import hero_databases
import tickets_database

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

@app.route("/api/createDB", methods=["POST"])
def createDB():
    db = tickets_database.create_database()
    return db

@app.route("/api/generateTickets", methods=["POST"])
def generateTickets(digits, amount):
    tickets = tickets_database.generate_tickets(digits, amount)
    return tickets

@app.route("/api/generateOrder", methods = ["POST"])
def generateOrder(amount, price):
    order = tickets_database.generate_order(amount, price)
    return order

@app.route("/api/consultTickets", methods = ["GET"])
def consultTickets():
    consulted = tickets_database.consult_database()
    return consulted

@app.route("/api/closeOrder", methods = ["PUT"])
def closeOrder(id):
    order = tickets_database.closeOrder(id)
    return order

if __name__ == "__main__":
    app.run(debug=True, port=8080)