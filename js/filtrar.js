const agregandoProducto = document.querySelector('.productos');
const contenedorCards = document.querySelector('.card-items');
const contadorCarrito = document.querySelector('.count-product');
//El lugar donde voy a colocar el resultado del total.
let contenedorPrecioTotal = document.querySelector('.price-total'); 
/*El lugar con el que voy a leer los productos, tiene que ser el carrito*/
const carrito = document.querySelector('.card-items');
let productosCarrito = [];//ESTE ES LET, NO CONST....
let total = 0;//voy a trabajar calculando numeros, no necesito convertirlo
let contadorProducto = 0; 

const btnVaciarCar = document.querySelector('#vaciarCarrito');


/*Al hacer esto tengo dos opciones...*/
eventos();
function eventos(){
    agregandoProducto.addEventListener('click', agregandoCarrito);
    carrito.addEventListener('click', eliminarProductos);
    btnVaciarCar.addEventListener('click', vaciandoCarrito);
}/*Le coloco un parámetro para que tome el lugar de cada uno de mis items(productos dentro del carrito)
y de ahí pueda identificar cada uno.*/

function eliminarProductos(e) {
    //console.log(e.target.parentElement);
    if(e.target.classList.contains('delete-product')){
        console.log('Esta presionando el btn de eliminar, eliminando producto...');
        /*Una vez identificado el elemento lo que tengo que hacer es leer el id del producto
        Leer o amm extraer el id mejor dicho.
        console.log(e.target.getAttribute('data-id'));Lo guardamos en una variable para no tener que escribir mas este valor*/
        let carId = e.target.getAttribute('data-id');// console.log(carId);
        /*Yo presionando y reconociendo el id del producto al que le estoy dando click lo que quiero hacer es
        traerme todos los productos excepto al que le di click, para esto ocupo filter*/
        
        productosCarrito.forEach(valor => {
            if(valor.id == carId){
                let precioReducido = parseFloat(valor.price) * parseFloat(valor.cantidad);
                total = total - precioReducido; 
                total = total.toFixed(2);   
            }
        });
        productosCarrito = productosCarrito.filter(product => product.id !== carId);

       contadorProducto--;
    }
    //El contador se queda con 1 aunque hayan 0 productos
    if(productosCarrito.length == 0){
        contenedorPrecioTotal.innerHTML = 0; 
        contadorCarrito.innerHTML = 0;
    }
    imprimirHTML();
    
}
function agregandoCarrito(e) {
    e.preventDefault();
    if(e.target.classList.contains('btn-add-cart')) {
        const productoSeleccionado = e.target.parentElement;
        //console.log(productoSeleccionado);
      //  Al agregar el producto lo que quiero hacer es
        leerDatos(productoSeleccionado);
    }
}
function leerDatos(product){
    const informacionProducto = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }//console.log(informacionProducto);
/*Actualizar la cantidad

1.Iterar sobre el arreglo que tiene los productos(productos carrito)
ya que este es el arreglo que guarda los productos del html para ponerlos
en el carrito.
2.Traerme todos los productos excepto el que tenga un id igual
al que presioné.
O sea, si producto.id, es igual a infoProducto.id entonces
if(existe){//Existe guarda en variable el resultado de la iteración
    existe entonces auméntale 1 a la cantidad.
}else {
    si no existe entonces agrega el producto completo
}*/
    const existe = productosCarrito.some(producto => producto.id === informacionProducto.id);
    total = parseFloat(total) + parseFloat(informacionProducto.price);
    total = total.toFixed(2);
    console.log(total);
    if(existe === true){//Si la condicion se cumple
        console.log('Si, ya existe, actualiza la cantidad');
        const pro = productosCarrito.map(product => {
            if(product.id === informacionProducto.id){
                product.cantidad++;
                return product;
            }else {
                return product; 
            }

        });
        productosCarrito = [...pro];

    }else {
        console.log('No exite, agregando el producto');
        productosCarrito = [...productosCarrito, informacionProducto];
        contadorProducto++;
}
    setTimeout(() => {
            productosCarrito
    }, 3000);
//Ahora, después de esto, yo quiero imprimir en el html0
    imprimirHTML();
