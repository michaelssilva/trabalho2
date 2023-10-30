import {User} from "./User.js";

export class UserRepositoryManager {
  static userRepository;

  static loadRepository (userRepositoryURL) {
    if (localStorage["userRepository"]) {
        this.userRepository = JSON.parse(localStorage.getItem("userRepository"));
      } else if(userRepositoryURL) {
        this.userRepository = fetch(userRepositoryURL)
        .then(response => response.json())
        .then(data => {
          localStorage.setItem("userRepository", JSON.stringify(data));
          return data;
        }).catch(error => console.log(error));
      } else {
        let defaultRepositoryURL = "./UserRepository.json";
        this.userRepository = fetch(userRepositoryURL)
          .then(response => response.json())
          .then(data => {
            localStorage.setItem("userRepository", JSON.stringify(data));
            return data;
        }).catch(error => console.log(error))
      }
    }

  static async contains(user) {
    let exists = false;
    if (await this.getUserByUsername(user.getUsername()) !== null) {
      exists = true;
      return "username";
    } else if (await this.getUserByEmail(user.getEmail()) !== null) {
      exists = true;
      return "email";
    } else if (await this.getUserById(user.getId()) !== null) {
      exists = true;
      return "id";
    }
    return exists;
  }

  static async generateId() {
    let repository = await this.userRepository;
    return repository.length+1;
  }

  static async getUsers() {
    if (await this.userRepository) {
      return this.userRepository;
    } else {console.log("Falha em retornar usuários")}
  }

  static async getUserById(userId) {
    let repository = await this.userRepository
    if (repository) {
      let userFound = false;
      for (let i = 0; i < repository.length; i++) {
        if (repository[i]["id"] == userId) {
          userFound = repository[i];
        }
      }

      if (userFound && userFound.active) {
        userFound = new User(userFound["id"], userFound["username"],
                             userFound["email"], userFound["password"],
                             userFound["addresses"], userFound["cart"],
                             userFound["purchases"]);
      }
      return userFound;
    } else {
      console.log("Falha em acessar o banco de dados");
      return null;
    }
  }

  static async getUserByUsername(username) {
    let repository = await this.userRepository
    if (repository) {
      let userFound = false;
      for (let i = 0; i < repository.length; i++) {
        if (repository[i]["username"] == username) {
          userFound = repository[i];
        }
      }

      if (userFound && userFound.active) {
        userFound = new User(userFound["id"], userFound["username"],
                             userFound["email"], userFound["password"],
                             userFound["addresses"], userFound["cart"],
                             userFound["purchases"]);
      }
      return userFound;
    } else {console.log("Falha em acessar o banco de dados")}
  }

  static async getUserByEmail(email) {
    let repository = await this.userRepository

    if (repository) {
      let userFound = false;
      for (let i = 0; i < repository.length; i++) {
        if (repository[i]["email"] == email) {
          userFound = repository[i];
        }
      }

      if (userFound && userFound.active) {
      userFound = new User(userFound["id"], userFound["username"],
                           userFound["email"], userFound["password"],
                           userFound["addresses"], userFound["cart"],
                           userFound["purchases"]);
      }
      return userFound;
    } else {console.log("Falha em acessar o banco de dados")}
  }

  static async addUser(user) {
    let repository = await this.userRepository;
    let exists = await this.contains(user);

    if (user) {
      if (user.getId() === null) {        
        let newId = await this.generateId()
        user = new User(newId, user.getUsername(), user.getEmail(),
                        user.getPassword(), user.getAddressList(),
                        user.getCart(), user.getPurchases());
      }

      if (!exists && user.getUsername() !== null &&
      user.getEmail() !== null && user.getPassword() !== null) {
        repository.push(user);
        localStorage["userRepository"] = JSON.stringify(repository);
        return this;
      } else {
        return false;
      }
    }
  }

  static async updateUser(user) {
    let repository = await this.userRepository;
    let exists = await this.contains(user);
    let temporaryUser;

    switch (exists) {
      case "id":
        temporaryUser = await this.getUserById(user.getId());
        repository[temporaryUser.getId()-1] = temporaryUser;
        localStorage["userRepository"] = JSON.stringify(repository);
        break; 
      case "username":
        temporaryUser = await this.getUserByUsername(user.getUsername());
        repository[temporaryUser.getId()-1] = temporaryUser;
        localStorage["userRepository"] = JSON.stringify(repository);
        break;
      case "email":
        temporaryUser = await this.getUserByEmail(user.getEmail());
        repository[temporaryUser.getId()-1] = temporaryUser;
        localStorage["userRepository"] = JSON.stringify(repository); 
        break;
    }
  }

  static deleteUser(user) {this.updateUser(user);}
}
