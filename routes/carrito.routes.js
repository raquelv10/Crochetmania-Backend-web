
import { Router } from 'express';
import conn from '../database/conn.js';

import { dateTimeConverter } from '../utils/dateTimeConverter.js';

const router = Router();

// actualización del carrito con localstorage. Si el carrito llega vacío, elimina de la base de datos el registro de wiselist
// si el carrito llega lleno, primero borra el registro que ya existe(para que no haya duplicados) y después añade los productos del carrito. 
router.put('/compras', (req, res) => {

    const idUser = req.session.idUser;
    const carrito = req.body;
    let fecha = dateTimeConverter(new Date());
    if (idUser) {
        if (carrito.length === 0) {

            const sqlDeleteAll = 'delete from wiselist where idUsuario = ?';
            conn.query(sqlDeleteAll, [idUser], (err, result) => {
                if (err) throw err;

            })
        } else {
            for (let i = 0; i < carrito.length; i++) {
                const sqlDelete = 'delete from wiselist where idUsuario = ?'
                conn.query(sqlDelete, [idUser], (err, result) => {
                    if (err) throw err;
                    const sql = 'insert into wiselist values(?,?,?)';
                    conn.query(sql, [null, idUser, Number(carrito[i])], (err, result) => {
                        if (err) throw err;

                    });

                });

            }

        }


    } else {
        res.json("Inicia sesión");
    }


});


router.delete('/compras/del', (req, res) => {
    // Elimina el registro de wiselist al vaciar el carrito

    const idUser = req.session.idUser;
    const carrito = req.body;

    if (idUser) {

        const sqlDeleteAll = 'delete from wiselist where idUsuario = ?';
        conn.query(sqlDeleteAll, [idUser], (err, result) => {
            if (err) throw err;

        })
        res.json("Carrito borrado")
    } else {
        res.json('Inicia Sesión')
    }

})

router.put('/compras/final', (req, res) => {

    const idUser = req.session.idUser;
    const carrito = req.body;   // Array de productos del localStorage
    
    const sql = 'select * from perfil where idUsuario = ?';
    conn.query(sql, [idUser], (err, result) => {
        if (err) throw err;

        for (let i = 0; i < result.length; i++) {

            if (result[i].apell1 === null || result[i].calle === null || result[i].num_calle === null || result[i].poblacion === null || result[i].provincia === null || result[i].CP === null || result[i].DNI === null 
                || result[i].apell1 === "" || result[i].calle === "" || result[i].num_calle === "" || result[i].poblacion === "" || result[i].provincia === "" || result[i].CP === "" || result[i].DNI === "") {
                res.json('Completa tu perfil antes de finalizar la compra');


            } else {

                res.json('Perfil completo')
            }
        }

    })


})
// Llega desde el modal de la pasarela de pago
router.put('/compras/facturar', (req, res) => {

    const idUser = req.session.idUser;
    const carrito = req.body; // Array de productos del localStorage

    // declaramos las variables que vamos a necesitar.
    let idProducto = 0;
    let idFactura = 0;
    let cantidad_producto = 0;
    let precio = 0;
    
    // Creamos la factura en la tabla 'factura'  (idFactura, idUsuario, fechaFactura)

    const sql = 'insert into factura values(?,?,default)'
    conn.query(sql, [null, idUser], (err, result) => {
        if (err) throw err;

        // Necesitamos guardar el último idFactura creado en una variable
        const sql_info = 'select * from factura order by idFactura desc limit 1';
        conn.query(sql_info, [], (err, result) => {
            if (err) throw err;
            // guardamos el último idfactura creado
            idFactura = result[0].idFactura;

        });

        // Necesitamos guardar los datos en las variable que hemos creado antes : idProducto, cantidad_producto y precio
        const sql = 'select  count(*) AS cantidad, P.*, PE.* from productos P join wiselist W on P.idProducto = W.idProducto join perfil PE on W.idUsuario = PE.idUsuario where W.idUsuario = ? group by P.idProducto;'
        conn.query(sql, [idUser], (err,result)=>{
            if (err) throw err;
            
            for (let i = 0; i < result.length; i++) {
                cantidad_producto = result[i].cantidad; 
                
                precio = result[i].precio;
                idProducto = result[i].idProducto

                // Con los datos que hemos guardado de las consultas insertamos el detalle de la factura en la tabla 'detalle'
                const sql_detalle = 'insert into detalle values(?,?,?,?,?)';
                conn.query(sql_detalle, [null, idFactura, idProducto, cantidad_producto, precio], (err,result)=>{
                    if (err) throw err;
                  
                    // ahora que ya tenemos creada la factura, con el detalle de los productos podemos borrar los registros de wiselist del usuario
                    const sqlDeleteWise = 'delete from wiselist where idUsuario = ?';
                    conn.query(sqlDeleteWise, [idUser], (err, result) => {
                        if (err) throw err;
                
                    });
                
                });

                // variamos la cantidad de stock del producto en la tabla 'productos'
                const sql_stock = 'select stock from productos where idProducto = ?';
                conn.query(sql_stock, [idProducto], (err,result)=>{
                    if(err) throw err;

                    let stock = result[0].stock;
                    console.log(stock);
                    stock = stock - cantidad_producto;
                    const sql_stockUpdate = 'update productos set stock = ? where idProducto = ?';
                    conn.query(sql_stockUpdate, [stock, idProducto], (err,result)=>{
                        if(err) throw err;

                    });
                });
                
 

            }
            
        })


    })

   
    res.json('Factura creada')

})

export default router;