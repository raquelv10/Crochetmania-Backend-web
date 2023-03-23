import vanillaValidatorJS from './vanillaValidatorJS.js';  // utilizamos vanillaValidatorJS para validar en navegador

document.addEventListener("DOMContentLoaded", () => {

    /* Función que espera 1 segundo para que aparezcan los formularios */
    const formulario = document.getElementsByTagName("form");
    for (let i = 0; i < formulario.length; i++) {
        setTimeout(function () { formulario[i].style.opacity = "1"; }, 1000);
    }
    /*******************************************/
    let inputs = document.querySelectorAll("input");
    let labels = document.querySelectorAll("label");

    for (let i = 0; i < inputs.length; i++) {
        // Para que cuando haya datos en los inputs la etiqueta se quede siempre arriba.
        // Sirve para los dos formularios
        inputs[i].addEventListener("keydown", () => {

            for (let i = 0; i < inputs.length; i++) {

                if (inputs[i].value.length !== 0) {
                    labels[i].classList.add("peque");

                } else {
                    labels[i].classList.remove("peque");
                }

            }
        })
    }

    formulario[0].addEventListener('click', () => {

        let inputs = document.querySelectorAll("#registro input"); // coge solo los inputs del formulario de registro
        let labels = document.querySelectorAll("#registro label"); // coge solo los labels del formulario de registro

        for (let i = 0; i < inputs.length; i++) {

            // Para que cuando cambie el foco del input compruebe si está vacío o si no es correcto el formato insertado (expresiones regulares)
            const name = document.querySelector("#name");
            const aviso_nombre = document.querySelector("#aviso_nombre");
            const aviso_email = document.querySelector("#aviso_email");
            const aviso_password = document.querySelector("#aviso_password");
            const aviso_password2 = document.querySelector("#aviso_password2");

            //vacía el campo de aviso de error cuando el input tiene el foco
            const p = document.querySelectorAll("p");
            inputs[i].addEventListener("focus", () => {

                p[i].textContent = "";
            })

            // Cuando pierde el foco ('blur') hace las comprobaciones 
            inputs[0].addEventListener("blur", () => {

                // Comprueba si se ha rellenado el campo nombre.
                if (name.value.length === 0) {
                    name.classList.add("error");
                    aviso_nombre.textContent = "Rellena el campo Nombre";
                } else {
                    name.classList.remove("error");
                    p[i].textContent = "";
                }

            })

            inputs[1].addEventListener("blur", () => {
                // expresión regular para el correo electrónico:
                let email = document.querySelector("#email");
                const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/;
                const testeo = regexp.test(email.value); // devuelve true o false

                if (email.value.length === 0) {

                    email.classList.add("error");
                    aviso_email.textContent = "Rellena el campo Email";

                } else if (!testeo) {

                    email.classList.add("error");
                    aviso_email.textContent = "Formato de email incorrecto";

                } else {

                    email.classList.remove("error");
                    p[i].textContent = "";

                }
            })

            inputs[2].addEventListener("blur", () => {
                //expresión regular para la contraseña:
                let password = document.querySelector("#password");
                let password2 = document.querySelector("#password2");

                const regexp1 = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,20}$/;
                const testeo1 = regexp1.test(password.value);

                //Comprueba si la contraseña tiene el formato correcto
                if (password.value.length === 0) {

                    password.classList.add("error");
                    aviso_password.textContent = "Rellena el campo Contraseña";

                } else if (!testeo1) {

                    password.classList.add("error");
                    aviso_password.textContent = "Mín. 6 caracteres , una minúscula, una mayúscula y un número";
                } else {

                    password.classList.remove("error");
                    p[i].textContent = "";

                }
            })

            inputs[3].addEventListener("blur", () => {
                // Comprueba si has repetido correctamente la contraseña
                if (password2.value.length === 0) {

                    password2.classList.add("error");
                    aviso_password2.textContent = "Repite la contraseña";
                } else {
                    if (password.value !== password2.value) {

                        password2.classList.add("error");
                        aviso_password2.textContent = "Las contraseñas no coinciden";
                    } else {

                        password2.classList.remove("error");
                        p[i].textContent = "";
                    }
                }

            })

        } //fin del for
    })  //fin del formulario de registro

    const aviso_email_log = document.querySelector("#aviso_email_log");
    const aviso_password_log = document.querySelector("#aviso_password_log");

    formulario[1].addEventListener('click', () => {


        let inputs = document.querySelectorAll("#login input"); // coge solo los inputs del formulario de login
        let labels = document.querySelectorAll("#login label"); // coge solo los labels del formulario de login

        for (let i = 0; i < inputs.length; i++) {
            // Para que cuando cambie el foco del input compruebe si está vacío o si no es correcto el formato insertado (expresiones regulares)

            let p = document.querySelectorAll(".p_log");
            inputs[i].addEventListener("focus", () => {
                
                p[i].textContent = "";
                
            })


            inputs[0].addEventListener("blur", () => {
                // expresión regular para el correo electrónico:
                let email = document.querySelector("#email_log");
                const regexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]/;
                const testeo = regexp.test(email.value); // devuelve true o false

                if (email.value.length === 0) {

                    email.classList.add("error");
                    aviso_email_log.textContent = "Rellena el campo Email";

                } else if (!testeo) {

                    email.classList.add("error");
                    aviso_email_log.textContent = "Formato de email incorrecto";

                } else {
                    
                    email.classList.remove("error");
                    p[0].textContent = "";

                }
            })

            inputs[1].addEventListener("blur", () => {
                //expresión regular para la contraseña:
                let password = document.querySelector("#password_log");

                //Comprueba si ha rellenado la contraseña
                if (password.value.length === 0) {

                    password.classList.add("error");
                    aviso_password_log.textContent = "Rellena el campo Contraseña";
                } else {
                    
                    password.classList.remove("error");
                    p[1].textContent = "";
                }
            })
        }

    })


    // para que la imagen del ojo deje ver la contraseña o la oculte:
    const eye = document.querySelectorAll(".eye");

    for (let i = 0; i < eye.length; i++) {

        eye[i].addEventListener("click", () => {
            let img = document.querySelectorAll("img");
            let imagen = "";
            //Para cambiar la imagen de ojo tachado por la normal y viceversa:
            if (img[i].className === "invisible") {
                imagen = document.getElementsByTagName("img")[i].src = "../img/eye-regular.png"
                img[i].className = "visible";
            } else {
                img[i].className = "invisible";
                imagen = document.getElementsByTagName("img")[i].src = "../img/eye-slash-regular.png"
            }

            // Para que cambie el input password por input text para ocultar o enseñar la contraseña.
            let pass = document.getElementsByClassName("pass_eye");

            if (pass[i].type === "password") {

                pass[i].type = "text";
            } else {
                pass[i].type = "password";
            }

        })
    }


    // Función que manda los datos a la función registrar o iniciar según en qué botón hayas clicado:
    const formReg = document.querySelector('#registro')
    
    formReg.addEventListener("submit", e => {

        e.preventDefault(true);
       const regFormValidated = vanillaValidatorJS(formReg,{
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
                password: {
                    required: true,
                    minlength: 6,
                    maxlength: 20
                }
           }
       })
       if(regFormValidated) {
        const regData = new FormData(formReg);
        let reqData = {};

        regData.forEach((value, key) => reqData[key] = value);

        fetch('registro/registroSend', { //registro/registroSend es la ruta que hemos definido en user.routes.js
            method: 'POST',
            body: JSON.stringify(reqData),
            headers: { 'Content-Type': 'application/json' }
         })
        .then(response => response.json())
        .then(message => {
        document.querySelector('.response1').textContent = message; // Recogemos el mensaje que nos envía user.routes.js
        })
        .catch(error => console.log(error))
    }

    })

    /* ********** validación con server ********************** */
    
    const formLog = document.querySelector("#login");
    
    formLog.addEventListener("submit", (e) => {

        e.preventDefault(true);

        const logFormValidated = vanillaValidatorJS(formLog, {
            rules: {
                email: {
                    required: true,
                    email:true
                }
            }


        })
        if(logFormValidated) {
            const logData = new FormData(formLog);
            let reqData = {};
    
            logData.forEach((value, key) => reqData[key] = value);
    
            fetch('login/loginSend', { //contact/emailSend es la ruta que hemos definido en user.routes.js
                method: 'POST',
                body: JSON.stringify(reqData),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(message => {
            console.log(message); // Recogemos el mensaje que nos envía user.routes.js
            if (message === 'Has iniciado sesión'){
                
                location.href = '/';
            }else {
                alert(message);
            }
            })
            .catch(error => console.log(error))
        }
    })
    
    
})
