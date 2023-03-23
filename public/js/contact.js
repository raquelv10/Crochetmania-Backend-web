import vanillaValidatorJS from './vanillaValidatorJS.js';  // utilizamos vanillaValidatorJS para validar en navegador

const form = document.querySelector('form'); 
form.setAttribute('novalidate', true);

form.addEventListener('submit', e => {

  e.preventDefault();
  //Validamos el formulario con las reglas de vanillaValidatorJS
  const contactFormValidated = vanillaValidatorJS(form, {   // Enviamos el 'form' como parámetro
    rules: {
      nombre: {
        required: true,
        minlength: 2,
        maxlength: 20
      },
      email: {
        required: true,
        email: true
      },
      mensaje: {
        required: true,
        minlength: 4,
        maxlength: 100
      }
    }
  })
 // Si el formulario se ha validado correctamente devuelve true.
 if (contactFormValidated) {
  const formData = new FormData(form);  // creamos un nuevo objeto FormData y le enviamos el formulario como parámetro
  let reqData = {};  
  // rellena un objeto con los datos del form
  formData.forEach((value, key) => reqData[key] = value);
  // envio de los datos (JSON) al server mediante petición asíncrona "fetch"
  fetch('contact/emailSend', { //contact/emailSend es la ruta que hemos definido en contact.routes.js
    method: 'POST',
    body: JSON.stringify(reqData),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(response => response.json())
  .then(message => {
    document.querySelector('.response').textContent = message; // Recogemos el mensaje que nos envía contact.routes.js
  })
  .catch(error => console.log(error))
}
  
})