const btnCar = document.querySelector('#car');
const espacioCarrito = document.querySelector('.product-detail');
const btnProducto = document.querySelector('btn__agregar--Carrito');
//Eventos
btnCar.addEventListener('click', sacaCarrito);
productsMain.addEventListener('mouseenter', agregarOscuridad);/*Quiero que al entrar al elemnto
pase algo*/
//Funciones
function sacaCarrito(){
    espacioCarrito.classList.toggle('activo');   
    const body = document.querySelector('body');
   
    if(!espacioCarrito.classList.contains('activo')){
        body.style.background = '#25292b52';/*Si no existe la clase activo es que
        se está viendo*/
        

    }   
};
/*Bueno esto realmente no importa por el momento, pero lo que si me importa y mucho es 
ver o lo del cotizador, o ver lo del presupuesto.*/