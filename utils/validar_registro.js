

//Función que confirma los datos enviados desde registro 

const validarRegistro = (nombre, emailReg, password, password2) => {
  const email_regexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; //expresión regular
  if (nombre.length === 0) {  //nombre vacío
    return res.json('Rellena el campo nombre');
  } else if (nombre.length <= 1 || nombre.length > 20) {   //nombre demasiado largo o demasiado corto
    return res.json('Campo nombre con formato incorrecto');
  } else if (emailReg.length === 0) {  //email vacío
    return res.json('Rellena el campo email');
  } else if (!email_regexp.test(emailReg)) {   // email incorrecto según la expresión regular 'regexp' que hemos utilizado
    return res.json('Campo email con formato incorrecto');
  } else if (password.length === 0) {
    return res.json('Rellena el campo contraseña');
  } else if (password.length < 6) {
    return res.json('La contraseña debe tener 6 caracteres');
  } else if (password2.length === 0) {
    return res.json('Repite la contraseña');
  } else if (password !== password2) {
    return res.json('Las contraseñas no coinciden');
  } else {
    return true;
  }
}




export default validarRegistro; 