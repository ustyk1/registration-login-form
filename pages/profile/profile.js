const { fromEvent, merge } = rxjs;

import { validators } from'../../scripts/validators.js'
import { clearInputsValue, showMsgBox, hideMsgBox } from'../../scripts/service.js'
import { UserStorage } from '../../scripts/userStorage.js'
import { page } from '../../scripts/routers.js'

const $changePasswordBtn = document.querySelector('#change-password-btn');
const $deleteAccountBtn = document.querySelector('#delete-account-btn');
const $signOutBtn = document.querySelector('#sign-out-btn');

const currentPassWordForChangeInput$ = fromEvent(document.querySelector('#confirm-password-for-change'), 'focus')
const newPassWordForChangeInput$ = fromEvent(document.querySelector('#new-password-for-change'), 'input')
const confirmPassWordForDeleteInput$ = fromEvent(document.querySelector('#confirm-password-for-delete'), 'input')

const userStorage = new UserStorage();
showCurrentUserData();

const isInit = true;
$changePasswordBtn.disabled = isInit;
$deleteAccountBtn.disabled = isInit;

merge( currentPassWordForChangeInput$, newPassWordForChangeInput$, confirmPassWordForDeleteInput$ )
  .subscribe(event => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (
      inputName === 'confirmPasswordForChange' || 
      inputName === 'passwordForDelete'
    ) {
      hideMsgBox('#password-for-delete-not-match-msg-box');
      hideMsgBox('#password-for-change-not-match-msg-box');
      hideMsgBox('#password-changed-msg-box');
      hideMsgBox('#password-for-change-invalid-msg-box');
    }

    if (inputName === 'password') {
      let msg =  validators[inputName](inputValue);

      if (msg) {
        showMsgBox('#password-for-change-invalid-msg-box');
        $changePasswordBtn.disabled = true;
      } else {
        $changePasswordBtn.disabled = false;
        hideMsgBox('#password-for-change-invalid-msg-box');
      } 
    }
});

fromEvent($changePasswordBtn, 'click')
  .subscribe(event => {
    const currentUser = userStorage.getCurrentUser();

    const $passwordInput = document.querySelector('#new-password-for-change');
    const $currentPasswordInput = document.querySelector('#confirm-password-for-change');

    const newPassword = $passwordInput.value;
    const currentPassWord = $currentPasswordInput.value;

    if (currentPassWord === currentUser.password) {
      userStorage.changePassword(currentUser.email, newPassword);
      showMsgBox('#password-changed-msg-box');
      clearInputsValue(document.querySelector('.change-password-wrapper'));
      $changePasswordBtn.disabled = true;
    } else {
      showMsgBox('#password-for-change-not-match-msg-box');
      clearInputsValue(document.querySelector('.change-password-wrapper'));
      $changePasswordBtn.disabled = true;
    }
})

confirmPassWordForDeleteInput$.subscribe( event => {
  const currentUser = userStorage.getCurrentUser();

   const input = event.target;
   $deleteAccountBtn.disabled = true;

   if (currentUser.password === input.value) {
     $deleteAccountBtn.disabled = false;
   } else {
     showMsgBox('#password-for-delete-not-match-msg-box');
   }
});

fromEvent($deleteAccountBtn, 'click')
  .subscribe(event => {
    const currentUser = userStorage.getCurrentUser();
    userStorage.delete(currentUser.email); 
    page.redirect('/sign-up');
});

fromEvent($signOutBtn, 'click')
  .subscribe(event => {
    userStorage.deleteCurrentUser();
    page.redirect('/sign-in');
    // window.location.href = '/pages/sign-in/sign-in.html'
});

function showCurrentUserData() {
  const $firstName = document.querySelector('.first-name');
  const $lastName = document.querySelector('.last-name');
  const $email = document.querySelector('.email');
  const $birthDate = document.querySelector('.birth-date');

  const data = userStorage.getCurrentUser()
  $firstName.textContent += data.firstName;
  $lastName.textContent += data.lastName;
  $email.textContent += data.email;
  $birthDate.textContent += data.birthDate;
}
