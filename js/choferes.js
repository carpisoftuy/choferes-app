function entregarPaquete(id) {

  $.ajax({
    method: "POST",
    url: "http://127.0.0.1:8000/api/v1/paquetes/entregar/",
    data: { id: id },
    success: function(response){
      
      console.log(response)
      window.location.reload();
      

    }
  })
  
}


document.addEventListener("DOMContentLoaded", function() {

let URL_PAQUETES_PARA_ENTREGAR = "http://127.0.0.1:8000/api/v1/paquetes/paraEntregar/"

let URL_DETALLE_PAQUETE = "http://127.0.0.1:8000/api/v1/paquetes/paraEntregar/detalle/"

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

                //insertar los datos en el front-end

                let tabla_body = document.getElementById("tabla_body")

                tabla_body.innerHTML += `
                
                <tr>
                    <td>${datos_paquete.id}</td>
                    <td>${datos_paquete.direccion}</td>
                    <td><a class="googleMaps" id="paquete${datos_paquete.id}" href="#" latitud="${datos_paquete.latitud}" longitud="${datos_paquete.longitud}">Google maps</a></td>
                    <td>#1</td>
                    <td><button id="btn${datos_paquete.id}" class="btn-guardar btn-entregar" onclick="entregarPaquete(${datos_paquete.id})">Entregar</button></td>
                </tr>
                
                `

                document.querySelectorAll('.googleMaps').forEach(function(link){

                  link.addEventListener('click', function(event) {
            
                    event.preventDefault();
                    const packageLatitude = parseFloat(event.target.getAttribute('latitud'));
                    const packageLongitude = parseFloat(event.target.getAttribute('longitud'));
            
                    console.log(packageLatitude + " " + packageLongitude)


                    const directionsService = new google.maps.DirectionsService();
      
                    // Configura la solicitud con la ubicación de origen y destino.
                    const request = {
                      origin: new google.maps.LatLng(-34.8681439523412, -56.166493557192815), // Cambia por tus coordenadas de origen
                      destination: new google.maps.LatLng(packageLatitude, packageLongitude), // Coordenadas ingresadas por el usuario
                      travelMode: google.maps.TravelMode.DRIVING, // Puedes cambiar el modo de viaje según tus necesidades
                    };
                  
                    // Realiza la solicitud para calcular la ruta.
                    directionsService.route(request, function (result, status) {
                      if (status === google.maps.DirectionsStatus.OK) {
                        // El resultado contiene la ruta más cercana.
                        // Puedes mostrarlo en el mapa o procesarlo como desees.
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


    