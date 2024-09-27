import sqlite3
import random
import datetime


def openConnection():
    connection = sqlite3.connect('./databases/main_database.db')
    cursor = connection.cursor()
    return cursor, connection

def generate_id(digits):
    if digits == 3:
        return random.randint(100, 999)
    else:
        if digits == 5:
            return random.randint(10000, 99999)

def generate_tickets(digits, amount):
    cursor, connection = openConnection()
    for _ in range(amount):
        ticket_id = generate_id(digits)
        cursor.execute("INSERT INTO tickets (id, isFree) VALUES (?, ?)", (ticket_id, True))
    connection.close
    return "Success"

def generate_order(amount, price):
    payed = False
    cursor, connection = openConnection()
    order_id = random.randint(10000, 99999)
    print("ID Lista: ", order_id)
    total_price = order_price_set(amount, price)
    print("Precio listo: ", total_price)
    time = datetime.datetime.now()
    print("Fecha lista: ", time)
    int_time = int(time.timestamp())
    cursor.execute("insert into orders (id, payed, price, date) VALUES (?, ?, ?, ?)", (order_id, payed, total_price, int_time))
    connection.close
    print("Agregado a la base de datos")
    relacionar_tickets(order_id, amount)
    return order_id

def pay_order(id):
    cursor, connection = openConnection()
    cursor.execute("UPDATE orders SET payed = 1 WHERE id = ?", (id,))
    print("Orden pagada")
    connection.commit()
    connection.close()

def create_database():
    cursor, connection = openConnection()
    cursor.execute("create table tickets (id integer, isFree boolean)")
    cursor.execute("create table orders (id integer primary key, payed boolean, price numeric(8,2), date integer)")
    cursor.execute("""
        CREATE TABLE order_tickets (
            order_id INTEGER,
            ticket_id INTEGER,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (ticket_id) REFERENCES tickets(id)
        )
    """)
    connection.close
    return "Created"

def closeOrder(id):
    cursor, connection = openConnection()
    cursor.execute("select ticket_id from order_tickets where order_id = ?", (id))
    ticket_ids = cursor.fetchall()
    connection.close()
    for row in ticket_ids:
        update_ticket(row)
    cursor.execute("delete from order_tickets where order_id = ?", (id))
    cursor.close()
    return "Closed"

def compareTime():
    cursor, connection = openConnection()
    cursor.execute("select * from orders")
    orders = cursor.fetchall()
    connection.close()

    for row in orders:
        timeStamp = row[3] # 0 is 'id', 1 is 'payed', 2 is 'price', 3 is 'date'
        current_date = datetime.datetime.now()
        current_timestamp = int(current_date.timestamp())
        difference_seconds = current_timestamp - timeStamp
        difference_hours = difference_seconds / 3600
        if difference_hours >= 6:
            closeOrder(row[0])

def finishRaffle():
    cursor, connection = openConnection()
    cursor.execute("select id from orders where payed = :f", {"f":"false"})
    orders = cursor.fetchall()
    print("Terminando rifa. Todas las ordenes cargadas.")
    connection.close()
    for order in orders:
        print("Cerrando orden", order)
        closeOrder(order)
    cursor.execute("select id from tickets where isFree =:f", {"f":"false"})
    print("Cargando tickets, eligiendo al ganador.")
    tickets = cursor.fetchall()
    random_row = random.choice(tickets)
    winner = random_row[0]
    return winner
        

def order_test(amount):
    cursor, connection = openConnection()
    cursor.execute("insert into orders (id, payed, price) VALUES (?, ?, ?)", (1, 1, 1, 500))
    relacionar_tickets(1, amount)
    connection.close

def relacionar_tickets(order, amount):
    cursor, connection = openConnection()
    amountcito = 0
    print("imprimiendo tickets de prueba")
    cursor.execute("select * from tickets where isFree=1")
    tickets = cursor.fetchall()
    print(tickets)
    connection.close
    for row in tickets:
        print(row)
        print(amountcito, amount)
        print("Imprimiendo row")
        print(len(tickets))
        if (amountcito == amount):
            print("Conditions met")
            break
        print("************")
        cursor.execute("insert into order_tickets (order_id, ticket_id) VALUES (?, ?)", (order, row[0]))
        update_ticket(row[0])
        connection.close
        amountcito += 1
    connection.close()

def order_check():
    cursor, connection = openConnection()
    for row in cursor.execute("select * from order_tickets"):
        print(row)
    connection.close

def order_price_set(amount, price):
    total = amount * price
    return total

def test_database():
    cursor, connection = openConnection()
    for row in cursor.execute("select * from tickets"):
        print(row)
    connection.close

def clear_DB():
    cursor, connection = openConnection()
    cursor.execute("delete from order_tickets")
    print("Borrada base de datos relacional.")
    cursor.execute("delete from orders")
    print("Borrada tabla de ordenes.")
    cursor.execute("delete from tickets")
    print("Borrados todos los tickets.")
    connection.close

def update_ticket(id):
    cursor, connection = openConnection()
    cursor.execute("SELECT isFree FROM tickets WHERE id = ?", (id,))
    result = cursor.fetchone()
    if result:
        current_is_Fre = result[0]
        new_status = not current_is_Fre
        cursor.execute("UPDATE tickets SET isFree = ? WHERE id = ?", (new_status, id))
        connection.close
    else:
        print(f"No se encontró el registro con ID {id} en la tabla tickets")
        connection.close

def consult_database():
    cursor, connection = openConnection()
    cursor.execute("select * from tickets")
    searcher = cursor.fetchall()
    print(searcher)
    print("*****")
    connection.close
    return searcher

if __name__ == "__main__":
    create_database()
    print("Base de datos creada.")
    generate_tickets(3, 20)
    print("Database generated")
    orderID = generate_order(5,5)
    print("Orden lista: ", orderID)
    secondOrder = generate_order(4, 5)
    print("Segunda orden lista: ", secondOrder)
    thirdOrder = generate_order(2, 5)
    print("Tercera orden lista: ", thirdOrder)
    pay_order(orderID)
    print("Primera orden pagada")
    pay_order(secondOrder)
    print("Segunda orden pagada")
    winner = finishRaffle()
    print("El ganador es: ", winner)
    clear_DB()
    print("Rifa completada.")