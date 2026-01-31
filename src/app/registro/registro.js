"use client"
import { useState } from "react"
import Link from "next/link"

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
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/mfondo.jpg')]">
            <form onSubmit={validarcontraseñas} className="bg-grisoscuro_fondo p-10 rounded-4xl w-full max-w-md flex flex-col shadow-2xl">
                <h2 className="font-titulo flex justify-center text-white text-3xl pb-10">Registro</h2>
                
                <p className="text-xl">Nombre de usuario</p>
                <input type="text" placeholder="Introduce tu nombre de usuario..." minLength="4" maxLength="20" required className="w-full p-3 rounded-md bg-white text-black mb-5"/>
                
                <p className="text-xl">Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." minLength="4" maxLength="35" required className="w-full p-3 rounded-md bg-white text-black mb-5"/>
                
                <p className="text-xl">Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required onChange={(e) => setcontraseña(e.target.value)} className="w-full p-3 rounded-md bg-white text-black mb-5"/>
                
                <p className="text-xl">Confirmar contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required onChange={(e) => setConfirmarContraseña(e.target.value)} className="w-full p-3  rounded-md bg-white text-black mb-5"/>
                <br/>
                {error}
                <div className="grid grid-cols-2 gap-4 w-full px-2">
                    <Link href="/..">
                    <button className="cancelar w-full h-full text-2xl">Volver</button>
                    </Link>
                    <Link href="/home">
                    <button type="submit" className="confirmar w-full h-full text-2xl">Registrarse</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
