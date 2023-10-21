/*========================================
Slider
==========================================*/
if(document.querySelector('.contenedor-slider')){

    let index=1;
    let selectedIndex=1;

    const slides=document.querySelector('.slider');
    const slide=slides.children;
    const slidesTotal=slides.childElementCount;

    const dots=document.querySelector('.dots');
    const prev=document.querySelector('.prev');
    const next=document.querySelector('.next');


    //agregamos los punto de acuerdo a la cantidad de slides
    for (let i = 0; i < slidesTotal; i++) {
        dots.innerHTML +='<span class="dot"></span>';
    }
    
    //ejecutamos la funcion
    mostrarSlider(index);

    //hacemos que nuestro slide sea automatico
    setInterval(()=>{
        mostrarSlider(index=selectedIndex);
    },5000); //rempresentados en milesegundos

    //funcion para mostrar el slider
    function mostrarSlider(num){
        if(selectedIndex > slidesTotal){
            selectedIndex=1;
        }else{
            selectedIndex++;
        }

        if(num > slidesTotal){
            index=1;
        }

        if(num<1){
            index=slidesTotal;
        }

        //removemos la clase active de todos los slide
        for(let i=0; i<slidesTotal;i++){
            slide[i].classList.remove('active');
        }

        //removemos la clase active de los puntos

        for (let x = 0; x < dots.children.length; x++) {
            dots.children[x].classList.remove('active');
        }

        //mostramos el slide
        slide[index-1].classList.add('active');

        //agregamos la clase active al punto donde se encuntra el slide
        dots.children[index-1].classList.add('active');

        
    }

    //evento para nuestro botones prev y next
    next.addEventListener('click',(e)=>{
        mostrarSlider(index +=1);
        selectedIndex=index;
    });

    prev.addEventListener('click',(e)=>{
        mostrarSlider(index +=-1);
        selectedIndex=index;
    });

    //puntos
    for (let y = 0; y < dots.children.length; y++) {
        
        //por cada dot que ecuentre le agregamos el evento click y ejecutamo la funcion de slide
        dots.children[y].addEventListener('click',()=>{
            mostrarSlider(index=y+1);
            selectedIndex=y+1;
        });
    }

}


/*========================================
Tabs Formulario
==========================================*/
const tabLink=document.querySelectorAll('.tab-link');
const formularios=document.querySelectorAll('.formulario');

for (let x = 0; x < tabLink.length; x++) {
    
    tabLink[x].addEventListener('click',()=>{

        //removemos la clase active de todos los tabs encotrados
        tabLink.forEach((tab)=> tab.classList.remove('active'));

        //le agregamos la clase active al tab que se le hizo click
        tabLink[x].classList.add('active');

        //mostramos el formulario correspondiente
        //para los formularios funciona exactamente los mismo que los tabs
        formularios.forEach((form)=>form.classList.remove('active'));
        formularios[x].classList.add('active');
       
    })
}

/*========================================
Mostrar contraseña
==========================================*/
const mostrarClave=document.querySelectorAll('.mostrarClave');
const inputPass=document.querySelectorAll('.clave');

for (let i = 0; i < mostrarClave.length; i++) {
    
    mostrarClave[i].addEventListener('click',()=>{

        if(inputPass[i].type==="password"){

            //cambiamos el tipo password a text
            inputPass[i].setAttribute('type','text');

            //removemos la clase del icono
            mostrarClave[i].classList.remove('fa-eye');

            //agregamos el nuevo icono
            mostrarClave[i].classList.add('fa-eye-slash');

            //le agregamos la clase active
            mostrarClave[i].classList.add('active');

        }else{
            //si el tipo de input es text

            //cambiamos el tipo text a password
            inputPass[i].setAttribute('type','password');

             //removemos la clase del icono
             mostrarClave[i].classList.remove('fa-eye-slash');

             //agregamos el nuevo icono
             mostrarClave[i].classList.add('fa-eye');
 
             //le agregamos la clase active
             mostrarClave[i].classList.remove('active');
 
        }

    });
}

/*========================================
Validamos el formulario de registro
==========================================*/
let nombre,correo,password,cbx_notificaciones,cbx_terminos;

