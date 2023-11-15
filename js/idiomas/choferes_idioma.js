let es = document.getElementById("es")
let en = document.getElementById("en")

//navbar
let txtInicio = document.getElementById("inicio")
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
let txtRuta = document.getElementById("ruta")

function traducirAIngles(){

    //navbar
    txtInicio.innerHTML = "Home"
    txtContacto.innerHTML = "Contact"
    txtIdioma.innerHTML = "Language"
    txtTema.innerHTML = "Theme"
    txtContactenos.innerHTML = "Contact us"

    txtBienvenido.innerHTML = "Welcome driver"
    txtNroPaquete.innerHTML = "Package number"
    txtDireccion.innerHTML = "Address"
    txtBulto.innerHTML = "Bulk"
    txtEnvioEntregado.innerHTML = "Mark as delivered"
    txtRuta.innerHTML = "Create path"
    txtGuardarCambios.innerHTML = "Create path"
    
    for (let i = 0; i < txtEntregar.length; i++) {
        txtEntregar[i].innerHTML = "Deliver";
    }

}

function traducirAEspanol(){

    //navbar
    txtInicio.innerHTML = "Inicio"
    txtContacto.innerHTML = "Contacto"
    txtIdioma.innerHTML = "Idioma"
    txtTema.innerHTML = "Tema"
    txtContactenos.innerHTML = "Contactenos"

    txtBienvenido.innerHTML = "Bienvenido chofer"
    txtNroPaquete.innerHTML = "nro paquete"
    txtDireccion.innerHTML = "Dirección"
    txtBulto.innerHTML = "Bulto"
    txtEnvioEntregado.innerHTML = "Entregar paquete"
    txtGuardarCambios.innerHTML = "Crear ruta"
    txtRuta.innerHTML = "Crear ruta"
    
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