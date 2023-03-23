import app from './app.js';
import './database/conn.js';  
// Iniciamos servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor: http://localhost:${app.get('port')}`);
});

// 