let es = document.getElementById("es")
let en = document.getElementById("en")

//navbar
let txtInicio = document.getElementById("inicio")
let txtEnvio = document.getElementById("envios")
let txtContacto = document.getElementById("contacto")
let txtIdioma = document.getElementById("idioma")
let txtTema = document.getElementById("tema")
let txtContactenos = document.getElementById("contactenos")

let txtBienvenido = document.getElementById("bienvenidoChofer")
let txtNroPaquete = document.getElementById("nroPaquete")
let txtDireccion = document.getElementById("direccion")
let txtBulto = document.getElementById("bulto")
let txtEnvioEntregado = document.getElementById("envioEntregado")
let txtGuardarCambios = document.getElementById("guardarCambios")
let txtEntregar = document.getElementsByClassName("btn-entregar")

function traducirAIngles(){

    //navbar
    txtInicio.innerHTML = "Home"
    txtEnvio.innerHTML = "Shipments"
    txtContacto.innerHTML = "Contact"
    txtIdioma.innerHTML = "Language"
    txtTema.innerHTML = "Theme"
    txtContactenos.innerHTML = "Contact us"

    txtBienvenido.innerHTML = "Welcome driver"
    txtNroPaquete.innerHTML = "Package number"
    txtDireccion.innerHTML = "Address"
    txtBulto.innerHTML = "Bulk"
    txtEnvioEntregado.innerHTML = "Mark as delivered"
    txtGuardarCambios.innerHTML = "Save changes"
    
    for (let i = 0; i < txtEntregar.length; i++) {
        txtEntregar[i].innerHTML = "Deliver";
    }

}

function traducirAEspanol(){

    //navbar
    txtInicio.innerHTML = "Inicio"
    txtEnvio.innerHTML = "Envios"
    txtContacto.innerHTML = "Contacto"
    txtIdioma.innerHTML = "Idioma"
    txtTema.innerHTML = "Tema"
    txtContactenos.innerHTML = "Contactenos"

    txtBienvenido.innerHTML = "Bienvenido chofer"
    txtNroPaquete.innerHTML = "nro paquete"
    txtDireccion.innerHTML = "Dirección"
    txtBulto.innerHTML = "Bulto"
    txtEnvioEntregado.innerHTML = "Entregar paquete"
    txtGuardarCambios.innerHTML = "Guardar cambios"
    
    for (let i = 0; i < txtEntregar.length; i++) {
        txtEntregar[i].innerHTML = "Entregar";
    }

}

es.addEventListener("click", function(){
    localStorage.setItem("idioma", "es")
    traducirAEspanol()
})

en.addEventListener("click", function(){
    localStorage.setItem("idioma", "en")
    traducirAIngles()
})

idioma = localStorage.getItem("idioma")

if(idioma == "es"){
    traducirAEspanol()
}

if(idioma == "en"){
    traducirAIngles()
}