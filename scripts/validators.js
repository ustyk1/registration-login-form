import { fieldSignUpState  } from './state.js'

const validateFirstName = value => {
  let errorMsg = '';

  const isTooShort = value.length <= 1;
  const isHasDigit = value.match(/\d/);

  if (isTooShort && !isHasDigit) {
    errorMsg = 'Your first name is too short!';
  } else if (isHasDigit) {
    errorMsg = 'Your first name is incorrect!';
  }
  
  return errorMsg;
}

const validateLastName = value => {
  let errorMsg = '';

  const isTooShort = value.length <= 1;
  const isHasDigit = value.match(/\d/);

  if (isTooShort && !isHasDigit) {
    errorMsg = 'Your last name is too short!';
  } else if (isHasDigit) {
    errorMsg = 'Your last name is incorrect';
  }
  
  return errorMsg;
}

const validateEmail = value => { 
  let errorMsg = '';

  const isValid = !!value.toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
  !isValid &&  (errorMsg = 'Email format is incorrect!');
  return errorMsg;
}

const validateBirthDate = value => {
  return ''
}

const validatePassword = value => {
  let color;
  let errorMsg = '';

  const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{10,})')
  const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')

  if (strongPassword.test(value)) {
    color = '#3dd809';
  } else if (mediumPassword.test(value)) {
    color = '#eeff02';
  } else {
    color = '#ff0000'
    errorMsg = 'Password is invalid!';
  }
  
  document.querySelector('[data-for-validate="for-validate"]').style.color = color;
  return errorMsg;
}

const validateConfirmPassword = value => {
  let color;
  let errorMsg = '';
  const isConfirmed = fieldSignUpState.password.value === value;

  if (isConfirmed) {
    color = '#3dd809';
  } else {
    errorMsg = 'Not confirmed!';
    color = '#ff0000';
  }
  document.querySelector('#confirm-password').style.color = color;

  return errorMsg;
}

export const validators = {
  firstName: validateFirstName,
  lastName: validateLastName,
  email: validateEmail,
  birthDate: validateBirthDate,
  password: validatePassword, 
  confirmPassword: validateConfirmPassword
}
