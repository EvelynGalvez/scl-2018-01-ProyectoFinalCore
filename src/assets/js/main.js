const form = document.getElementById("formVisit"); // Obtenemos la referencia al formulario

if (form) {
  // Si existe nuestro elemento en memoria este se quedara escuchando al evento submit del formulario
  form.addEventListener("submit", formVisit); // Al momento de enviar el formulario, ejecuta la función "contactform"
}
// Boton para enviar formulario de visita 
infoVisit.addEventListener("click", event => {
  event.preventDefault(); // Prevenimos el comportamiento por defecto de un formulario (Enviar por URL los parametros)
// Se crea constructor para fecha
  let formatoFecha = new Date();
  let d = formatoFecha.getUTCDate();
  let m = formatoFecha.getMonth() + 1;
  let y = formatoFecha.getFullYear();
  var h = formatoFecha.getHours();
  var min = formatoFecha.getMinutes();

  fecha = d + "/" + m + "/" + y + " " + h + ":" + min;
 // Aqui se obtiene el valor del select
  let selectOptionsIf = document.getElementById("zonaIfOptions");
  selectOptionsIf.addEventListener("click", function() {
    let selectedZonaIf = this.options[selectOptionsIf.selectedIndex];
    console.log(selectedZonaIf.value);
  });
  
  const infoUsuarioIf = {
    recinto: selectOptionsIf.value,
    fecha: fecha,
    
  }; // Creamos un objecto con todos los elementos de nuestro formulario.
  saveContactForm(infoUsuarioIf); // Enviamos la información obtenida por el usuario a la función que se encargara de guardar la información en Firebase
  form.reset(); // borramos todos los campos.
  // Nos informa si la informacion fue guardada correctamente en firebase
  function saveContactForm(infoUsuarioIf) {
    firebase
      .database()
      .ref("zonaIf")
      .push(infoUsuarioIf) // Hacemos referencia el nombre del objeto que contendrá nuestros registros y empujamos los nuevos envios de datos
      .then(function() {
        alert("mensaje guardado"); // Si la petición es correcta y almaceno los datos mostramos un mensaje al usuario.
      })
      .catch(function() {
        alert("mensaje No guardado"); // En caso de ocurrir un error le mostramos al usuario que ocurrió un error.
      });
  }
  // aqui evaluamos la ruta y se imprime en HTML
  firebase
    .database()
    .ref("/zonaIf")
    .once("value", function datosIf(send) {
      printInfoVisit.innerHTML = ""; // se evita la repeticion de la visita 
      Object.entries(send.val()).forEach(sends => {
        printInfoVisit.innerHTML += 
        `<div>${sends[1].recinto}
       ${sends[1].fecha}  
       <i class="fas fa-sign-out-alt" data-post="${sends[0]}" onclick="deletePost(event)"></i>
            </div>`;  
      });
    });
});


//BOTON SALIDA 

function deletePost(event) {
 if (confirm("¿Desea retirarse del If Recoleta")) {
  event.stopPropagation(); //se activa solamente donde se hace click
 const postId = event.target.getAttribute("data-post"); 
 }
}
 