class UserRepositoryManager {
  #userRepository;

  constructor (userRepositoryURL) {
    repositoryURL = userRepositoryURL;
    this.#userRepository = require(repositoryURL)
  }

  static loadRepository () {
    //TODO
  }
  
  static getUsers() {
    //TODO: ler o arquivo UserRepository.json
  }

  static getUser(userId) {    
    //TODO: ler o arquivo UserRepository.json
  }

  static addUser(user) {
    //TODO: escrever no UserRepository.json
  }

  static updateUser(user) {
    //TODO: escrever no UserRepository.json
  }

  static deleteUser(user) {
    //TODO: escrever no UserRepository.json
  }
  }
}