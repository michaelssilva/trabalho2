import {UserRepositoryManager} from "./UserRepositoryManager.js";

export class User {

  constructor(id, username, email, password,
              addresses=[], cart=[], purchases=[], active) {
    if (typeof(id) === "object" && id !== null) {
      try {
        this.id = id.getId();
        this.username = id.getUsername();
        this.email = id.getEmail();
        this.password = id.getPassword();
        this.cart = id.getCart();
        this.addresses = id.getAddressList();
        this.purchases = id.getPurchases();
        this.active = true;
      } catch(e) {
        console.log(e);
      }
    } else if (username) {
      this.id = (id) ? id : null;
      this.username = username;
      this.email = (email) ? email : null;
      this.password = (password) ? password : null;
      this.cart = (cart) ? cart : [];
      this.addresses = (addresses) ? addresses : [];
      this.purchases = (purchases) ? purchases : [];
      this.active = (true) ? active : true;
    } else {
      console.log("Parâmetro ausente")
      return null;
    }
  }


  signIn() {
    localStorage["user"] = JSON.stringify(this);
  }

  logout() {
    localstorage.removeItem("user");
  }

  async saveUserIfNotExists() {
    let isSaved = await UserRepositoryManager.addUser(this);
    return isSaved;
  }

  async saveUser() {
    let isSaved = true;
    let force = !(await UserRepositoryManager.addUser(this));
    if (force) {
      await UserRepositoryManager.updateUser(this);
    }
  }

  addProductToCart(product) {
    this.cart.push(product);
  }
  removeProductFromCart(product) {
    return this.cart.filter(item => item != product);
  }

  isActive() {return this.active}

  deactivate() {
    this.active = false;
    UserRepositoryManager.updateUser(this);
  }

  getId() {return this.id;}

  getUsername() {return this.username;}
  setUsername(newUsername) {
    this.username = newUsername;
  }

  getPassword() {return this.password;}
  setPassword(newPassword) {
    this.password = newPassword;
  }

  getEmail() {return this.email;}
  setEmail(newEmail) {this.email = newEmail;}

  getPurchases() {return this.purchases;}
  buyCart(cart) {this.purchases.push(cart);}

  getAddressList() {return this.addresses;}
  getAddress(index) {return this.addresses[index];}
  addAddress(address) {this.addresses.push(address);}

  getCart() {return this.cart;}

}