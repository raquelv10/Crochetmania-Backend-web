import { Router } from 'express';
import {dateTimeConverter} from '../utils/dateTimeConverter.js';
// importamos la conexión DB
import conn from '../database/conn.js';


const router = Router();

router.post('/comentario', (req, res) => {
    // recogemos los datos del comentario. 
    const idUser = req.session.idUser;
    const userName = req.session.userName;
    const comentario = req.body.comentario;
    const idEntrada = Number(req.body.idEntrada);
    
    if(!idUser){
        res.json("Inicia sesión para comentar");
    }else if(comentario.length === 0){
        res.json("Escribe un comentario");
    }else{
        // tenemos que insertar el comentario en la base de datos:
        
        const fecha_coment = dateTimeConverter(new Date());
        const sql = 'insert into comentarios values(?,?,?,?,?,?,default,default)';
        conn.query(sql, [null,idEntrada,idUser,userName,comentario,fecha_coment], (err,result)=>{
            if(err) throw err;
            res.json(`Comentario guardado correctamente`);

        }); 


    }


})  

// Borrar mensaje
router.delete('/comentarios/:id', (req, res) => {
    const { id } = req.params;
    
    const sql = 'delete from comentarios where idComentario = ?';
        conn.query(sql, [id], (err, result) => {
          if (err) throw err; // lanza excepción error
          res.json("Mensaje borrado");
        });
});
  
    
// Responder
router.put('/respuesta/:id', (req, res) => {
    
    const { id }  = req.params;
    console.log(id);
    const respuesta = req.body.respuesta;

    
    const sql = 'update comentarios set respuesta = ? where idComentario = ?'; 
    conn.query(sql,[respuesta, id], (err,result)=> {
        if(err) throw err;
        res.json("Respuesta enviada");
    })
});

export default router;