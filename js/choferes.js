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
                    <td><a href="./prueba.html">Google maps</a></td>
                    <td>Jose Sanchez</td>
                    <td>#1</td>
                    <td><input type="checkbox"></td>
                </tr>
                
                `

            })

            .catch(error => {
                console.error('Ocurrió un error: ', error);
            });
      
            
    });

    })
    .catch(error => {
        console.error('Ocurrió un error: ', error);
    }); 

  /* fetch(URL_DETALLE_PAQUETE)
  .then(response => {
      if (!response.ok) {
        throw new Error('La solicitud no pudo ser completada.');
      }
      return response.json(); // O response.text() si la respuesta no es JSON.
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Ocurrió un error: ', error);
    }); */