if(document.getElementById('btnRegistro')){

    const btnRegistro=document.getElementById('btnRegistro');

    //evento click al boton registro
    btnRegistro.addEventListener('click',(e)=>{

        e.preventDefault();

        const msError=document.querySelector('#formRegistro .error-text');
        msError.innerHTML="";
        msError.classList.remove('active');

        nombre=formRegistro.nombre.value.trim();
        correo=formRegistro.correo.value.trim();
        password=formRegistro.password.value.trim();

        cbx_notificaciones=formRegistro.cbx_notificaciones;
        cbx_terminos=formRegistro.cbx_terminos;

        //validamos que los campos cuando estan vacios
        if(nombre=="" && correo=="" && password==""){
            
            //mostramos error en pantalla
            mostrarError('Todos los campos son obligatorios',msError);
            
            //le agregamos la clase error a los input
            //le pasamos los datos array
            inputError([formRegistro.nombre,formRegistro.correo,formRegistro.password]);
            return false;

        }else{
            //removemos esa clase con la siguente funcion
            inputErrorRemove([formRegistro.nombre,formRegistro.correo,formRegistro.password]);
        }


        //validamos a cada input
        if(nombre=="" || nombre==null){

            mostrarError('Por favor ingrese su nombre',msError);
            inputError([formRegistro.nombre]);
            formRegistro.nombre.focus(); // fija el foco del cursor en el elemento indicado,
            return false;
        }else{
            //validamos que ingrese un nombre y no numeros
            if(!validarSoloLetras(nombre)){
                //si es diferente a true
                mostrarError('Ingrese un nombre válido, no se permiten caracteres especiales',msError);
                inputError([formRegistro.nombre]);
                formRegistro.nombre.focus();
                return false;
            }
        }

        //validamos correo
        if(correo==null || correo==""){
            mostrarError('Por favor ingrese su correo',msError);
            inputError([formRegistro.correo]);
            formRegistro.correo.focus();

            return false;
        }else{

            if(!validarCorreo(correo)){
                mostrarError('Por favor ingrese un correo válido',msError);
                inputError([formRegistro.correo]);
                formRegistro.correo.focus();
                return false;
            }
        }

        //validamos password
        if(password=="" || password==null){
            mostrarError('Por favor ingrese una contraseña',msError);
            inputError([formRegistro.password]);
            formRegistro.password.focus();
            return false;
        }else{

            //validamos que la contraseña tenga con minimos 5 cacteres
            if(password.length <=4){
                mostrarError('Contraseña débil, min.5 carácteres',msError);
                inputError([formRegistro.password]);
                formRegistro.password.focus();
                return false;
            }
        }

        //validamos el cbx-terminos

        if(cbx_terminos.checked==false){
            mostrarError('Por favor aceptar Términos y condiciones',msError);
            
            //le agreamos un clase error a su elemento padre
            formRegistro.cbx_terminos.parentNode.classList.add('cbx-error');
            return false;
        }else{
            formRegistro.cbx_terminos.parentNode.classList.remove('cbx-error');
        }

        //un vez hechas las validaciones enviaremos el formulario para luego recibirlos con php
        formRegistro.submit();
        return true;

    });

    formRegistro.cbx_terminos.addEventListener('change',(e)=>{
        if(e.target.checked){
            formRegistro.cbx_terminos.parentNode.classList.remove('cbx-error');
        }
    })


}


/*========================================
    Válidamos formulario de login
==========================================*/
if(document.getElementById('btnLogin')){

    const btnLogin=document.getElementById('btnLogin');

    btnLogin.addEventListener('click',(e)=>{

        e.preventDefault();

        const msError=document.querySelector('#formLogin .error-text');
        msError.innerHTML="";
        msError.classList.remove('active');

        correo=formLogin.correo.value.trim();
        password=formLogin.password.value.trim();

        if(correo=="" && password==""){
            mostrarError('Por favor ingrese su usuario/contraseña', msError);
            inputError([formLogin.correo,formLogin.password]);
            return false;
        }else{
            inputErrorRemove([formLogin.correo,formLogin.password]);
        }

        if(correo=="" || correo==null){
            mostrarError('Por favor ingrese su correo',msError);
            inputError([formLogin.correo]);
            formLogin.correo.focus();
            return false;
        }

        if(password=="" || password==null){
            mostrarError('Por favor ingrese su contraseña',msError);
            inputError([formLogin.password]);
            formLogin.password.focus();
            return false;
        }

        //enviamos el fromulario
        formLogin.submit();
        return true;

    })
}

/*
    CREAMOS FUNCIONES PARA MOSTRAR ERROR EN PANTALLA Y ADEMAS VALIDAR SI LOS CAMPOS SON INGRESADOS CORECTAMENTE
*/

/*========================================
Mostrar Error
==========================================*/
function mostrarError(mensaje,msError){

    //agregamos la clase active
    msError.classList.add('active');

    msError.innerHTML='<p>'+mensaje+'</p>';
}

/*========================================
Agregar class error input
==========================================*/
//a esta funcion le pasamos un array

function inputError(datos){
    for (let i = 0; i < datos.length; i++) {

        //a cada input le agregamos una clase error
        datos[i].classList.add('input-error');

    } 
    
}

//a esta funcion le pasamos un array
function inputErrorRemove(datos){
    for (let i = 0; i < datos.length; i++) {
        //removemos la clase
        datos[i].classList.remove('input-error');

    } 
    
}

