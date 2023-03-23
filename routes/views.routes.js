import { Router } from 'express';
import conn from '../database/conn.js';
const router = Router();

// Rutas públicas

router.get('/', (req,res)=>{
    
    res.render("index",{
        idUser: res.locals.idUser,
        pageName: 'inicio',
        pageName2: 'inicio'
        
    });
    
})


router.get('/amigurumis', (req,res)=>{
   
    res.render('../views/nav/amigurumis',{
        idUser: res.locals.idUser,
        pageName : 'amigurumis',
        pageName2: 'amigurumis'
    });
})


router.get('/blog', (req,res)=>{
    
    res.render('../views/nav/blog',{
        idUser: res.locals.idUser,
        pageName : 'blog',
        pageName2: 'blog'
    });
})


router.get('/recupera', (req,res)=>{
    
    res.render('../views/nav/recupera',{
        idUser: res.locals.idUser,
        pageName: 'recupera',
        pageName2: 'recupera'
    });
})
router.get('/pedidos', (req,res)=>{
    
    res.render('../views/nav/mispedidos',{
        idUser: res.locals.idUser,
        pageName: 'pedidos',
        pageName2: 'pedidos'
    });
})


router.get('/cerrar', (req,res)=>{

    res.render('../views/nav/cerrar',{
        idUser: res.locals.idUser,
        pageName: 'cerrar',
        pageName2: 'cerrar'
    });
})

router.get('/complementos', (req,res)=>{
  
    res.render('../views/nav/complementos',{
        idUser: res.locals.idUser,
        pageName : 'complementos',
        pageName2: 'complementos'
    });
})
router.get('/contacto', (req,res)=>{

    res.render('../views/nav/contacto',{
        idUser: res.locals.idUser,
        pageName : 'contacto',
        pageName2: 'contacto'
    });
})
router.get('/cookies', (req,res)=>{

    res.render('../views/nav/cookies',{
        idUser: res.locals.idUser,
        pageName: 'cookies',
        pageName2: 'cookies'
    });
})

router.get('/micuenta', (req,res)=>{
   
    res.render('../views/nav/micuenta',{
        idUser: res.locals.idUser,
        pageName: 'micuenta',
        pageName2: 'micuenta'
    });
})
router.get('/moda', (req,res)=>{
   
    res.render('../views/nav/moda',{
        idUser: res.locals.idUser,
        pageName : 'moda',
        pageName2: 'moda'
    });
})
router.get('/privacidad', (req,res)=>{
  
    res.render('../views/nav/privacidad',{
        idUser: res.locals.idUser,
        pageName: 'privacidad',
        pageName2: 'privacidad'
    });
})

router.get('/tutoriales', (req,res)=>{
   
    res.render('../views/nav/tutoriales',{
        idUser: res.locals.idUser,
        pageName : 'tutoriales',
        pageName2: 'tutoriales'
    });
})
router.get('/animales', (req,res)=>{
   
    res.render('../views/nav/amigurumis/animales',{
        idUser: res.locals.idUser,
        pageName : 'amigurumis',
        pageName2: 'animales'
    });
})

router.get('/para-bebes', (req,res)=>{

    res.render('../views/nav/amigurumis/para-bebes',{
        idUser: res.locals.idUser,
        pageName : 'amigurumis',
        pageName2: 'para-bebes'
    });
})
router.get('/personajes', (req,res)=>{
  
    res.render('../views/nav/amigurumis/personajes',{
        idUser: res.locals.idUser,
        pageName : 'amigurumis',
        pageName2: 'personajes'
    });
})
router.get('/bisuteria', (req,res)=>{
  
    res.render('../views/nav/complementos/bisuteria',{
        idUser: res.locals.idUser,
        pageName : 'complementos',
        pageName2: 'bisuteria'
    });
})
router.get('/bolsos-mochi', (req,res)=>{
  
    res.render('../views/nav/complementos/bolsos-mochi',{
        idUser: res.locals.idUser,
        pageName : 'complementos',
        pageName2: 'bolsos-mochi'
    });
})
router.get('/buf-chal', (req,res)=>{
    
    res.render('../views/nav/complementos/buf-chal',{
        idUser: res.locals.idUser,
        pageName : 'complementos',
        pageName2: 'buf-chal'
    });
})
router.get('/comp-hogar', (req,res)=>{
  
    res.render('../views/nav/complementos/comp-hogar',{
        idUser: res.locals.idUser,
        pageName : 'complementos',
        pageName2: 'comp-hogar'
    });
})
router.get('/crochet_en_la_calle', (req,res)=>{
    const sql = 'select P.imagen, C.* from comentarios C join perfil P on C.idUsuario = P.idUsuario where idEntrada = ?';
    conn.query(sql, [1], (err,result)=>{
        res.render('../views/nav/entradas/crochet_en_la_calle',{
            idUser: res.locals.idUser,
            pageName : 'blog',
            pageName2: 'gorrito_oso',
            idEntrada: '1',
            comentarios: result
        });
    })
   
})

