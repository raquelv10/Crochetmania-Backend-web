import vanillaValidatorJS from './vanillaValidatorJS.js';

const registro = document.querySelector('#registro');
registro.setAttribute('novalidate', true);

registro.addEventListener('submit', e => {

  e.preventDefault();

  const registroFormValidated = vanillaValidatorJS(registro, {
    rules: {
      nombre: {
        required: true,
        minlength: 1,
        maxlength: 20
      },
      regEmail: {
        required: true,
        email: true
      },
      pass1: {
        required: true,
        minlength: 6
      },
      pass2: {
        required: true,
        equalTo: 'pass1'
      }
    }
  })

  console.log(registroFormValidated)
})

const login = document.querySelector('#login');
login.setAttribute('novalidate', true);

login.addEventListener('submit', e => {

  e.preventDefault();

  const loginFormValidated = vanillaValidatorJS(login, {
    rules: {
      logEmail: {
        required: true,
        email: true
      },
      pass: {
        required: true,
      }
    }
  })

  console.log(loginFormValidated)
})
