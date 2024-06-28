"use strict"
const mensajeAlquiler = document.querySelector("#mensaje-alquiler")
let url = "https://66636d9f62966e20ef0c910a.mockapi.io/api/autos"

let formAlquiler = document.querySelector("#form-alquiler")
let btnForm = document.querySelector("#btnForm")
let btnAlquilar = document.querySelector(".btnAlquilar")

let id
let funcion

let precioFerrari = 150
let precioBugatti = 180
let precioLamborghini = 220
let precioTesla = 90
let precioRollsRoyce = 190
let precioPorsche = 110

document.querySelector("#optionFerrari").text += ` $${precioFerrari}/dia`
document.querySelector("#optionBugatti").text += ` $${precioBugatti}/dia`
document.querySelector("#optionLamborghini").text += ` $${precioLamborghini}/dia`
document.querySelector("#optionTesla").text += ` $${precioTesla}/dia`
document.querySelector("#optionRollsRoyce").text += `$ ${precioRollsRoyce}/dia`
document.querySelector("#optionPorsche").text += ` $${precioPorsche}/dia`

formAlquiler.addEventListener("submit", (e) => {
    console.log(funcion)
    e.preventDefault()
    if (funcion === "agregar")
        agregarAlquiler()
    else
        editar()
})

document.querySelector(".btnAlquilar").addEventListener("click", () => {
    funcion = "agregar"
    formAlquiler.classList.add("visible")
    btnForm.textContent = "Añadir"
    mensajeAlquiler.innerHTML = " "
    btnAlquilar.classList.add("ocultar")
})


async function obtenerDatos() {
    btnAlquilar.classList.remove("ocultar")
    try {
        let res = await fetch(url)
        if (res.ok) {
            const tablaBody = document.querySelector("#bodyTablaAlquiler")
            tablaBody.innerHTML = ''
            let datos = await res.json()
            console.log(datos)
            datos.forEach(objeto => {
                console.log(objeto["auto"])
                const fila = document.createElement("tr")
                const propiedadAMostrar = ["auto", "modelo", "cantidadDias"]
                for (const propiedad of propiedadAMostrar) {
                    const celda = document.createElement("td")
                    celda.textContent = objeto[propiedad]
                    fila.appendChild(celda)
                }
                const celdaTotal = document.createElement("td")
                let total = calcularTotal(objeto)
                celdaTotal.textContent = `$${total}`
                fila.appendChild(celdaTotal)

                const celdaEliminar = document.createElement("td")
                const celdaEditar = document.createElement("td")
                const btnEditar = document.createElement("button")
                const btnEliminar = document.createElement("button")
                btnEditar.textContent = "Editar"
                btnEliminar.textContent = "Eliminar"
                btnEditar.addEventListener("click", () => {
                    mostrarEditarAlquiler(objeto)
                })
                btnEliminar.addEventListener("click", (e) => {
                    e.preventDefault()
                    eliminarAlquiler(objeto.id)
                })
                celdaEditar.appendChild(btnEditar)
                celdaEliminar.appendChild(btnEliminar)
                fila.appendChild(celdaEditar)
                fila.appendChild(celdaEliminar)
                tablaBody.appendChild(fila)
            });
        }
        else {
            mensajeAlquiler.innerHTML = "No se encontro la URL"
        }

    } catch (error) {
        mensajeAlquiler.innerHTML = "No hubo Coneccion con el servidor"

    }

}

async function agregarAlquiler() {
    //e.preventDefault()
    let data = new FormData(formAlquiler)
    mensajeAlquiler.innerHTML = " "
    const nuevoAlquiler = {
        auto: data.get("auto"),
        modelo: data.get("modelo"),
        cantidadDias: data.get("cantidadDias"),

    }
    console.log(nuevoAlquiler)
    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(nuevoAlquiler)
        })
        if (res.status === 201) {
            mensajeAlquiler.innerHTML = "Nuevo alquiler creado"
            obtenerDatos()
            formAlquiler.classList.remove("visible")

        }
        else
            mensajeAlquiler.innerHTML = "Hubo un error al cargar los datos"
    } catch (error) {
        console.log(error)
    }
}

async function eliminarAlquiler(id) {

    // let id = document.querySelector("#inputIdEliminar").value
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "DELETE",
            "headers": { "Content-type": "application/json" },
        })
        if (res.status === 200) {
            mensajeAlquiler.innerHTML = "Item eliminado!"
            obtenerDatos()
        }
        else
            mensajeAlquiler.innerHTML = "Hubo un error al cargar los datos"

    }
    catch (error) {
        console.log(error)

    }
}

function mostrarEditarAlquiler(objeto){
    funcion = "editar"
    id = objeto.id
    formAlquiler.classList.add("visible")
    btnForm.textContent = "Editar"
    btnAlquilar.classList.add("ocultar")
    mensajeAlquiler.innerHTML = " "
    document.querySelector("#auto").value = objeto.auto
    document.querySelector("#modelo").value = objeto.modelo
    document.querySelector("#cantidadDias").value = objeto.cantidadDias
}

async function editar() {
    console.log(id)
    const auto = document.querySelector("#auto").value
    const modelo = document.querySelector("#modelo").value
    const cantidadDias = document.querySelector("#cantidadDias").value
    const alquilerEditado = {
        auto: auto,
        modelo: modelo,
        cantidadDias: cantidadDias
    }
    console.log(alquilerEditado)
    try {
        let res = await fetch(`${url}/${id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(alquilerEditado)
        })
        if (res.ok === true) {
            mensajeAlquiler.innerHTML = "Alquiler editado correctamente"
            obtenerDatos()
            formAlquiler.classList.remove("visible")
        }
        else
            mensajeAlquiler.innerHTML = "Hubo un error al cargar los datos"
    } catch (error) {
        console.log(error)
    }
}

function calcularTotal(objeto){
    if(objeto.auto === "Ferrari")
        return precioFerrari * objeto.cantidadDias
    if(objeto.auto === "Lamborghini")
        return precioLamborghini * objeto.cantidadDias
    if(objeto.auto === "Bugatti")
        return precioBugatti * objeto.cantidadDias
    if(objeto.auto === "Tesla")
        return precioTesla * objeto.cantidadDias
    if(objeto.auto === "Rolls-Royce")
        return precioRollsRoyce * objeto.cantidadDias
    if(objeto.auto === "Porsche")
        return precioPorsche * objeto.cantidadDias
}

obtenerDatos()