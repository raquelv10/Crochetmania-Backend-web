import { Router } from 'express';  // Importamos el Router
import conn from '../database/conn.js'; // importamos nuestra base de datos
import { hashSync, compareSync } from 'bcrypt';  // para encriptar los datos.
import generator from 'generate-password';  // generador de password por si lo has olvidado
import nodeMailer from '../utils/nodemailer.js' // importamos el archivo donde ponemos la función nodeMailer

import validarRegistro from '../utils/validar_registro.js';


const router = Router();

// ***********************************************************
// ***********************************************************
// Creamos la ruta del formulario de registro

router.post('/registro/registroSend', (req, res) => {
  // recogemos los datos del formulario de registro 
  const nombre = req.body.nombre
  const emailReg = req.body.emailReg;
  const password = req.body.pass1;
  const password2 = req.body.pass2;

  // Si todos los campos se han rellenado correctamente devuelve un true.
  validarRegistro(nombre, emailReg, password, password2);
  
  if (validarRegistro) {
    // comprobar que el email no está previamente registrado en nuestra DB
    const sql = 'select * from usuario where email = ?'; // guardamos en una variable la consulta

    conn.query(sql, [emailReg], (err, result) => {

      if (err) throw err; // lanza excepción error
      // si la consulta devuelve un valor(array), el email ya está registrado
      if (result.length > 0) {
        res.json('El email introducido ya está registrado!');
      } else {
        // encriptamos la contraseña
        const hashPassword = hashSync(password, 10);

        // creamos un token para que el cliente confirme la cuenta por email.
        const reg_token = generator.generate({
          length: 100,
          numbers: true
        });
        // url token
        const url_host = `${req.protocol}://${req.get('host')}`;
        const url_link = `${url_host}/reg_confirm?email=${emailReg}&token=${reg_token}`;

        // enviamos email con link de confirmación de registro
        const html = ` 
                    <div> 
                    <h1>Confirmación de registro en Crochetmania</h1>
                    <h2>Click <a href="${url_link}">aquí</a> para confirmar el registro</h2> 
                    </div> 
                    `
          ;

        nodeMailer('crochetmania-bcn@outlook.es', emailReg, 'Confirmación de registro', html)
          .then(result => {
            if (result) {
              // insertamos los datos en la DB

              const sql = 'insert into usuario values (?,?,?,?,default,default,?)';

              conn.query(sql, [null, nombre, emailReg, hashPassword, reg_token], (err, result) => {
                if (err) throw err; // lanza excepción error
                res.json('Usuario registrado correctamente!');
              });



            } else {
              res.json('Error al enviar los datos por email!');
            }
          })
          .catch(err => console.log(err));

      }
    });

  }

});

// Confirmacion de registro mediante token  // cambia el valor de reg_confirm a 1
router.get('/reg_confirm', (req, res) => {

  const token = req.query.token; // recogemos el token
  const email = req.query.email; // recogemos el email
  const sql = 'select reg_token from usuario where email =?';
  conn.query(sql, [email], (err, result) => {
    if (err) throw err;

    if (result[0].reg_token === token) { // comprobamos si el token que nos llega es el mismo de la DB
      const sql1 = 'update usuario set reg_confirm = 1 where email= ?' // si es correcto, cambiamo el valor de reg_confirm a 1
      conn.query(sql1, [email], (err, result) => {
        if (err) throw err;
        const url_host = `${req.protocol}://${req.get('host')}`;
        const url_link = `${url_host}/micuenta`;
        res.render('../views/nav/reg_confirm', {  // renderizamos la url reg_corfirm
          idUser: res.locals.idUser, // mandamos el idUser, y el nombre de la página
          pageName: 'reg_confirm',
          pageName2: 'reg_confirm'
        });

      });
    } else {
      // Pinta por pantalla el error
      res.send(`<h3>Ha ocurrido un error con la confirmación del registro!</h3><a href="/">Volver</a>`);
    }
  })



})


// ***********************************************************
// ***********************************************************

// Creamos la ruta del formulario de login

