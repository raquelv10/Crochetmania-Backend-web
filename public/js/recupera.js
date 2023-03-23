import vanillaValidatorJS from './vanillaValidatorJS.js'

const form = document.querySelector('.recuperacion')
form.setAttribute('novalidate', true)

form.addEventListener('submit', e => {

    e.preventDefault()

    const formValidated = vanillaValidatorJS(form, {
        rules: {

            emailRec: {
                required: true,
                email: true
            }
        }
    })

    if (formValidated) {
        const formData = new FormData(form);  // creamos un nuevo objeto FormData y le enviamos el formulario como parámetro
        let reqData = {};
        // rellena un objeto con los datos del form
        formData.forEach((value, key) => reqData[key] = value);
        // envio de los datos (JSON) al server mediante petición asíncrona "fetch"
        fetch('recupera', { //contact/emailSend es la ruta que hemos definido en contact.routes.js
            method: 'POST',
            body: JSON.stringify(reqData),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => response.json())
        .then(message => {
            alert(message) // Recogemos el mensaje que nos envía contact.routes.js
        })
        .catch(error => console.log(error))
    }

})