import { createConnection } from 'mysql';

const conn = createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Crochetmania'
    
})



conn.connect( err => {
    if (err) {
        // console.log("Ha habido un error con la conexión a la DB. Error: " + err.errno);
        // return;
        throw err;
    }
    console.log("Conexión a la DB ok!");
});


   


export default conn; 