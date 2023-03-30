import { User } from './user.js'

export class UserStorage {

  constructor() {}
  
  #setData(identifier, data) {
    localStorage.setItem(identifier, JSON.stringify(data))
  }

  #getData(identifier) {
    return JSON.parse(localStorage.getItem(identifier))
  }

  isSignedUp(id) {
    const user = localStorage.getItem(id)
    let isSignedUp = false;

    if (user) {
      isSignedUp = true;
    } 

    return isSignedUp;
  }

  isConfirmedPassword(email, password, secretWord='') {
    const user = this.#getData(email)
    let isConfirmed = false;

    if (user.password === password && !secretWord) {
      isConfirmed = true;
    } else if (secretWord === user.secretWord) {
      isConfirmed = true;
    }

    return isConfirmed;
  }

  create(userData) {
    this.data = new User(...userData)
    this.#setData(this.data.id, this.data);
  }

  get(email) {
    const user = this.#getData(email);
    return user;
  }

  delete(email) {
    localStorage.removeItem(email);
    this.deleteCurrentUser();
  }
  
  changePassword(email, newPassword) {
    const user = this.#getData(email);
    user.password = newPassword;
    user.confirmPassword = newPassword;

    this.#setData(email, user);

    if ( this.isSignedUp('currentUser') ) {
      this.#setData('currentUser', user);
    }
  }

  setCurrentUser(currentUser) {
    this.#setData('currentUser', currentUser);
  }

  getCurrentUser() {
    return this.#getData('currentUser');
  }
  
  deleteCurrentUser() {
    localStorage.removeItem('currentUser');
  }

  
}
