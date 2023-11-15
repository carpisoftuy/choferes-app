let latitud_longitud_paquete = [];
let tablaBultosCargados = document.getElementById("tabla_bultos_cargados")

function entregarPaquete(id) {

  $.ajax({
    method: "POST",
    url: "http://127.0.0.1:8002/api/v1/paquetes/entregar/",
    data: { id: id },
    success: function(response){
      
      console.log(response)
      window.location.reload();
      

    }
  })
  
}


document.addEventListener("DOMContentLoaded", function() {

let URL_PAQUETES_PARA_ENTREGAR = "http://127.0.0.1:8002/api/v1/paquetes/paraEntregar/"

let URL_DETALLE_PAQUETE = "http://127.0.0.1:8002/api/v1/paquetes/paraEntregar/detalle/"

let URL_BULTOS_CARGADOS = "http://127.0.0.1:8002/api/v1/bultos/cargados"

let URL_ALMACENES = "http://127.0.0.1:8002/api/v1/almacenes/"

fetch(URL_BULTOS_CARGADOS)

            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no pudo ser completada.');
                }
                return response.json();
            })

            .then(bultosCargados => {

              //fetch nuevo para consguir ubicaciones de almacenes

              fetch(URL_ALMACENES)

              .then(response => {
                if (!response.ok) {
                  throw new Error('La solicitud no pudo ser completada.');
                }
                return response.json();
              })

              .then(almacenes =>{

                console.log(almacenes)
                console.log(bultosCargados)

                bultosCargados.forEach(bulto =>{

                    tablaBultosCargados.innerHTML += `
                    
                    <tr>
                        <td>${bulto.id_bulto}</td>
                        <td>${bulto.matricula}</td>
                        <td><select id="selectAlmacen${bulto.id}" class="selectBulto"></select></td>
                        <td><button>Descargar</button></td>
                    </tr>
                    
                    `

                  })

                  let selectBultos = document.getElementsByClassName("selectBulto")

                  for(i=0; i<selectBultos.length;i++){

                    almacenes.forEach(almacen=>{

                    selectBultos[i].innerHTML += `
                    
                    <option>${almacen.direccion}</option>
            
                    `

                    })
        
                }

              })

            })

fetch(URL_PAQUETES_PARA_ENTREGAR)

    .then(response => {
        if (!response.ok) {
        throw new Error('La solicitud no pudo ser completada.');
        }
        return response.json();
    })

    .then(data => {
        console.log(data);
        paquetes_a_entregar = data

        paquetes_a_entregar.forEach(element => {

            id_paquete = element.id

            fetch(URL_DETALLE_PAQUETE+id_paquete)

            .then(response => {
                if (!response.ok) {
                    throw new Error('La solicitud no pudo ser completada.');
                }
                return response.json();
            })

            .then(detalle => {
                console.log(detalle);
                datos_paquete = detalle[0]

                latitud_longitud_paquete.push({
            
                  id: datos_paquete.id,
                  latitud: datos_paquete.latitud,
                  longitud: datos_paquete.longitud
                  
                });

                //insertar los datos en el front-end

                let tabla_body = document.getElementById("tabla_body")

                tabla_body.innerHTML += `
                
                <tr>
                    <td>${datos_paquete.id}</td>
                    <td>${datos_paquete.direccion}</td>
                    <td><a class="googleMaps" id="paquete${datos_paquete.id}" href="#" latitud="${datos_paquete.latitud}" longitud="${datos_paquete.longitud}">Google maps</a></td>
                    <td>#1</td>
                    <td><button id="btn${datos_paquete.id}" class="btn-guardar btn-entregar" onclick="entregarPaquete(${datos_paquete.id})">Entregar</button></td>
                    <td><input type="checkbox" id="check${datos_paquete.id}"></td>
                </tr>
                
                `

                document.querySelectorAll('.googleMaps').forEach(function(link){

                  link.addEventListener('click', function(event) {
            
                    event.preventDefault();
                    const packageLatitude = parseFloat(event.target.getAttribute('latitud'));
                    const packageLongitude = parseFloat(event.target.getAttribute('longitud'));
            
                    console.log(packageLatitude + " " + packageLongitude)


                    const directionsService = new google.maps.DirectionsService();
      
                    const request = {
                      origin: new google.maps.LatLng(-34.8681439523412, -56.166493557192815),
                      destination: new google.maps.LatLng(packageLatitude, packageLongitude),
                      travelMode: google.maps.TravelMode.DRIVING, 
                    };
                  
                    // Realiza la solicitud para calcular la ruta.
                    directionsService.route(request, function (result, status) {
                      if (status === google.maps.DirectionsStatus.OK) {
                        const map = new google.maps.Map(document.getElementById('map'), {
                          zoom: 10,
                          center: new google.maps.LatLng(-34.8681439523412, -56.166493557192815), // Centro del mapa
                        });
                        const directionsDisplay = new google.maps.DirectionsRenderer();
                        directionsDisplay.setMap(map);
                        directionsDisplay.setDirections(result);
                      } else {
                        console.error('Error al calcular la ruta: ' + status);
                      }
                    });
                    
            
                  })
            
                })

            })

            .catch(error => {
                console.error('Ocurrió un error: ', error);
            });
      
            
    });

    })
    .catch(error => {
        console.error('Ocurrió un error: ', error);
    }); 

    });

    
    let btn = document.getElementById("guardarCambios")
    let paquetesSeleccionados = [];


    btn.addEventListener("click", function(){

      let paquetesSeleccionadosNuevos = [];

      latitud_longitud_paquete.forEach(element => {
          let id = element.id;
          let checkbox = document.getElementById(`check${id}`);
          if (checkbox.checked) {
              paquetesSeleccionadosNuevos.push({
                  id: element.id,
                  latitud: element.latitud,
                  longitud: element.longitud
              });
          }
      });
  
      console.log("Paquetes seleccionados:", paquetesSeleccionadosNuevos);


      if (paquetesSeleccionadosNuevos.length > 0) {
        // Crear un arreglo de waypoints
        const waypoints = paquetesSeleccionadosNuevos.map(paquete => ({
          location: new google.maps.LatLng(paquete.latitud, paquete.longitud),
          stopover: true
        }));
    
        const directionsService = new google.maps.DirectionsService();
    
        // Configurar la solicitud con la ubicación de origen y destino
        const request = {
          origin: new google.maps.LatLng(-34.8681439523412, -56.166493557192815), // Origen (cambia por tus coordenadas)
          destination: new google.maps.LatLng(-34.8681439523412, -56.166493557192815), // Inicializar en el mismo origen
          waypoints: waypoints,
          optimizeWaypoints: true, // Optimizar el orden de los waypoints
          travelMode: google.maps.TravelMode.DRIVING
        };
    
        // Realizar la solicitud para calcular la ruta
        directionsService.route(request, function(result, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            const map = new google.maps.Map(document.getElementById('map'), {
              zoom: 10,
              center: new google.maps.LatLng(-34.8681439523412, -56.166493557192815)
            });
            const directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
    
            // Mostrar la ruta óptima en el mapa
            directionsDisplay.setDirections(result);
          } else {
            console.error('Error al calcular la ruta: ' + status);
          }
        });
      } else {
        console.log("No se han seleccionado paquetes para entregar.");
      }

    })                