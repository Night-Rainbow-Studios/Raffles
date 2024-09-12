import json

def write_database(data):

    json_string = json.dumps(data, indent=2)
    with open("databases/landing_data.json", 'w') as f:
        f.write(json_string)

def catch_new_data(key, new_content):
    with open("databases/landing_data.json") as f:
        new_data = json.load(f)
        new_data.update({key:new_content})
        write_database(new_data)

if __name__ == "__main__":

    modifier_key = "title"
    print("Write the new title")
    testing_title = input()
    catch_new_data(modifier_key, testing_title)
    print("Updated database.")