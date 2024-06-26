
let form = document.querySelector("#formSignUp")
form.addEventListener("submit", enviarSignup)

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

function enviarSignup(e) {
    e.preventDefault()

    let formData = new FormData(form)
    let mensaje = document.querySelector("#mensaje")
    let captchaingresado = formData.get('inputCaptcha')


    if (captchaGenerado == captchaingresado) {
        form.innerHTML = ""        // limpiar formulario
        mensaje.innerHTML = "El formulado se ha enviado con exito!! Gracias por confiar en Luxor Rent Car"
        mensaje.style.color = "green"
    }
    else {
        mensaje.innerHTML = "El captcha no coincide. Presione F5 para ingresar nuevamente los datos"
        mensaje.style.color = "red"
    }
}


