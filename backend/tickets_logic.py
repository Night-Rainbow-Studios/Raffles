from flask_pymongo import PyMongo
from flask import Flask, jsonify, Response
import random
import datetime
from bson import json_util
import json

# app = Flask(__name__)
# app.config['MONGO_URI']='mongodb://localhost/pythonmongodb'

# mongo = PyMongo(app)

def generate_id(digits):
    if digits == 3:
        return random.randint(100, 999)
    else:
        if digits == 5:
            return random.randint(10000, 99999)

def generate_tickets(digits, amount, mongo):
    for _ in range(amount):
        ticket_id = generate_id(digits)
        mongo.db.tickets.insert_one({
            'id':ticket_id,
            'isFree':True
        })
    return 'Success'

def order_price_set(amount, price):
    total = amount * price
    return total

def generate_order(amount, price, mongo):
    payed = False
    order_id = random.randint(10000, 99999)
    total_price = order_price_set(amount, price)
    time = datetime.datetime.now()
    int_time = int(time.timestamp())
    tickets = []
    tickets = get_tickets(amount, mongo)
    print(tickets)
    mongo.db.orders.insert_one({
        'payed': payed,
        'id':order_id,
        'price':total_price,
        'time':int_time,
        'tickets':tickets
    })
    result = {"id":order_id, "price":total_price, "tickets": tickets, "time": int_time}
    return result

def generate_specific_order(selected_ticket_ids, price, mongo):

    payed = False
    order_id = random.randint(10000, 99999)
    total_price = order_price_set(len(selected_ticket_ids), price)  # Calculate based on selected tickets
    time = datetime.datetime.now()
    int_time = int(time.timestamp())

    # Get the tickets based on the selected IDs
    aparted_tickets = get_specific_tickets(selected_ticket_ids, mongo)

    # Check if all tickets were successfully retrieved
    if len(aparted_tickets) != len(selected_ticket_ids):
        print(f"Warning: Not all selected tickets were found. Order may be incomplete.")

    mongo.db.orders.insert_one({
        'payed': payed,
        'id': order_id,
        'price': total_price,
        'time': int_time,
        'tickets': aparted_tickets,  # Use the returned list of IDs
    })

    result = {"id": order_id, "price": total_price, "time": int_time}
    return result

def pay_order(id, mongo):
    mongo.db.orders.update_one({"id":id}, {'$set':{
        'payed':True
    }})
    response = {"isPayed":True}
    return response

def close_order(id, mongo):
    order = mongo.db.orders.find_one({"id":id})
    tickets_list = []
    tickets_list = order["tickets"]
    ticket_status = False
    for ticket in tickets_list:
        update_ticket(mongo, ticket, ticket_status)
    mongo.db.orders.delete_one({"id":id})
    response = jsonify({"message":"Order " + str(id) + "was deleted"})
    return response

def compare_time(mongo):
    orders = mongo.db.orders.find()
    for order in orders:
        timeStamp = order["time"] # 0 is 'id', 1 is 'payed', 2 is 'price', 3 is 'time'
        current_date = datetime.datetime.now()
        current_timestamp = int(current_date.timestamp())
        difference_seconds = current_timestamp - timeStamp
        difference_hours = difference_seconds / 3600
        if difference_hours >= 1:
            close_order(order["id"])

def finish_raffle(mongo):
    unpayed_orders = mongo.db.orders.find({"payed": False})
    for order in unpayed_orders:
        close_order(order["id"], mongo)
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
    winning_id = {"winner": winner_ticket["id"]}

    return winning_id    

def get_tickets(amount, mongo):
    tickets_collection = mongo.db.tickets
    order_tickets = []
    cursor = tickets_collection.find({"isFree": True}) #, {"_id": 0, "id": 1}
    for ticket in cursor:
        if len(order_tickets) == amount:
            return order_tickets
        order_tickets.append(ticket["id"])
        update_ticket(mongo, id=ticket["id"], isFree=ticket["isFree"])
    if not order_tickets:
        print("No se encontraron tickets libres suficientes.")
    return order_tickets

def get_specific_tickets(ticket_ids, mongo):

    tickets_collection = mongo.db.tickets
    
    aparted_tickets = []

    for ticket_id in ticket_ids:
        ticket = tickets_collection.find_one({"id": ticket_id})
        if ticket:
            aparted_tickets.append(ticket_id)
            update_ticket(mongo, id=ticket["id"], isFree=ticket["isFree"])
        else:
            print(f"Ticket con ID {ticket_id} no encontrado.")

    return aparted_tickets

def update_ticket(mongo, id, isFree):
    current_isFree = isFree
    new_status = not current_isFree
    mongo.db.tickets.update_one({"id":id}, {'$set':{
        'isFree':new_status
    }})

def clear_db(mongo):
    mongo.db.orders.delete_many({})
    mongo.db.tickets.delete_many({})
    return {"mensaje":"Borrado"}

def fetch_orders(mongo):
    orders = mongo.db.orders.find()
    response = json.loads(json_util.dumps(orders))
    return list(response)

def fetch_tickets(mongo):
    tickets = mongo.db.tickets.find()
    response = json.loads(json_util.dumps(tickets))
    return list(response)

def consult_ticket(id, mongo):
    ticket = mongo.db.tickets.find_one({"id": id})
    return ticket

def consult_order(id, mongo):
    order = mongo.db.orders.find_one({"id":id})
    response = json.loads(json_util.dumps(order))
    return response

def fetch_free_tickets(mongo):
    tickets = mongo.db.tickets.find({"isFree": True})
    response = json.loads(json_util.dumps(tickets))
    return list(response)

def ticket_frontend(ticket_id, mongo):
    """
    Busca un ticket dentro de una orden en la base de datos MongoDB y devuelve un mensaje estandarizado.

    Args:
        ticket_id (int or str): El ID del ticket a buscar.
        mongo: Una instancia de conexión a MongoDB.

    Returns:
        dict: Un diccionario JSON con los resultados de la búsqueda:
            - "ticket_id": El ID del ticket buscado.
            - "payed": Un booleano indicando si el ticket está pagado.
            - "message": Un mensaje de texto descriptivo.
    """

    order = mongo.db.orders.find_one({"tickets": ticket_id})

    if order:
        payed = order["payed"]
        message = f"Tu ticket {ticket_id} está {'pagado' if payed else 'sin pagar. Por favor, procede con el pago o se eliminará después de una hora de efectuada la orden.'}"
    else:
        payed = False
        message = "No pudimos localizar tu ticket"

    return {
        "ticket_id": ticket_id,
        "payed": payed,
        "message": message
    }