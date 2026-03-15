"use client"
import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function Registro() {
    const [contraseña, setcontraseña] = useState("")
    const [confirmarContraseña, setConfirmarContraseña] = useState("")
    const [error, setError] = useState("")
    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [cargando, setCargando] = useState(false)

    const handleRegistro = async (e) => {
        e.preventDefault()
        setError("")

        if (contraseña !== confirmarContraseña) {
            setError("Las contraseñas no coinciden.")
            return
        }

        setCargando(true)

        const { data, error: authError } = await supabase.auth.signUp({
            email: email,
            password: contraseña,
            options: {
                data: {
                    nombre: nombre
                }
            }
        })

        if (authError) {
            setError("Error al registrar: " + authError.message)
            setCargando(false)
            return
        }

        console.log("¡Usuario registrado!", data)
        window.location.href = '/home';
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/mfondo.jpg')]">
            <form onSubmit={handleRegistro} className="bg-grisoscuro_fondo p-10 rounded-4xl w-full max-w-md flex flex-col shadow-2xl">
                <h2 className="font-titulo flex justify-center text-white text-3xl pb-10">Registro</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-md mb-5 text-center">
                        {error}
                    </div>
                )}
                
                <p className="text-xl">Nombre de usuario</p>
                <input type="text" placeholder="Introduce tu nombre de usuario..." minLength="4" maxLength="20" required value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-3 rounded-md bg-white text-black mb-5"/>
                
                <p className="text-xl">Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." minLength="4" maxLength="35" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-md bg-white text-black mb-5"/>
                
                <p className="text-xl">Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required value={contraseña} onChange={(e) => setcontraseña(e.target.value)} className="w-full p-3 rounded-md bg-white text-black mb-5"/>
                
                <p className="text-xl">Confirmar contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required value={confirmarContraseña} onChange={(e) => setConfirmarContraseña(e.target.value)} className="w-full p-3  rounded-md bg-white text-black mb-5"/>
                <br/>
                <div className="grid grid-cols-2 gap-4 w-full px-2">
                    <Link href="/..">
                        <button className="cancelar w-full h-full text-2xl">Volver</button>
                    </Link>

                    <button type="submit" disabled={cargando} className={"confirmar w-full h-full text-2xl"} >
                        {cargando ? "Cargando..." : "Registrarse"}
                    </button>

                </div>
            </form>
        </div>
    )
}
