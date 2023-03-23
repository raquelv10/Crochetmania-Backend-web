import { Router } from 'express';
import { generateMultiple } from 'generate-password';
// importamos la conexión DB
import conn from '../database/conn.js';

import fs from 'fs'; // para eliminar los archivos de imagen de perfil

const router = Router();

import { dateTimeConverter } from '../utils/dateTimeConverter.js';

// Añadir Perfil (Crud)
router.put('/perfil/add', (req, res) => {
  // recogemos los datos del perfil de usuario. Solo son requeridos el Nombre y el email
  const idUsuario = req.session.idUser;

  let perfilName = req.body.nombre;
  let perfilApell1 = req.body.apell1;
  let perfilApell2 = req.body.apell2;
  let perfilEmail = req.body.emailP;
  let perfilCalle = req.body.calle;
  let perfilNumero = req.body.numero;
  let perfilPiso = req.body.piso;
  let perfilOtros = req.body.otros;
  let perfilPoblacion = req.body.poblacion;
  let perfilProvincia = req.body.provincia;
  let perfilCp = req.body.cp;
  let perfilDni = req.body.dni;
  let perfilImagen = false;
  let imagenURL = "";
  let fecha_creacion = "";
  if (req.files) {
    perfilImagen = true;
  }


  // 1- validar datos
  const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; //expresión regular
  if (perfilName.length === 0) {
    res.json('Rellena el campo nombre');
  } else if (perfilName.length < 4 || perfilName.length > 20) {
    res.json('Campo nombre con formato incorrecto');
    //falta validar la imagen
  } else if (perfilEmail.length === 0) {  //email vacío
    res.json('Rellena el campo email');
  } else if (!email_regexp.test(perfilEmail)) {   // email incorrecto según la expresión regular 'regexp' que hemos utilizado
    res.json('Campo email con formato incorrecto');

  } else {
    // comprobar que el email no está previamente registrado en nuestra DB
    const sql = 'select * from perfil where email = ?';
    conn.query(sql, [perfilEmail], (err, result) => {
      if (err) throw err; // lanza excepción error
      // si la consulta devuelve un valor(array), el email ya  esta registrado
      if (result.length > 0) {
        // en lugar de un insert sería un update

        const sql = 'update perfil set nombre_usuario = ?, apell1 = ?, apell2 = ?, email = ?, calle = ?, num_calle = ?, piso = ?, otros = ?, poblacion = ?, provincia = ?, cp = ?, dni = ? where idUsuario = ?';

        if (perfilImagen) {

          perfilImagen = req.files.imagenPerfil;

          const sql_imagen = 'select imagen from perfil where idUsuario = ?';
          conn.query(sql_imagen, [idUsuario], (err, result) => {
            if (err) throw err;
            console.log(result[0].imagen);
            if (result[0].imagen !== null) {

              console.log('entra en primer if result !== "" ');
              let imagen = result[0].imagen;
              
              let imagen_corta = imagen.split('/');
              let imagen1 = imagen_corta[1];

              if (imagen1 !== perfilImagen.name) {
                
                const path = `uploads/${imagen}`;
                
                fs.unlink(path, (err) => {
                  if (err) throw err; // lanza excepción error
                  const sql = 'update perfil set imagen = "" where idUsuario = ?';
                  conn.query(sql, [idUsuario], (err, result) => {
                    if (err) throw err; // lanza excepción error

                    perfilImagen.mv(`uploads/${req.session.userEmail}/${perfilImagen.name}`, err => {

                      if (err) throw err;
                      let imagenURL = `${req.session.userEmail}/${perfilImagen.name}`;
                      let fecha_creacion = dateTimeConverter(new Date());
                      const sql = 'update perfil set imagen = ? where idUsuario = ?';
                      conn.query(sql, [imagenURL, idUsuario], (err, result) => {
                        if (err) throw err;

                      });
                    })
 
                  });

                })

              } 

            }else{
            
              perfilImagen.mv(`uploads/${req.session.userEmail}/${perfilImagen.name}`, err => {

                if (err) throw err;
                imagenURL = `${req.session.userEmail}/${perfilImagen.name}`;
                fecha_creacion = dateTimeConverter(new Date());
                const sql = 'update perfil set imagen = ? where idUsuario = ?';
                conn.query(sql, [imagenURL, idUsuario], (err, result) => {
                  if (err) throw err;

                });
              })
            }


          })
            
        }    
        
        conn.query(sql, [perfilName, perfilApell1, perfilApell2, perfilEmail, perfilCalle, perfilNumero, perfilPiso, perfilOtros, perfilPoblacion, perfilProvincia, perfilCp, perfilDni, idUsuario], (err, result) => {
          if (err) throw err;

          res.json('Perfil guardado correctamente ');

        })

        
      }

      });
  }
});

export default router;