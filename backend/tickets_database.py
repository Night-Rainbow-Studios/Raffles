import sqlite3
import random

connection = sqlite3.connect('./databases/main_database.db')
cursor = connection.cursor()

def generate_id(digits):
    if digits == 3:
        return random.randint(100, 999)
    else:
        if digits == 5:
            return random.randint(10000, 99999)

def generate_tickets(digits, amount):
    for _ in range(amount):
        ticket_id = generate_id(digits)
        cursor.execute("INSERT INTO tickets (id, isFree) VALUES (?, ?)", (ticket_id, True))
    connection.close

def generate_order(amount, price, payed):
    order_id = random.randint(10000, 99999)
    total_price = order_price_set(amount, price)
    cursor.execute("insert into orders (id, payed, price) VALUES (?, ?, ?)", (order_id, payed, total_price))
    connection.close
    relacionar_tickets(order_id, amount)

def create_database():
    cursor.execute("create table tickets (id integer, isFree boolean)")
    cursor.execute("create table orders (id integer primary key, payed boolean, price numeric(8,2))")
    cursor.execute("""
        CREATE TABLE order_tickets (
            order_id INTEGER,
            ticket_id INTEGER,
            FOREIGN KEY (order_id) REFERENCES orders(id),
            FOREIGN KEY (ticket_id) REFERENCES tickets(id)
        )
    """)
    connection.close

def order_test(amount):
    cursor.execute("insert into orders (id, payed, price) VALUES (?, ?, ?)", (1, 1, 1, 500))
    relacionar_tickets(1, amount)
    connection.close

def relacionar_tickets(order, amount):
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

def order_check():
    for row in cursor.execute("select * from order_tickets"):
        print(row)
    connection.close

def order_price_set(amount, price):
    total = amount * price
    return total

def test_database():
    for row in cursor.execute("select * from tickets"):
        print(row)
    connection.close

def clear_tickets():
    cursor.execute("delete from tickets")
    connection.close

def update_ticket(id):
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
    cursor.execute("select * from tickets where isFree=:t", {"t":"true"})
    searcher = cursor.fetchall()
    print(searcher)
    print("*****")
    connection.close

def insert_data():
    cursor.execute("insert into tickets values (?,?)", ("29472", "true"))
    for row in cursor.execute("select * from tickets"):
        print(row)

    connection.close

if __name__ == "__main__":
    generate_tickets(3, 20)
    test_database()
    order_test(5)
    order_check()
    print("Estado actual de tickets")
    test_database()