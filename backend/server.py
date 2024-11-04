from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
from flask_cors import CORS
import json
import hero_databases
import tickets_logic

app = Flask(__name__)
cors = CORS(app)
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
def generateTickets():
    tickets_logic.generate_tickets(int(request.args.get("digits")), int(request.args.get("amount")), db)
    return {"message":"Success"}

@app.route("/api/tickets", methods = ["GET"])
def fetchTickets():
    consulted = tickets_logic.fetch_tickets(db)
    return consulted

@app.route("/api/orders", methods = ["POST"])
def generateOrder():
    order = tickets_logic.generate_order(int(request.args.get("amount")), int(request.args.get("price")), db)
    return order

@app.route("/api/closeOrder/<id>", methods = ["PUT"])
def closeOrder(id):
    order = tickets_logic.close_order(int(id), db)
    return order

@app.route("/api/order/<id>", methods = ["PUT"])
def payOrder(id):
    payed = tickets_logic.pay_order(int(id), db)
    return payed

@app.route("/api/ticket/<id>", methods = ["GET"])
def consultTicket(id):
    ticket = tickets_logic.consult_ticket(int(id), db)
    return jsonify(ticket)

@app.route("/api/order/<id>", methods = ["GET"])
def consultOrder(id):
    order = tickets_logic.consult_order(int(id), db)
    return order

@app.route("/api/winner", methods = ["PUT"])
def finishRaffle():
    winner = tickets_logic.finish_raffle(db)
    return winner

@app.route("/api/clear", methods = ["PUT"])
def clearDatabase():
    clearer = tickets_logic.clear_db(db)
    return clearer

@app.route("/api/orders", methods = ["GET"])
def fetchOrders():
    orders = tickets_logic.fetch_orders(db)
    return orders

@app.route("/api/freeTickets", methods = ["GET"])
def fetchFreeTickets():
    freetickets = tickets_logic.fetch_free_tickets(db)
    return freetickets

@app.route("/api/specificOrder", methods = ["POST"])
def generateSpecificOrder():
    order_data = request.get_json()
    selected_tickets = order_data.get('selected_tickets', [])  # Obtener los IDs de los tickets
    price = order_data.get('price', 0.0)  # Obtener el precio

    specific_order = tickets_logic.generate_specific_order(selected_tickets, price, db)
    return specific_order

if __name__ == "__main__":
    app.run(debug=True, port=8080)