router.get('/gorrito_oso', (req,res)=>{
    const sql = 'select P.imagen, C.* from comentarios C join perfil P on C.idUsuario = P.idUsuario where idEntrada = ?';
    conn.query(sql, [2], (err,result)=>{
        res.render('../views/nav/entradas/gorrito_oso',{
            idUser: res.locals.idUser,
            pageName : 'blog',
            pageName2: 'gorrito_oso',
            idEntrada: '2',
            comentarios: result
        });
    })
   
})
router.get('/ojos_amigurumi', (req,res)=>{
    const sql = 'select P.imagen, C.* from comentarios C join perfil P on C.idUsuario = P.idUsuario where idEntrada = ?';
    conn.query(sql, [3], (err,result)=>{
        res.render('../views/nav/entradas/ojos_amigurumi',{
            idUser: res.locals.idUser,
            pageName : 'blog',
            pageName2: 'ojos_amigurumi',
            idEntrada: '3',
            comentarios: result
        });
    })
    
})
router.get('/patucos_crochet', (req,res)=>{
    const sql = 'select P.imagen, C.* from comentarios C join perfil P on C.idUsuario = P.idUsuario where idEntrada = ?';
    conn.query(sql, [4], (err,result)=>{
        res.render('../views/nav/entradas/patucos_crochet',{
            idUser: res.locals.idUser,
            pageName : 'blog',
            pageName2: 'patucos_crochet',
            idEntrada: '4',
            comentarios: result
        });
    })
    
})
router.get('/que_aguja', (req,res)=>{
    const sql = 'select P.imagen, C.* from comentarios C join perfil P on C.idUsuario = P.idUsuario where idEntrada = ?';
    conn.query(sql, [5], (err,result)=>{
        res.render('../views/nav/entradas/que_aguja',{
            idUser: res.locals.idUser,
            pageName : 'blog',
            pageName2: 'que_aguja',
            idEntrada: '5',
            comentarios: result
        });
    })


    
})
router.get('/sonajero_redondo', (req,res)=>{
    const sql = 'select P.imagen, C.* from comentarios C join perfil P on C.idUsuario = P.idUsuario where idEntrada = ?';
    conn.query(sql,[6], (err,result)=>{
        res.render('../views/nav/entradas/sonajero_redondo',{
            idUser: res.locals.idUser,
            pageName : 'blog',
            pageName2: 'sonajero_redondo',
            idEntrada: '6',
            comentarios: result
        });
    })


})
router.get('/bebes', (req,res)=>{
 
    res.render('../views/nav/moda/bebes',{
        idUser: res.locals.idUser,
        pageName : 'moda',
        pageName2: 'bebes'
    });
})
router.get('/disfraces', (req,res)=>{

    res.render('../views/nav/moda/disfraces',{
        idUser: res.locals.idUser,
        pageName : 'moda',
        pageName2: 'disfraces'
    });
})
router.get('/hombre', (req,res)=>{

    res.render('../views/nav/moda/hombre',{
        idUser: res.locals.idUser,
        pageName : 'moda',
        pageName2: 'hombre'
    });
})
router.get('/mujer', (req,res)=>{

    res.render('../views/nav/moda/mujer',{
        idUser: res.locals.idUser,
        pageName : 'moda',
        pageName2: 'mujer'
    });
})
router.get('/ninyos', (req,res)=>{

    res.render('../views/nav/moda/ninyos',{
        idUser: res.locals.idUser,
        pageName : 'moda',
        pageName2: 'ninyos'
    });
})
router.get('/puntos-basicos', (req,res)=>{

    res.render('../views/nav/tutoriales/puntos-basicos',{
        idUser: res.locals.idUser,
        pageName : 'tutoriales',
        pageName2: 'puntos-basicos'
    });
})
router.get('/puntos-fantasia', (req,res)=>{

    res.render('../views/nav/tutoriales/puntos-fantasia',{
        idUser: res.locals.idUser,
        pageName : 'tutoriales',
        pageName2: 'puntos-fantasia'
    });
})
router.get('/simbolos', (req,res)=>{
  
    res.render('../views/nav/tutoriales/simbolos',{
        idUser: res.locals.idUser,
        pageName : 'tutoriales',
        pageName2: 'simbolos'
    });
})


