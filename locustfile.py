# locustfile.py

from locust import HttpLocust, TaskSet, task 
import random


class UserBehaviour(TaskSet):
    def on_start(self):
        self.client.get("/api/org.sopb.mynetwork.Owner")
    
    @task
    def some_task(self):
        user = {
            "$class": "org.sopb.mynetwork.Owner", 
            "type": "CUSTOMER", 
            "userId": random.randint(1, 99999), 
            "userName":"Arief Septian Nurhada"
        }

        self.client.post("/api/org.sopb.mynetwork.Owner", json=user)
     
class User(HttpLocust):
    task_set = UserBehaviour
    min_wait = 0
    max_wait = 0

