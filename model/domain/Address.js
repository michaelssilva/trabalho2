class Address {
  #street;
  #number;
  #CEP;
  #complement;
  #city;
  #state;
  #country;
  
  constructor(street, 
                     number,
                     complement,
                     CEP, 
                     city, 
                     state, 
                     country) {
    this.#street = street;
    this.#number = number;
    this.#complement = complement;
    this.#zipCode = zipCode;
    this.#city = city;
    this.#state = state;
    this.#country = country;
}