import { Router } from 'express';
const router = Router();
// nodemailer 
import nodeMailer from '../utils/nodemailer.js';

// contacto. Creamos la ruta de contacto. Esta ruta es la url tenemos que poner en el fetch
router.post('/contact/emailSend', (req, res) => {
  // recogemos los datos 
  const nombre = req.body.nombre;
  const email = req.body.email;
  const mensaje = req.body.mensaje;
  // Validamos los datos. Es bueno hacer una segunda validación en servidor, aparte de la del navegador. 
  const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; //expresión regular
  if (nombre.length === 0) {  //nombre vacío
    res.json('Rellena el campo nombre'); 
  } else if (nombre.length <= 1 || nombre.length > 20) {   //nombre demasiado largo o demasiado corto
    res.json('Campo nombre con formato incorrecto');
  } else if (email.length === 0) {  //email vacío
    res.json('Rellena el campo email');
  } else if (!email_regexp.test(email)) {   // email incorrecto según la expresión regular 'regexp' que hemos utilizado
    res.json('Campo email con formato incorrecto');
  } else if (mensaje.length === 0) {  //mensaje vacío
    res.json('Rellena el campo mensaje');
  } else if (mensaje.length < 10 || mensaje.length > 100) { // mensaje demasiado corto
    res.json('Campo mensaje con formato incorrecto');
  } else { 
    // Campos correctos, enviamos el email utilizando el paquete 'nodemailer'

    const html = `   
                <div> 
                  <h1>Datos del Formulario de contacto  de Crochetmania</h1>
                  <h2>Nombre: ${nombre}</h2> 
                  <h2>Email: ${email}</h2> 
                  <h2>Mensaje:</h2> <h3>${mensaje}</h3> 
                </div> `
    ;

    nodeMailer('crochetmania-bcn@outlook.es', 'raquelvalleinformatica@gmail.com', 'Crochetmania. Mensaje de contacto', html)
      .then(result => {
          if(result) {
            res.json('Mensaje enviado correctamente!');
          }else {
            res.json('Error al enviar los datos! ');
          }
      })
      .catch(err => console.log(err)
    );
    
    
  }
});


export default router;