import vanillaValidatorJS from './vanillaValidatorJS.js';

const addPerfil = document.querySelector('.form-perfil');
addPerfil.setAttribute('novalidate', true);
let cambios = false;


addPerfil.addEventListener('input',()=>{
  cambios = true;

});

addPerfil.addEventListener('submit', e => {

  e.preventDefault();


  if(cambios){
    const addPerfilValidated = vanillaValidatorJS(addPerfil, {
      rules: {
        nombre: {
          required: true,
          minlength: 2,
          maxlength: 20
        },
        emailP:{ 
          required:true,
          email: true
  
        }
      }
    })
    // form validado correctamente 
    if (addPerfilValidated) {
      const formData = new FormData(addPerfil);
      
      // envio de los datos (JSON) al server mediante petición asíncrona "fetch"
      fetch('/perfil/add', {
        method: 'PUT',
        body: formData
      })
      .then(response => response.json())
      .then(message => {
        alert(message);
        location.reload();
      })
      .catch(error => console.log(error))
    }
  }else {
    alert("No se han realizado cambios!");
  }

  




})