// Rutas para la gestión de la tienda
router.get('/tienda', (req,res)=>{
    conn.query('select * from productos;', (err,result)=>{
        res.render('../views/nav/tienda',{
            idUser: res.locals.idUser,
            pageName : 'tienda',
            pageName2: 'tienda',
            productos: result
        });
    })
   
    
})
router.get('/carrito', (req,res)=>{
    const sql = 'select  count(*) AS cantidad, P.* from productos P join wiselist W on P.idProducto = W.idProducto where W.idUsuario = ? group by P.idProducto;'
    const idUser = res.locals.idUser;
    conn.query(sql, [idUser], (err,result)=>{
        res.render('../views/nav/carrito',{
            idUser: res.locals.idUser,
            pageName : 'carrito',
            pageName2: 'carrito',
            productos: result
    
        });
    })
   
}) 


router.get('/finalizar_compra', (req,res)=>{
   
    const sql = 'select  count(*) AS cantidad, P.*, PE.* from productos P join wiselist W on P.idProducto = W.idProducto join perfil PE on W.idUsuario = PE.idUsuario where W.idUsuario = ? group by P.idProducto;'
    const idUser = res.locals.idUser;
    conn.query(sql, [idUser], (err,result)=>{
        res.render('../views/nav/finalizar_compra',{
            idUser: res.locals.idUser,
            pageName : 'finalizar_compra',
            pageName2: 'finalizar_compra',
            productos: result
            
    
        });
    })
})

router.get('/factura', (req,res)=>{
    // primero manda el número de factura, que se corresponde con el último idFactura creado
    const sql_fac = 'select idFactura from factura order by idFactura desc limit 1;' 
    conn.query(sql_fac, [], (err,result)=>{
        if(err) throw err;
        let idFactura = result[0].idFactura;

        const sql = 'select PE.*, F.idFactura, F.fechaFactura, D.idProducto, D.cantidad, D.precio, P.codigo, P.nombre  from Usuario U join perfil PE on U.idUsuario = PE.idUsuario join factura F on F.idUsuario = U.idUsuario join detalle D on D.idFactura = F.idFactura join productos P on D.idProducto = P.idProducto where F.idUsuario = ? && F.idFactura = ?';   
    
        const idUser = res.locals.idUser;
        conn.query(sql, [idUser, idFactura], (err,result)=>{
        res.render('../views/nav/factura',{
            idUser: res.locals.idUser,
            pageName : 'factura',
            pageName2: 'factura',
            productos: result
        })
    })

    })
    
})
// Rutas privadas

router.get('/perfil', (req,res)=>{
    
    if(req.session.idUser){
        
        const sql = 'select * from perfil where idUsuario = ?';
        conn.query(sql, [req.session.idUser], (err,result)=>{
            res.render('../views/nav/perfil',{
                idUser: res.locals.idUser,
                userName: res.locals.userName,
                pageName : 'perfil',
                pageName2: 'perfil',
                perfil: result
                
            })
          
        })
          
    }else {  // si no has iniciado sesión te redirije al formulario
        return res.redirect('micuenta')
    }
    
})

 
export default router

