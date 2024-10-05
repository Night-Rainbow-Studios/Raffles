from flask_pymongo import PyMongo
from flask import Flask, jsonify, Response
import random
import datetime

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
    total_price = order_price_set(amount, price)
    time = datetime.datetime.now()
    int_time = int(time.timestamp())
    tickets = []
    tickets = get_tickets(amount)
    order = mongo.db.orders.insert_one({
        'payed': payed,
        'id':order_id,
        'price':total_price,
        'time':int_time,
        'tickets':tickets
    })
    return order

def pay_order(id):
    status = mongo.db.orders.update_one({"id":id}, {'$set':{
        'payed':True
    }})
    return status

def close_order(id):
    order = mongo.db.orders.find_one({"id":id})
    tickets_list = []
    tickets_list = order["tickets"]
    for ticket in tickets_list:
        update_ticket(ticket)
    mongo.db.orders.delete_one({"id":id})
    response = jsonify({"message":"Order " + id + "was deleted"})
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
    unpayed_orders = mongo.db.orders.find({"payed":False})
    for order in unpayed_orders:
        close_order(order["id"])
    final_tickets = mongo.db.tickets.find({"isFree":False})
    random_ticket = random.choice(final_tickets)
    winner = random_ticket["id"]
    return winner    

def get_tickets(amount):
    tickets_collection = mongo.db.tickets
    order_tickets = []
    cursor = tickets_collection.find({"isFree": True}) #, {"_id": 0, "id": 1}
    for ticket in cursor:
        if len(order_tickets) == amount:
            return order_tickets
        order_tickets.append(ticket["id"])
        update_ticket(ticket)
    if not order_tickets:
        print("No se encontraron tickets libres suficientes.")
    return order_tickets

def update_ticket(**ticket):
    current_isFree = ticket["isFree"]
    new_status = not current_isFree
    mongo.db.tickets.update_one({"_id":ticket["_id"]}, {'$set':{
        'isFree':new_status
    }})

def clear_db():
    mongo.db.orders.delete_many()
    mongo.db.tickets.delete_many()
    return "Deleted"

def fetch_orders():
    orders = mongo.db.orders.find()
    return orders

def fetch_tickets():
    tickets = mongo.db.tickets.find()
    return tickets

def consult_ticket(id):
    ticket = mongo.db.tickets.find_one({"id": id})
    return ticket

def consult_order(id):
    order = mongo.db.orders.find_one({"id":id})
    return order

if __name__ == "__main__":
    