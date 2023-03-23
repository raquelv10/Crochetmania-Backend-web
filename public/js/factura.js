document.addEventListener('DOMContentLoaded',()=>{



const div_iva = document.querySelector('.iva');
const totales = document.querySelectorAll('.total');
let subtotal = 0;

for (let i = 0; i < totales.length; i++) {

    subtotal = Number(totales[i].innerHTML) + Number(subtotal);
}

const div_subtotal = document.querySelector('.subtotal');
div_subtotal.innerHTML = `${subtotal.toFixed(2)}`;
let iva = subtotal * 0.21;
div_iva.innerHTML = iva.toFixed(2);
let suma = document.querySelector('.suma');

let superTotal = Number(subtotal.toFixed(2)) + 2.99 + iva;
suma.innerHTML = `${superTotal.toFixed(2)} €`;


const boton = document.querySelector('.imprimir');
boton.addEventListener('click', () =>{
    boton.style.visibility= 'hidden';
    window.print()
})
 
})