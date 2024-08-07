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


async function obtenerDatos(user) {
    btnAlquilar.classList.remove("ocultar")
    try {
        let res = await fetch(url)
        if (res.ok) {
            const tablaBody = document.querySelector("#bodyTablaAlquiler")
            tablaBody.innerHTML = ''
            let datos = await res.json()
            console.log(datos)
            datos.forEach(objeto => {
                if (objeto.email === user.email) {
                    let carrito = objeto.carrito
                    console.log(carrito)
                    carrito.forEach(element => {
                    const fila = document.createElement("tr")
                    const propiedadAMostrar = ["auto", "modelo", "cantidadDias"]
                        for (const propiedad of propiedadAMostrar) {
                            const celda = document.createElement("td")
                            celda.textContent = element[propiedad]
                            fila.appendChild(celda)
                        }
                        const celdaTotal = document.createElement("td")
                        let total = calcularTotal(element)
                        celdaTotal.textContent = `$${total}`
                        fila.appendChild(celdaTotal)
    
                        const celdaEliminar = document.createElement("td")
                        const celdaEditar = document.createElement("td")
                        const btnEditar = document.createElement("button")
                        const btnEliminar = document.createElement("button")
                        btnEditar.textContent = "Editar"
                        btnEliminar.textContent = "Eliminar"
                        btnEditar.addEventListener("click", () => {
                            mostrarEditarAlquiler(element)
                        })
                        btnEliminar.addEventListener("click", (e) => {
                            e.preventDefault()
                            eliminarAlquiler(element.idAlquiler)
                        })
                        celdaEditar.appendChild(btnEditar)
                        celdaEliminar.appendChild(btnEliminar)
                        fila.appendChild(celdaEditar)
                        fila.appendChild(celdaEliminar)
                        tablaBody.appendChild(fila)
                    });
                    
                }
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
    debugger
    //e.preventDefault()
    let data = new FormData(formAlquiler)
    mensajeAlquiler.innerHTML = " "
    let nuevoId
    if (user.carrito.length != 0){
        let ultimoObjeto = user.carrito[user.carrito.length - 1];
        nuevoId = ultimoObjeto.idAlquiler + 1
        console.log(nuevoId)
    }
    else
        nuevoId = 0
   
    const nuevoAlquiler = {
        idAlquiler: nuevoId,
        auto: data.get("auto"),
        modelo: data.get("modelo"),
        cantidadDias: data.get("cantidadDias"),

    }
    user.carrito.push(nuevoAlquiler)
    localStorage.setItem('user', JSON.stringify(user))
    console.log(user.carrito)
    try {
        let res = await fetch(`${url}/${user.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        })
        if (res.ok) {
            mensajeAlquiler.innerHTML = "Nuevo alquiler creado"
            obtenerDatos(user)
            formAlquiler.classList.remove("visible")

        }
        else
            mensajeAlquiler.innerHTML = "Hubo un error al cargar los datos"
    } catch (error) {
        console.log(error)
    }
}

async function eliminarAlquiler(idAEliminar) {
    
    user.carrito = user.carrito.filter(objeto => 
        objeto.idAlquiler != idAEliminar
    )
   
    try {
        let res = await fetch(`${url}/${user.id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body" : JSON.stringify(user)
        })
        if (res.ok) {
            mensajeAlquiler.innerHTML = "Item eliminado!"
            obtenerDatos(user)
        }
        else
            mensajeAlquiler.innerHTML = "Hubo un error al cargar los datos"

    }
    catch (error) {
        console.log(error)

    }
}

function mostrarEditarAlquiler(alquilerAEditar) {
    funcion = "editar"
    id = alquilerAEditar.idAlquiler
    formAlquiler.classList.add("visible")
    btnForm.textContent = "Editar"
    btnAlquilar.classList.add("ocultar")
    mensajeAlquiler.innerHTML = " "

    document.querySelector("#auto").value = alquilerAEditar.auto
    document.querySelector("#modelo").value = alquilerAEditar.modelo
    document.querySelector("#cantidadDias").value = alquilerAEditar.cantidadDias
}

async function editar() {
    const auto = document.querySelector("#auto").value
    const modelo = document.querySelector("#modelo").value
    const cantidadDias = document.querySelector("#cantidadDias").value
    const alquilerEditado = {
        idAlquiler: id,
        auto: auto,
        modelo: modelo,
        cantidadDias: cantidadDias
    }
    
    for (const item of user.carrito) {
        if (item.idAlquiler === id){
            for (const atributo in alquilerEditado) {
                item[atributo] = alquilerEditado[atributo];
            }
            localStorage.setItem('user', JSON.stringify(user))
            break
        }
    }
    try {
        let res = await fetch(`${url}/${user.id}`, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(user)
        })
        if (res.ok === true) {
            mensajeAlquiler.innerHTML = "Alquiler editado correctamente"
            obtenerDatos(user)
            formAlquiler.classList.remove("visible")
        }
        else
            mensajeAlquiler.innerHTML = "Hubo un error al cargar los datos"
    } catch (error) {
        console.log(error)
    }
}

function calcularTotal(item) {

    if (item.auto === "Ferrari")
        return precioFerrari * item.cantidadDias
    if (item.auto === "Lamborghini")
        return precioLamborghini * item.cantidadDias
    if (item.auto === "Bugatti")
        return precioBugatti * item.cantidadDias
    if (item.auto === "Tesla")
        return precioTesla * item.cantidadDias
    if (item.auto === "Rolls-Royce")
        return precioRollsRoyce * item.cantidadDias
    if (item.auto === "Porsche")
        return precioPorsche * item.cantidadDias
    return ""
}

let user = JSON.parse(localStorage.getItem('user'))
console.log(user)
if (user){
    obtenerDatos(user)
}
else{
    mensajeAlquiler.textContent = "Debes iniciar sesion para utilizar nuestros servicios"
    btnAlquilar.classList.add("ocultar")
}