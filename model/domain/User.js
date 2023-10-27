class User {
    #userId;
    #username;
    #password;
    #addresses;
    #cart;
    #purchases;

     constructor(username,
                password, 
                addresses=[],
                cart=[]){
      this.#username = username;
      this.#password = password;
      this.#cart = cart;
      this.#addresses = addresses;
    }

     saveUser() {
      //TODO: escrever no UserRepository
    }

     getUserId() {return this.#userId;}

     getUsername() {return this.#username;}
     setUsername(newUsername) {
      this.#username = newUsername;
    }

     getPassword() {return this.#password;}
     setPassword(newPassword) {
      this.#password = newPassword;
    }

     getAddressList () {return this.#addresses;}
     getAddress(index) {return this.#addresses[index];}
     addAddress(address) {this.#addresses.push(address);}

     getCart() {return this.#cart;}
     addProductToCart(product) {
      this.#cart.push(product);
    }
     removeProductFromCart(product) {
      return this.#cart.filter(item => item != product);
    }

     buyCart() {
      //TODO: iniciar processo de compra dos produtos no carrinho
    }
}