const fieldSignUpState = {
  firstName: {
    value: '',
    validateMsg: ''
  },
  lastName: {
    value: '',
    validateMsg: ''
  },
  birthDate: {
    value: '',
    validateMsg: ''
  },
  email: {
    value: '',
    validateMsg: ''
  },
  password: {
    value: '',
    validateMsg: ''
  }, 
  confirmPassword: {
    value: '',
    validateMsg: ''
  } 
}

const fieldSignInState = {
  login: {
    value: '',
    validateMsg: ''
  },
  passwordSignIn: {
    value: '',
    validateMsg: ''
  }, 
}

const fieldResetPasswordState = {
  // loginForReset: {
  //   value: ''
  // },
  secretWordForReset: {
    value: ''
  }, 
  resetPassword: {
    value: ''
  }, 
}

export {
  fieldSignUpState, 
  fieldSignInState,
  fieldResetPasswordState
}
