from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
import hero_databases
import tickets_logic

app = Flask(__name__)
cors = CORS(app, origins="*")
app.config['MONGO_URI']='mongodb://localhost/pythonmongodb'
db = PyMongo(app)

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

@app.route("/api/tickets", methods=["POST"])
def generateTickets(digits, amount, db):
    tickets = tickets_logic.generate_tickets(digits, amount, db)
    return tickets

@app.route("/api/ticket", methods = ["GET"])
def fetchTickets(db):
    consulted = tickets_logic.fetch_tickets(db)
    return consulted

@app.route("/api/orders", methods = ["POST"])
def generateOrder(amount, price, db):
    order = tickets_logic.generate_order(amount, price, db)
    return order

@app.route("/api/orders", methods = ["PUT"])
def closeOrder(id, db):
    order = tickets_logic.close_order(id, db)
    return order

@app.route("/api/order/<id>", methods = ["PUT"])
def payOrder(id, db):
    order = tickets_logic.pay_order(id, db)
    return order

@app.route("/api/ticket/<id>", methods = ["GET"])
def consultTicket(id, db):
    ticket = tickets_logic.consult_ticket(id, db)
    return ticket

@app.route("/api/order/<id>", methods = ["GET"])
def consultOrder(id, db):
    order = tickets_logic.consult_order(id, db)
    return order

if __name__ == "__main__":
    app.run(debug=True, port=8080)