router.post('/login/loginSend', (req, res) => {    // ruta POST
  // recogemos los datos del formulario

  const email = req.body.emailLog;
  const password = req.body.pass;

  // Validamos los datos. 
  const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; //expresión regular
  if (email.length === 0) {  //email vacío
    res.json('Rellena el campo email');
  } else if (!email_regexp.test(email)) {   // email incorrecto según la expresión regular 'regexp' que hemos utilizado
    res.json('Campo email con formato incorrecto');
  } else if (password.length === 0) {  //password vacío
    res.json('Rellena el campo contraseña');
  } else {

    // comprobamos que la contraseña es correcta
    const sql = 'select * from usuario where email = ? '; // guardamos en una variable la consulta del password
    conn.query(sql, [email], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {   // si es mayor de 0 quiere decir que el email existe. 
        const sql = 'select * from usuario where email = ? and reg_confirm = 1'; // guardamos en una variable la consulta del password
        conn.query(sql, [email], (err, result) => {
          if (err) throw err;
          if (result.length === 0) { // resgistro no confirmado
            res.json('Registro no confirmado, revisa tu correo electrónico')
          } else {
            const passhash = result[0].password; // guarda la contraseña encriptada de el email correspondiente
            const compPassword = compareSync(password, passhash); // comprueba que son la misma contraseña

            if (compPassword) {
              // almacenamos los datos de inicio de sesión
              req.session.idUser = result[0].idUsuario;
              req.session.userEmail = result[0].email;
              req.session.userName = result[0].nombre;
              // establecemos la duración de la cookie en milisegundos
              req.session.cookie.maxAge = 1 * 24 * 60 * 60 * 1000  // Esto equivale a 1 día  86400000 milisegundos


              res.json('Has iniciado sesión');


            } else {
              res.json('El email o la contraseña son incorrectos');
            }
            // Insertamos los datos de usuario en la tabla Perfil para que al abrir el perfil ya nos salgan los datos en los values de los inputs
            const sql1 = 'select * from perfil where idUsuario = ?';

            conn.query(sql1, [req.session.idUser], (err, result) => {
              if (result.length === 0) {
                const sql2 = 'insert into perfil (idUsuario, nombre_usuario, email) values (?,?,?)';
                conn.query(sql2, [req.session.idUser, req.session.userName, req.session.userEmail], (err, result) => {
                  if (err) throw err;

                })
              }
            })

          }
        })

      } else {
        res.json('Email no registrado en Crochetmania');
      }

    });

  }

});

// CERRAR SESION  
router.get('/logout', (req, res) => {   // ruta GET para cerrar la sesión
  req.session.destroy();
  res.redirect('/');
});

// ***********************************************************
// ***********************************************************
// Recuperación de contraseña
router.post('/recupera', (req, res) => {
  const emailRec = req.body.emailRec;

  const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

  if (emailRec.length === 0) {
    res.json("Rellena el campo email");
  } else if (!email_regexp.test(emailRec)) {
    res.json("Formato de correo incorrecto");
  } else {
    // comprobamos si el correo está registrado
    const sql = 'select * from usuario where email = ?';
    conn.query(sql, [emailRec], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.json("Este email no está registrado");
      } else {
        //generamos contraseña aleatoria

        const newPassword = generator.generate({
          length: 6,
          numbers: true
        });
        // enviamos email con nuevo password

        const html = ` 
        <div> 
         <h1>Nueva contraseña Crochetmania</h1>
         <h2>Contraseña: ${newPassword}</h2> 
         <h2>No olvide cambiar la contraseña en la sección Perfil de Usuario<h2>
        </div>  `
          ;

        nodeMailer('crochetmania-bcn@outlook.es', emailRec, 'Recuperación de contraseña', html)
          .then(result => {
            if (result) {
              const hashNewPass = hashSync(newPassword, 10);
              const sql = 'update usuario set password = ? where email = ?';
              conn.query(sql, [hashNewPass, emailRec], (err, result) => {
                if (err) throw err; // lanza excepción error
                res.json('Le hemos enviado su nueva contraseña a su correo electrónico');
              });

            } else {
              res.json('Error al enviar los datos ' + err);
            }


          })
          .catch(err => console.log(err)
          );
      }

    });

  }

})


export default router;