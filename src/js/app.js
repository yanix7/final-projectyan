let searchBtn = document.querySelector('#search-btn');
let searchForm = document.querySelector('.header .search-form');

searchBtn.onclick = () =>{
   searchBtn.classList.toggle('fa-times');
   searchForm.classList.toggle('active');
   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');
}

let menuBtn = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navegacion');

menuBtn.onclick = () =>{
   menuBtn.classList.toggle('fa-times');
   navbar.classList.toggle('active');
   searchBtn.classList.remove('fa-times');
   searchForm.classList.remove('active');
}

window.onscroll = () =>{
   searchBtn.classList.remove('fa-times');
   searchForm.classList.remove('active');
   menuBtn.classList.remove('fa-times');
   navbar.classList.remove('active');
}

// carrito de compras

const carrito = document.querySelector('#carrito'); //selector del carrito de la barra
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); // tabla donde se van a insertar los productos
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //boton de vaciar carrito completo
const listaHamburguesas = document.querySelector('#listaHamburguesas'); //contenedor de todas las hamburguesas
let hamburguesaCarrito = [] //arreglo vacio porque al iniciar el carrito no tiene ningun elemento, almacenar el obejto para mostrar

cargarEventListeners();

function cargarEventListeners(){

   listaHamburguesas.addEventListener('click', agregarCurso) //agrega curso cuando apretas "agregar al carrito"

   carrito.addEventListener('click', borrarPedido);

   vaciarCarritoBtn.addEventListener('click', ()=>{
      hamburguesaCarrito = [];

      limpiarHTML()
   })
}

function agregarCurso(e){
   e.preventDefault()

   //comprobar que le dimos click al boton de agregar curso
   if (e.target.classList.contains("agregar-carrito")) {
      const hamburguesaSeleccionada = e.target.parentElement.parentElement; //acceder al contenido para seleccionarlo con el objeto

      leerDatosMenu(hamburguesaSeleccionada)
   }
}

function borrarPedido(e){
   e.preventDefault()
   if (e.target.classList.contains("borrar-hamburguesa")) {
      //identificar que hamburguesa es
      const hamburguesaId = e.target.getAttribute("data-id");

      //eliminar
      hamburguesaCarrito = hamburguesaCarrito.filter( hamburguesa => hamburguesa.id !== hamburguesaId);

      carritoHTML() //borrarlo del html
   }
}

function leerDatosMenu(hamburguesa){
   // console.log(hamburguesa)
   //Crear objeto con el contenido del curso seleccionado
   const infoHamburguesa = {
      imagen: hamburguesa.querySelector('img').src,
      nombre: hamburguesa.querySelector('h3').textContent,
      precio: hamburguesa.querySelector('.precio').textContent,
      id: hamburguesa.querySelector('a').getAttribute('data-id'),
      cantidad: 1
   }

   //comprobar si existe una hamburguwsa
   const existe = hamburguesaCarrito.some( hamburguesa => hamburguesa.id === infoHamburguesa.id);
   
   if (existe) {

      //si existe actualizamos el arreglo
      const hamburguesas = hamburguesaCarrito.map( hamburguesa => {
         if(hamburguesa.id === infoHamburguesa.id){
            hamburguesa.cantidad++;
            return hamburguesa; //devuelve el objeto con la cantidad actualizada
         } else{
            return hamburguesa; //devuelve el objeto sin actualizar
         }
      });

      hamburguesaCarrito = [...hamburguesas];

   }else{
      //agregar articulos al arreglo del carrito formados con el objeto de infoCurso
      hamburguesaCarrito = [...hamburguesaCarrito, infoHamburguesa ]
   }

   carritoHTML()
}

//mostrar le carrito en el html, genera el html basado en el objeto guardado en el arreglo
function carritoHTML(){

   //limpiar antes de insertar o actualizar
   limpiarHTML()

   hamburguesaCarrito.forEach(hamburguesa => {
      const { imagen, nombre, precio, cantidad, id} = hamburguesa;
      //inyectar el objeto al carrito
      const row = document.createElement('tr');
      row.innerHTML = `
      <td>
         <img src="${imagen}" width="100">
      </td>
      <td>${nombre} </td>
      <td>${precio} </td>
      <td>${cantidad}</td>
      <td><a href="#" class="borrar-hamburguesa" data-id="${id}">X</a></td>
      `
      contenedorCarrito.appendChild(row)

   });

}

function limpiarHTML(){

   while (contenedorCarrito.firstChild) {
      contenedorCarrito.removeChild(contenedorCarrito.firstChild)
   }
}