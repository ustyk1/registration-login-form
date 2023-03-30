export class User {
  constructor(firstName, lastName, birthDate, secretWord, email, password, confirmPassword) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.secretWord = secretWord;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.id = email;
  }
}
