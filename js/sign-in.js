
const url = "https://66636d9f62966e20ef0c910a.mockapi.io/api/autos"
const mensaje = document.querySelector("#mensaje")

const formSignIn = document.querySelector("#formSignIn")

formSignIn.addEventListener("submit", conectar)

async function conectar(e) {
    e.preventDefault()

    const formData = new FormData(formSignIn)
    debugger
    let existe= await usuarioValido(formData.get("email"), formData.get("password"))
    console.log(existe)
    if (existe) {
        mensaje.innerHTML = ` Conexion existosa!!`
    }
    else {
        mensaje.innerHTML = "Alguno de los datos son incorrectos. Si todavia no estas registrado te invitamos a hacerlo para poder usar nuestros servivios "
    }


}

async function usuarioValido(email, password) {
    let existe = false
    try {
        const res = await fetch(url)
        if (res.ok) {
            let datos = await res.json()
            datos.forEach(item => {
                if (item.email === email) {
                    if (item.password === password) {
                        localStorage.setItem('user', JSON.stringify(item))
                        existe = true
                        return existe
                    }
                }
            });
            return existe
        }
    } catch (error) {
        console.log(error)
    }
}
