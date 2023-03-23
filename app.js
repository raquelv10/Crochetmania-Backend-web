
//import
import express from "express";
import path from 'path'; // solución para utilizar "__dirname" con import
import { fileURLToPath } from 'url'  // solución para utilizar "__dirname" con import
import bodyParser from "body-parser";
import session from 'express-session';
import fileUpload from 'express-fileupload';  // paquete para subir archivos 


//import rutas
import viewsRoutes from './routes/views.routes.js'; //ruta de vistas
import contactRoutes from './routes/contact.routes.js'; //ruta de form. contacto
import userRoutes from './routes/user.routes.js'; //ruta de form. registro y login
import perfilRoutes from './routes/perfil.routes.js'; // ruta de perfil
import blogRoutes from './routes/blog.routes.js';
import carritoRoutes from './routes/carrito.routes.js';
// Inicializaciones
const app = express(); // inicializamos app como un objeto de express
const __dirname = path.dirname(fileURLToPath(import.meta.url)); // solucion para utilizar "__dirname" con "import"

// configs
app.set("port", 3001);
app.set('view engine', 'ejs'); // ejs config
app.set('views', __dirname + '/views'); // ejs config

// middlewares

//sesión
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

// los datos de sesión serán accesibles en cualquier plantilla.
app.use((req, res, next) => {
    res.locals.idUser= req.session.idUser;   // para poder crear rutas privadas como por ejemplo "perfil de usuario"
    res.locals.userName = req.session.userName;
    res.locals.userEmail = req.session.userEmail;
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); // static files -  archivos estáticos
app.use(express.static(__dirname + '/uploads')); // static files
app.use(express.static(__dirname + '/utils')); // static files
app.use(express.static(__dirname + '/database')); // static files
app.use(express.json());  // necesitamos esta línea para poder gestionar las respuestas en json.
app.use(fileUpload({ createParentPath: true })); // paquete fileupload para subir archivos
app.use(viewsRoutes, contactRoutes, userRoutes, perfilRoutes, blogRoutes, carritoRoutes); 


app.use((req, res) => { 
    res.status(404).render('404');  // abre la página 404 en caso de error en la dirección
});

export default app