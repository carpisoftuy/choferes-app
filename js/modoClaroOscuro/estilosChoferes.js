const switchTema = document.getElementById("switch");

const HIPERVINCULOS = document.querySelectorAll("a");
const NAVBAR = document.querySelectorAll("nav");
const PARRAFOS = document.querySelectorAll("p");
const BODY = document.querySelectorAll("body");
const H3 = document.querySelectorAll("h3");
const H1 = document.querySelectorAll("h1");
const H6 = document.querySelectorAll("h6");
const FOOTER = document.getElementById("footer");
const LI = document.querySelectorAll("li");
const HAMBURGUESA = document.getElementById("hamburguesa");
const TH = document.querySelectorAll("th")
const BTN = document.querySelectorAll("button")
const BIENVENIDO = document.getElementById("bienvenidoChofer")


///variables color tema claro////

let colorFuenteTemaClaro = "#FFF"
let backgroundTemaClaro = "#007bff"
let colorBody = "#FFF"

function estilosTemaClaro(){

    HIPERVINCULOS.forEach(hiper =>{
        hiper.classList.add("link-con-after")
    })

    BODY.forEach(body =>{
        body.style.backgroundColor = colorBody;
    })

    HIPERVINCULOS.forEach(hiper =>{
        hiper.style.color = colorFuenteTemaClaro;
    })
    
    NAVBAR.forEach(nav =>{
        nav.style.backgroundColor = backgroundTemaClaro;
    })

    PARRAFOS.forEach(p=>{
        p.style.color = colorFuenteTemaClaro;
    })

    TH.forEach(t=>{
        t.style.color = colorBody;
        t.style.backgroundColor = backgroundTemaClaro;
    })

    H3.forEach(h=>{
        h.style.color = colorBody;
    })

    H6.forEach(h=>{
        h.style.color = colorBody;
    })

    H1.forEach(h=>{
        h.style.color = colorFuenteTemaClaro;
    })

    BIENVENIDO.style.color = backgroundTemaClaro

    BTN.forEach(btn =>{
        btn.style.color = "#fff";
        btn.style.backgroundColor = backgroundTemaClaro
    })

    FOOTER.style.backgroundColor = backgroundTemaClaro;

    LI.forEach(l=>{
        l.style.color = colorFuenteTemaClaro;
    })

    HAMBURGUESA.style.backgroundColor = colorFuenteTemaClaro;

}

function estilosTemaOscuro(){

    HIPERVINCULOS.forEach(hiper =>{
        hiper.classList.remove("link-con-after")
    })

    BODY.forEach(body =>{
        body.style.backgroundColor = "var(--background)";
    })

    HIPERVINCULOS.forEach(hiper =>{
        hiper.style.color = "var(--color-fuente)";
    })

    NAVBAR.forEach(nav =>{
        nav.style.backgroundColor = "var(--color-principal)";
    })

    PARRAFOS.forEach(p=>{
        p.style.color = "var(--color-fuente)";
    })

    TH.forEach(t=>{
        t.style.color = "var(--color-fuente)";
        t.style.backgroundColor = "var(--color-principal)"
    })

    H3.forEach(h=>{
        h.style.color = "var(--color-fuente)";
    })

    H6.forEach(h=>{
        h.style.color = "var(--color-fuente)";
    })

    H1.forEach(h=>{
        h.style.color = "var(--color-fuente)";
    })

    BTN.forEach(btn =>{
        btn.style.color = "var(--color-fuente)";
        btn.style.backgroundColor = "var(--color-principal)"
    })

    FOOTER.style.backgroundColor = "var(--color-principal)";

    LI.forEach(l=>{
        l.style.color = "var(--color-fuente)";
    })

    HAMBURGUESA.style.backgroundColor = "var(--color-fuente)";

    BIENVENIDO.style.color = "var(--color-fuente)"

}

tema = localStorage.getItem("tema")

if(tema === "claro"){
    estilosTemaClaro()
    switchTema.checked = true
}else{
    estilosTemaOscuro()
    switchTema.checked = false
}


switchTema.addEventListener("change", function(){

    if(switchTema.checked){
        localStorage.setItem("tema", "claro")
        //estilos para el tema claro
        estilosTemaClaro()
    }else{
        localStorage.setItem("tema", "oscuro")
        estilosTemaOscuro()
    }

})