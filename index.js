const { fromEvent, merge } = rxjs;

import { validators } from'./scripts/validators.js';
import { 
  handleErrorMsg, 
  handleButtonStyle,
  clearInputsValue,
  resertState,
  showMsgBox,
  hideMsgBox
} from'./scripts/service.js';
import { page } from './scripts/routers.js';
import { UserStorage } from './scripts/userStorage.js';
import { fieldSignUpState } from './scripts/state.js';

const firstName$ = fromEvent(document.querySelector('#firstName'), 'input');
const lastName$ = fromEvent(document.querySelector('#lastName'), 'input');
const birthDate$ = fromEvent(document.querySelector('#birthDate'), 'input');
const email$ = fromEvent(document.querySelector('#email'), 'input');
const password$ = fromEvent(document.querySelector('#password'), 'input');
const confirmPassword$ = fromEvent(document.querySelector('#confirm-password'), 'input');

const $registrationForm = document.querySelector('#registration-form');
const $signInBtn = document.querySelector('#sign-in-btn');

const isInit = true;
submitFormBtn.disabled = isInit;

birthDate.max = new Date().toISOString().split("T")[0];

merge( firstName$, lastName$, birthDate$, email$, password$, confirmPassword$ )
  .subscribe(event => {
    hideMsgBox('#already-signed-up-msg-box');

    const inputName = event.target.name;
    const inputValue = event.target.value;

    fieldSignUpState[inputName] = {
      validateMsg: validators[inputName](inputValue),
      value: inputValue
    }

    handleErrorMsg(inputName, fieldSignUpState[inputName].validateMsg);
    handleButtonStyle('submitFormBtn', fieldSignUpState);
});

fromEvent($registrationForm, 'submit')
  .subscribe(event => {
    event.preventDefault();

    const form = new FormData(event.target);
    const firstName = form.get('firstName');  
    const lastName = form.get('lastName');  
    const birthDate = form.get('birthDate');  
    const secretWord = form.get('secretWord');  
    const email = form.get('email');  
    const password = form.get('password');  
    const confirmPassword = form.get('confirmPassword');  

    const inputsValues = [firstName, lastName, birthDate, secretWord, email, password, confirmPassword];

    const userStorage = new UserStorage();

    if ( userStorage.isSignedUp(email) ) {
      showMsgBox('#already-signed-up-msg-box');
      clearInputsValue(event.target);
      resertState(fieldSignUpState);
      handleButtonStyle('submitFormBtn', fieldSignUpState);
    } else {
      showMsgBox('#just-signed-up-msg-box')
      userStorage.create(inputsValues);
      clearInputsValue(event.target);
      resertState(fieldSignUpState)
    }
});

fromEvent($signInBtn, 'click').subscribe( event => {
  page.redirect('/sign-in');
});