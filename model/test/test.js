import {UserRepositoryManager} from "../service/UserRepositoryManager.js";
import {User} from "../domain/User.js";

console.log("Hello world no console!");
localStorage.removeItem("userRepository");

UserRepositoryManager.loadRepository();


var userData = {
  "username": "asmodeus",
  "email": "asmodeus@gmail.com",
  "password": "555",
  "addresses": {"street": "Rua dos Panamericana", 
                "number": "666", 
                "CEP": "66666-666", 
                "city": "Juquitiba", 
                "state": "São Paulo",
                "country": "Brasil"},
  "cart": [],
  "purchases": []
};

var user = new User(null, userData["username"], userData["email"], "123");
var user2 = new User(null, "zeus", "zeus@gmail.com", "555")
var user3 = new User(await UserRepositoryManager.getUserById(1));


console.log (user2);