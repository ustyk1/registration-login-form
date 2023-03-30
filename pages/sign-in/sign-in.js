const { fromEvent, merge } = rxjs;

import { 
  handleButtonStyle, 
  showMsgBox, 
  hideMsgBox 
} from'../../scripts/service.js';
import { page } from '../../scripts/routers.js';
import { fieldSignInState } from '../../scripts/state.js';
import { UserStorage } from '../../scripts/userStorage.js';

const firstName$ = fromEvent(document.querySelector('#login'), 'input');
const password$ = fromEvent(document.querySelector('#passwordSignIn'), 'input');

const $signInForm = document.querySelector('#sign-in-form');
const $goToRegistrationBtn = document.querySelector('#go-to-registration-btn');
const $goToResetPasswordBtn = document.querySelector('#go-to-reset-password-btn');

merge(firstName$, password$)
  .subscribe(event => {
    hideMsgBox('#incorrect-login-or-password-msg-box');

    const inputName = event.target.name;
    const inputValue = event.target.value;

    fieldSignInState[inputName].value = inputValue;
    handleButtonStyle('submit-sign-in-form', fieldSignInState);
});

fromEvent($signInForm, 'submit')
  .subscribe(event => {
    event.preventDefault();

    const form = new FormData(event.target);
    const login = form.get('login');  
    const password = form.get('passwordSignIn');  

    const userStorge = new UserStorage();

    if (userStorge.isSignedUp(login) && userStorge.isConfirmedPassword(login, password)) {
      const user = userStorge.get(login);

      userStorge.setCurrentUser(user);
      page.redirect('/profile');
      // window.location.href = '/pages/profile/profile.html'
    } else {
      showMsgBox('#incorrect-login-or-password-msg-box');
    }
});

fromEvent($goToRegistrationBtn, 'click')
  .subscribe(event => {
    // window.location.href = '/index.html'
    page.redirect('/sign-up');
});

fromEvent($goToResetPasswordBtn, 'click')
  .subscribe(event => {
    // window.location.href = '/index.html'
    page.redirect('/reset');
});



//Todo посмореть где вызывается changePassword setCurrentUser