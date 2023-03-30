const { fromEvent, merge } = rxjs;

import { 
  handleButtonStyle, 
  showMsgBox, 
  hideMsgBox ,
  clearInputsValue
} from'../../scripts/service.js';
import { page } from '../../scripts/routers.js';
import { fieldResetPasswordState } from '../../scripts/state.js';
import { UserStorage } from '../../scripts/userStorage.js';
import { validators } from'../../scripts/validators.js'

const secretWord$ = fromEvent(document.querySelector('#secret-word-for-reset'), 'input');
const newPassword$ = fromEvent(document.querySelector('#resetPassword'), 'input');

const $resetPasswordForm = document.querySelector('#reset-password-form');
const $login = document.querySelector('#login-for-reset');
const $goToSignInBtn = document.querySelector('#go-to-sign-in'); 
const $goToSignUpBtn = document.querySelector('#go-to-sign-up');

secretWord$.subscribe(event => {
  const userStorage = new UserStorage();

  const inputValue = event.target.value;
  const inputName = event.target.name;
 
  if (userStorage.isSignedUp($login.value) && userStorage.isConfirmedPassword($login.value, undefined, inputValue)) {
    fieldResetPasswordState[inputName].value = true;
    hideMsgBox('#password-or-secret-word-not-match-msg-box');
  } else {
    showMsgBox('#password-or-secret-word-not-match-msg-box');
  }
  handleButtonStyle('reset-btn', fieldResetPasswordState)
})

newPassword$.subscribe(event => {
  const inputValue = event.target.value;
  const inputName = event.target.name;
  fieldResetPasswordState[inputName].value = false;

  let msg =  validators['password'](inputValue);

  if (msg) {
    showMsgBox('#password-for-reset-invalid-msg-box');
  } else {
    hideMsgBox('#password-for-reset-invalid-msg-box');
    fieldResetPasswordState[inputName].value = true;
  } 
  handleButtonStyle('reset-btn', fieldResetPasswordState)
})

fromEvent($resetPasswordForm, 'submit')
.subscribe(event => {
  event.preventDefault();

  const form = new FormData(event.target);
  const loginForReset = form.get('loginForReset');
  const newPassword = form.get('resetPassword');

  const userStorage = new UserStorage();
  userStorage.changePassword(loginForReset, newPassword);

  clearInputsValue($resetPasswordForm);

  showMsgBox('#password-reseted-msg-box');
});

fromEvent($goToSignInBtn, 'click')
  .subscribe(event => {
    // window.location.href = '/index.html'
    page.redirect('/sign-in');
});

fromEvent($goToSignUpBtn, 'click')
  .subscribe(event => {
    // window.location.href = '/index.html'
    page.redirect('/sign-up');
});