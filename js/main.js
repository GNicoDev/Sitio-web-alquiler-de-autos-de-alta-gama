document.querySelector(".iconoMenu").addEventListener("click", desplegarMenu)
document.querySelector("#modoOscuro").addEventListener("click", modoOscuro)
let URLactual = window.location.href
const main = document.querySelector("#main")
main.classList.remove("contenedor")

let botones = document.querySelectorAll(".botones")

for (const btn of botones) {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        mostrarSpa(btn.href)
        document.querySelector("video").classList.add("ocultarVideo")
        main.classList.add("contenedor")
    })
}

async function mostrarSpa(url) {
    debugger
    try {
        let res = await fetch(url)
        if (res.ok) {
            const texto = await res.text()
            main.innerHTML = texto
            if (url === "http://127.0.0.1:5502/sign-in.html")
                cargarScript("js/sign-in.js")
        }
        else
            main.innerHTML = "No se encontro la pagina"
    } catch (error) {
        main.innerHTML = "No hubo coneccion con el servidor"
    }

}

function desplegarMenu() {
    document.querySelector(".contMenu ul").classList.toggle("oculto")
}

function modoOscuro() {
    let li = document.querySelector("#modoOscuro").innerHTML
    console.log(li)
    console.log(URLactual)
    document.querySelector("body").classList.toggle("modoOscuroClaro")
    document.querySelector("#main").classList.toggle("modoOscuroContMain")

    if (li == "Modo oscuro") {
        document.querySelector(".logo").src = "images/logoModoOscuro.png"
        document.querySelector(".iconoMenu").src = "images/iconoMenuModoOscuro.png"
        document.querySelector("#modoOscuro").innerHTML = "Modo claro"
    }
    else {
        document.querySelector("#modoOscuro").innerHTML = "Modo oscuro"
        document.querySelector(".logo").src = "images/logo.png"
        document.querySelector(".iconoMenu").src = "images/iconoMenu.png"
    }
}

async function cargarScript(src) {
    // Usa fetch para obtener el script
    let response = await fetch(src);
    let scriptText = await response.text();

    // Crea un nuevo script y añade el texto del script
    let script = document.createElement('script');
    script.textContent = scriptText;

    // Añade el script al documento
    document.head.append(script);
}

//localStorage.clear()


