import { createConnection } from 'mysql';

const conn = createConnection ({
    host: 'eu-cdbr-west-02.cleardb.net',
    user: 'bb789a3095984b',
    password: 'b6845986',
    database: 'heroku_7270b661de55728'
    
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