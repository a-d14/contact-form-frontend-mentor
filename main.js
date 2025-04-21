const form = document.querySelector('.form');
const inputs = document.querySelectorAll('input:not([type="checkbox"]):not([type="radio"]), textarea');
const radioGroup = form.querySelectorAll('input[name="query_type"]');

inputs.forEach(el => el.addEventListener('blur', (e) => {    
    const inputElement = e.target;
    const errorMsgContainer = document.getElementById(inputElement.getAttribute('aria-describedby'));    

    if(!inputElement.checkValidity()) {        
        const validationMessage = inputElement.validationMessage;
        errorMsgContainer.textContent = validationMessage;
        errorMsgContainer.style.display = 'block';

        inputElement.classList.add('error');
        inputElement.setAttribute('aria-invalid', true);
    } else {
        errorMsgContainer.textContent = '';
        errorMsgContainer.style.display = 'none';

        inputElement.classList.remove('error');
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

        inputElement.classList.add('error');
        inputElement.setAttribute('aria-invalid', 'true');
        formIsValid = false;
        } else {
        errorMsgContainer.textContent = '';
        errorMsgContainer.style.display = 'none';

        inputElement.classList.remove('error');
        inputElement.setAttribute('aria-invalid', 'false');
        }
    });

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
        checkboxError.textContent = 'To submit this form, please consent to being contacted.';
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
