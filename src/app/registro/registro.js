"use client"
import { useState } from "react"

export default function Registro() {
    const [contraseña, setcontraseña] = useState("")
    const [confirmarContraseña, setConfirmarContraseña] = useState("")
    const [error, seterror] = useState("")

    function validarcontraseñas(e) {
        e.preventDefault()

        if (contraseña != confirmarContraseña) {
            seterror("Las contraseñas deben coincidir")
        } else {
            seterror("")
        }
    }

    return (
        <div>
            <form onSubmit={validarcontraseñas}>
                <h2>Registro</h2>
                <p>Nombre de usuario</p>
                <input type="text" placeholder="Introduce tu nombre de usuario..." minLength="4" maxLength="20" required />
                <p>Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." minLength="4" maxLength="35" required />
                <p>Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required onChange={(e) => setcontraseña(e.target.value)}/>
                <p>Confirmar contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required onChange={(e) => setConfirmarContraseña(e.target.value)}/>
                <br/>
                {error}
                <button>Volver</button>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    )
}