/*===============================================
    Válidamos solo letras y numeros
================================================*/
function validarLetrasNumeros(valor){
    if(!/^[a-zA-Z0-9]+$/.test(valor)){
        return false;
    }
    return true;
}


/*===============================================
    Válidamos solo letras
================================================*/
function validarSoloLetras(valor){
    if(!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$/.test(valor)){
        return false;
    }
    return true;
}

/*===============================================
    Válidamos un corrreo valido
================================================*/

function validarCorreo(valor){
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(valor)){
        return false;
    }

    return true;
}

/*===============================================
    Carrito
================================================*/

var carritoVisible = false;

//Espermos que todos los elementos de la pàgina cargen para ejecutar el script
if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready();
}

function ready(){
    
    //Agregremos funcionalidad a los botones eliminar del carrito
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0;i<botonesEliminarItem.length; i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click',eliminarItemCarrito);
    }

    //Agrego funcionalidad al boton sumar cantidad
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0;i<botonesSumarCantidad.length; i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click',sumarCantidad);
    }

     //Agrego funcionalidad al buton restar cantidad
    var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    for(var i=0;i<botonesRestarCantidad.length; i++){
        var button = botonesRestarCantidad[i];
        button.addEventListener('click',restarCantidad);
    }

    //Agregamos funcionalidad al boton Agregar al carrito
    var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    for(var i=0; i<botonesAgregarAlCarrito.length;i++){
        var button = botonesAgregarAlCarrito[i];
        button.addEventListener('click', agregarAlCarritoClicked);
    }

    //Agregamos funcionalidad al botón comprar
    document.getElementsByClassName('btn-pagar')[0].addEventListener('click',pagarClicked)
}
//Eliminamos todos los elementos del carrito y lo ocultamos
function pagarClicked(){
    alert("Gracias por la compra");
    //Elimino todos los elmentos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while (carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild)
    }
    actualizarTotalCarrito();
    ocultarCarrito();
}
//Funciòn que controla el boton clickeado de agregar al carrito
function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    agregarItemAlCarrito(titulo, precio, imagenSrc);

    hacerVisibleCarrito();
}

//Funcion que hace visible el carrito
function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items =document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}

//Funciòn que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = ('item');
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //controlamos que el item que intenta ingresar no se encuentre en el carrito
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0;i < nombresItemsCarrito.length;i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcionalidad eliminar al nuevo item
     item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    //Agregmos al funcionalidad restar cantidad del nuevo item
    var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonRestarCantidad.addEventListener('click',restarCantidad);

    //Agregamos la funcionalidad sumar cantidad del nuevo item
    var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonSumarCantidad.addEventListener('click',sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
}
//Aumento en uno la cantidad del elemento seleccionado
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    actualizarTotalCarrito();
}
//Resto en uno la cantidad del elemento seleccionado
function restarCantidad(event){
    var buttonClicked = event.target;
    var selector = buttonClicked.parentElement;
    console.log(selector.getElementsByClassName('carrito-item-cantidad')[0].value);
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    //Actualizamos el total del carrito
    actualizarTotalCarrito();

    //la siguiente funciòn controla si hay elementos en el carrito
    //Si no hay elimino el carrito
    ocultarCarrito();
}
//Funciòn que controla si hay elementos en el carrito. Si no hay oculto el carrito.
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;
    
        var items =document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}
//Actualizamos el total de Carrito
// function actualizarTotalCarrito(){
//     //seleccionamos el contenedor carrito
//     var carritoContenedor = document.getElementsByClassName('carrito')[0];
//     var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
//     var total = 0;
//     //recorremos cada elemento del carrito para actualizar el total
//     for(var i=0; i< carritoItems.length;i++){
//         var item = carritoItems[i];
//         var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
//         //quitamos el simobolo peso y el punto de milesimos.
//         var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
//         var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
//         console.log(precio);
//         var cantidad = cantidadItem.value;
//         total = total + (precio * cantidad);
//     }
//     total = Math.round(total * 100)/100;

//     document.getElementsByClassName('carrito-precio-total')[0].innerText = '$'+total.toLocaleString("es") + ",00";

// }

function actualizarTotalCarrito() {
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    for (var i = 0; i < carritoItems.length; i++) {
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];

        // Obtener el valor numérico del precio (quitar "C$" y las comas)
        var precioTexto = precioElemento.innerText;
        var precioNumerico = parseFloat(precioTexto.replace('C$', '').replace(/,/g, ''));

        // Obtener la cantidad como número
        var cantidad = parseInt(cantidadItem.value);

        total += precioNumerico * cantidad;
    }

    // Formatear el total con el símbolo de moneda y dos decimales
    var totalFormateado = 'C$' + total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    
    document.getElementsByClassName('carrito-precio-total')[0].innerText = totalFormateado;
}
