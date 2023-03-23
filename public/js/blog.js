import vanillaValidatorJS from './vanillaValidatorJS.js';

document.addEventListener("DOMContentLoaded", () => {

    const addComent = document.querySelector('.form_comentarios');
    addComent.setAttribute('novalidate', true);

    addComent.addEventListener('submit', e => {

        e.preventDefault();

        const addComentValidated = vanillaValidatorJS(addComent, {
            rules: {
                nombre: {
                    required: false,
                    minlength: 2,
                    maxlength: 20
                },
                comentario: {
                    required: true,
                    minlength: 4,
                    maxlength: 255
                }
            }
        });

        // form validado correctamente 
        if (addComentValidated) {
            const formData = new FormData(addComent);
            // envio de los datos (JSON) al server mediante petición asíncrona "fetch"
            fetch('/comentario', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(message => {
                    alert(message);
                    location.reload();
                })
                .catch(error => console.log(error));

        }

    });

    // Borrar comentario
    
    const borrarMensaje = document.querySelectorAll('.papelera .fa-trash');

    borrarMensaje.forEach(icon => {
        icon.addEventListener('click', (e) => {
            if (confirm("¿Quieres borrar este mensaje?")) {
                // const idComentario = e.target.parentElement.parentElement.getAttribute('idComentario');
                
                const idComentario = e.target.parentElement.parentElement.getAttribute('id');

                // ajax
                fetch('comentarios/' + idComentario, {
                    method: 'DELETE'
                })
                    .then(response => response.json())
                    .then(message => {
                        alert(message);
                        location.reload();
                    })
                    .catch(error => console.log(error))
            }
        });
    });

    // Responder
    const responderMensaje = document.querySelectorAll('.boton-responder');
    

    responderMensaje.forEach(boton => {
        boton.addEventListener('click', (e) => {
            
            const formData = new FormData(addComent);
            const id = e.target.parentElement.getAttribute('id');  // id del comentario
            
            // ajax
            fetch('/respuesta/'+ id, {
                method: 'PUT',
                body: formData
            })
            .then(response => response.json())
            .then(message => {
                alert(message);
                location.reload();
            })
            .catch(error => console.log(error))
          
        });

    })
            
    

})