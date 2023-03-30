function resertState(state) {
  Object.values(state).forEach(value =>  value.value = '')
}

function clearInputsValue(element) {
  Array.from(element.querySelectorAll('input'))
    .forEach(input => input.value = '')
}

function handleButtonStyle(buttonId, state) {
  const $button = document.querySelector(`#${buttonId}`);
  const isButtonEnabled = Object.values(state).every(field => !field.validateMsg && field.value);

  $button.disabled = !isButtonEnabled;
}

function handleErrorMsg(fieldName, validateMsg) {
  const errorMsg = validateMsg;
  const $messageBox = document.querySelector(`[name="${fieldName}"] + p`);

  if (!validateMsg) {
    $messageBox.textContent = ''; 
    $messageBox.style.opacity = 0;
  } else {
    $messageBox.textContent = errorMsg; 
    $messageBox.style.opacity = 1;
  }
}

function showMsgBox(selector) {
  document.querySelector(`${selector}`).style.opacity = 1;
}

function hideMsgBox(selector) {
  document.querySelector(`${selector}`).style.opacity = 0;
}

export {
  resertState,
  clearInputsValue,
  handleButtonStyle,
  handleErrorMsg,
  showMsgBox,
  hideMsgBox
}