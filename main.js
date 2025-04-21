const form = document.querySelector('.form');
const inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea');

inputs.forEach(el => el.addEventListener('blur', (e) => {
        console.log(e.target);
        
        const inputElement = e.target;
        const errorMsgContainer = document.getElementById(inputElement.getAttribute('aria-describedby'));
        console.log(errorMsgContainer);
        

        if(!inputElement.checkValidity()) {
            console.log('here');
            
            const validationMessage = inputElement.validationMessage;
            errorMsgContainer.textContent = validationMessage;
            errorMsgContainer.style.display = 'block';
            inputElement.setAttribute('aria-invalid', true);
        } else {
            errorMsgContainer.textContent = '';
            errorMsgContainer.style.display = 'none';
            inputElement.setAttribute('aria-invalid', false);
        }
}));

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let formIsValid = true;

  inputs.forEach((inputElement) => {
    const errorMsgContainer = document.getElementById(inputElement.getAttribute('aria-describedby'));

    if (!inputElement.checkValidity()) {
      const validationMessage = inputElement.validationMessage;
      errorMsgContainer.textContent = validationMessage;
      errorMsgContainer.style.display = 'block';
      inputElement.setAttribute('aria-invalid', 'true');
      formIsValid = false;
    } else {
      errorMsgContainer.textContent = '';
      errorMsgContainer.style.display = 'none';
      inputElement.setAttribute('aria-invalid', 'false');
    }
  });

  const radioGroup = form.querySelectorAll('input[name="query_type"]');
  const radioGroupError = document.getElementById('query_type_error_message');
  const fieldset = form.querySelector('.form__fieldset');

  const isRadioChecked = Array.from(radioGroup).some(input => input.checked);

  if (!isRadioChecked) {
    radioGroupError.textContent = 'Please select a query type.';
    radioGroupError.style.display = 'block';
    fieldset.setAttribute('aria-invalid', 'true');
    formIsValid = false;
  } else {
    radioGroupError.textContent = '';
    radioGroupError.style.display = 'none';
    fieldset.setAttribute('aria-invalid', 'false');
  }

  const consentCheckbox = document.getElementById('consent');
  const checkboxError = document.getElementById('consent_error_message');

  if (!consentCheckbox.checked) {
    checkboxError.textContent = 'You must consent to continue.';
    checkboxError.style.display = 'block';
    consentCheckbox.setAttribute('aria-invalid', 'true');
    formIsValid = false;
  } else {
    checkboxError.textContent = '';
    checkboxError.style.display = 'none';
    consentCheckbox.setAttribute('aria-invalid', 'false');
  }

  consentCheckbox.addEventListener('change', () => {
    if (consentCheckbox.checked) {
        checkboxError.textContent = '';
        checkboxError.style.display = 'none';
        consentCheckbox.setAttribute('aria-invalid', 'false');
    } else {
        checkboxError.textContent = 'You must consent to continue.';
        checkboxError.style.display = 'block';
        consentCheckbox.setAttribute('aria-invalid', 'true');
        formIsValid = false;
    }
  });
  
  radioGroup.forEach(input => {
    input.addEventListener('change', () => {
      radioGroupError.textContent = '';
      radioGroupError.style.display = 'none';
      fieldset.setAttribute('aria-invalid', 'false');
    });
  });

  if (formIsValid) {
    form.submit();
  }
});
