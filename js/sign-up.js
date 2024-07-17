
let form = document.querySelector("#formSignUp")
form.addEventListener("submit", enviarSignup)

let url = "https://66636d9f62966e20ef0c910a.mockapi.io/api/autos"

let captchaGenerado = generarCaptcha();
let labelcaptcha = document.querySelector("#labelcaptcha")
labelcaptcha.innerHTML = captchaGenerado

function generarCaptcha() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * caracteres.length);
        captcha += caracteres[randomIndex];
    }
    return captcha;
}

async function enviarSignup(e) {
    e.preventDefault()

    let formData = new FormData(form)
    let mensaje = document.querySelector("#mensaje")
    let captchaingresado = formData.get('inputCaptcha')


    if (captchaGenerado == captchaingresado) {
        form.innerHTML = ""        // limpiar formulario
        mensaje.innerHTML = "El formulado se ha enviado con exito!! Gracias por confiar en Luxor Rent Car"
        mensaje.style.color = "green"
        let nuevoUsuario = {
            "email": formData.get('email'),
            "password": formData.get('inputPassword'),
            "nombre": formData.get('nombre'),
            "telefono": formData.get('telefono'),
            "carrito" : []
        }
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(nuevoUsuario)
            })
            if (res.status === 201) {
                mensajeAlquiler.innerHTML = "Nuevo alquiler creado"
                obtenerDatos()
                formAlquiler.classList.remove("visible")

            }
            else
                mensajeAlquiler.innerHTML = "Hubo un error al cargar los datos"
        } catch (error) {

        }
    }
    else {
        mensaje.innerHTML = "El captcha no coincide. Presione F5 para ingresar nuevamente los datos"
        mensaje.style.color = "red"
    }
}


