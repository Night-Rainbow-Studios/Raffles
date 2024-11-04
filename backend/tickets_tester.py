from flask_pymongo import PyMongo
from flask import Flask, jsonify, Response
import random
import datetime
import json
from bson import json_util

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/pythonmongodb'
mongo = PyMongo(app)

def generate_id(digits):
    if digits == 3:
        return random.randint(100, 999)
    else:
        if digits == 5:
            return random.randint(10000, 99999)
    print("ID generated")

def generate_tickets(digits, amount):
    for _ in range(amount):
        ticket_id = generate_id(digits)
        mongo.db.tickets.insert_one({
            'id':ticket_id,
            'isFree':True
        })
        print("ticket " + str(ticket_id) + " added to database")
    return 'Success'

def order_price_set(amount, price):
    total = amount * price
    return total

def generate_order(amount, price):
    payed = False
    order_id = random.randint(10000, 99999)
    print('ID created: ' + str(order_id))
    total_price = order_price_set(amount, price)
    print('Total price added: ' + str(total_price))
    time = datetime.datetime.now()
    int_time = int(time.timestamp())
    print("Order registered at " + str(int_time))
    tickets = []
    tickets = get_tickets(amount)
    print("Your tickets are: ")
    print(tickets)
    mongo.db.orders.insert_one({
        'payed': payed,
        'id':order_id,
        'price':total_price,
        'time':int_time,
        'tickets':tickets
    })
    return order_id

def pay_order(id):
    mongo.db.orders.update_one({"id":id}, {'$set':{
        'payed':True
    }})
    print("order " + str(id) + " has been payed")
    isPayed = True
    return isPayed

def close_order(id):
    order = mongo.db.orders.find_one({"id":id})
    tickets_list = []
    tickets_list = order["tickets"]
    ticket_status = False
    for ticket in tickets_list:
        update_ticket(ticket, ticket_status)
    mongo.db.orders.delete_one({"id":id})
    response = jsonify({"message":"Order " + str(id) + "was deleted"})
    return response

def compare_time():
    orders = mongo.db.orders.find()
    for order in orders:
        timeStamp = order["time"] # 0 is 'id', 1 is 'payed', 2 is 'price', 3 is 'time'
        current_date = datetime.datetime.now()
        current_timestamp = int(current_date.timestamp())
        difference_seconds = current_timestamp - timeStamp
        difference_hours = difference_seconds / 3600
        if difference_hours >= 6:
            close_order(order["id"])

def finish_raffle():
    unpayed_orders = mongo.db.orders.find({"payed": False})
    for order in unpayed_orders:
        close_order(order["id"])
        print("Closed order", order["id"])

    # Contar los tickets sin pagar manualmente
    num_tickets = 0
    for _ in mongo.db.tickets.find({"isFree": False}):
        num_tickets += 1

    # Si no hay tickets sin pagar, retorna None
    if num_tickets == 0:
        return None

    # Saltar un número aleatorio de documentos y elegir el siguiente
    random_skip = random.randrange(num_tickets)
    winner_ticket = mongo.db.tickets.find({"isFree": False}).skip(random_skip).limit(1).next()

    return winner_ticket["id"]

def get_tickets(amount):
    tickets_collection = mongo.db.tickets
    order_tickets = []
    cursor = tickets_collection.find({"isFree": True}) #, {"_id": 0, "id": 1}
    for ticket in cursor:
        if len(order_tickets) == amount:
            return order_tickets
        order_tickets.append(ticket["id"])
        update_ticket(id=ticket["id"], isFree=ticket["isFree"])
    if not order_tickets:
        print("No se encontraron tickets libres suficientes.")
    return order_tickets

def update_ticket(id, isFree):
    current_isFree = isFree
    new_status = not current_isFree
    mongo.db.tickets.update_one({"id":id}, {'$set':{
        'isFree':new_status
    }})

def clear_db():
    mongo.db.orders.delete_many({})
    mongo.db.tickets.delete_many({})
    return "Deleted"

def fetch_orders():
    orders = mongo.db.orders.find()
    return list(orders)

def fetch_tickets():
    tickets = mongo.db.tickets.find()
    return list(tickets)

def consult_ticket(id):
    ticket = mongo.db.tickets.find_one({"id": id})
    return ticket

def consult_order(id):
    order = mongo.db.orders.find_one({"id":id})
    response = json.loads(json_util.dumps(order))
    return response

if __name__ == "__main__":
    listed = close_order(59802)
    print(listed)