/*Pasos para construir un carrito de compras...

1.Seleccionar toda la card donde están metidos mis productos.(esto para que 
después por medio de condiciones sólo se ejecute lo que se tiene
que hacer si le damos a la etiqueta a)

(De esta manera lo que estoy haciendo no es más que yendome de arriba hacia abajo, esto para que pueda 
leer de una todos los datos.

2.Mando llamar la función leerDatos, esto para que


Después lo que yo quiero es recuperar la información del precio, la imagen, texto
para Ponerla EN MI CARRITO DE COMPRAS DESPUÉS. 

es para ello que ocupamos un objeto...

o sea que de aquí realmente ya estamos agrupando toda esa información que yo
quiero en un objeto y la estoy leyendo, es como si la estuviera extrayendo.

por cada que le de click a cualquier objeto, esto ya me va a traer toda su
info, claro, toda la info que yo la le coloque.)

(ESTOY LEYENDO LOS DATOS QUE YA TENGO EN EL HTML, EXACTAMENTE
A LOS QUE LES DI CLICK).

Entre los que estoy leyendo son, 
Precio: lo leo desde la card del html seleccionándola
texto: igual, lo leo seleccionándolo desde la card
boton: al btn lo leo por medio de su id, el btn de agregar carrito es el único que 
tiene (id), este id se le colocó desde el html, este id es un data-id
/
Mi premisa es que si genero el html de manera dinámica, el id lo tendría que
seleccionar de la misma manera, no sería nada del otro mundo jjaja
y quizás borrar por el mismo id, ya que en realidad no tengo cosas juntas, sino que están
separadas, por ejemplo genero mis elementos desde amm un array con objetos, este array con 
objetos tienen la información que voy a mostrar de los productos, pero a su vez, este array 
tendría la información que le voy a pasar a mi carrito de compras, entonces el primer
array sería el que me diera el id, o sea en el que le tendría que colocar un id único con
dataset.date.now();
ya haciendo esto lo que me tocaría sería extraer los demás valores...

después de ya colocarlo a cada uno de mis productos esa información la tendría que
extraer de las mismas cards, para que después igual se lo asignemos a 
, el id lo podría generar desde el mismo objeto
 este mismo objeto u otro objeto que englobe la información que va a crear
 a la card.
/
ahora, lo que tengo que hacer es poner o agrupar esos datos
en un arreglo, esto para tener el cúmulo de datos que ya estoy ocupando....

3.Ahora, sería crear el arreglo, después de crearlo sería llenarlo con la información que
tengo.

4.Ese arreglo me sirve a mi para englobar toda mi información de objetos
en un sólo lugar, como un cúmulo de información de la misma clase.
 pero lo que quiero con dicho arreglo es imprimirlo, mostrarlo al público, para 
 mostrarlo necesito imprimir el html

5.Actualizar la cantidad.*/

};

function imprimirHTML(){
    limpiarHTML();
   productosCarrito.forEach((product) => {/*
        Aquí ya pongo la información que quiero extraer para después o mostrarla
        como son la imagen, precio, cantidad etc. como los que no se muestran
        por ejemplo el id.*/
        const {image, price, title, id, cantidad} = product; 
        //El lugonde colocarlos...
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = 
        `
        <img src="${image}" alt="">
        <div class="item-content">
            <h5> ${title} </h5>
            <h5 class="cart-price">${price}</h5>
            <h6> cantidad: ${cantidad}</h5>
        </div>
        <span class="delete-product" data-id="${id}">X</span>
        `
        ;/*AQUÍ SE CONTRUYE EL HTML Y SUS ESTILOS...*/
        contenedorCards.appendChild(row);
        
        contenedorPrecioTotal.innerHTML = total; 
        /*Imprimir el resultado del total*/

        //Actualizar contadorcarrito
        contadorCarrito.innerHTML = contadorProducto;
    });
}

function limpiarHTML(){
/*Para eliminar el elemento anterior lo que tengo que hacer es..
Ahora lo que tengo que hacer es irme a lo que quiero eliminar...
lo que quiero eliminar es del html, entonces me tengo que ir al html.
En este caso me tengo que ir al elemento que voy a eliminar de referencia, en este caso sería*/
    while (contenedorCards.firstChild) {
            contenedorCards.removeChild(contenedorCards.firstChild);
    }
};
function vaciandoCarrito(){
    productosCarrito = [];
    contenedorPrecioTotal.innerHTML = 0; 
    total = 0; 
    contadorCarrito.innerHTML = 0;
    imprimirHTML();   
}
/**/






