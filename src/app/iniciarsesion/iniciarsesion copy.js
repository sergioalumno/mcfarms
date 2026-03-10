"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function IniciarSesion() {
    // 1. Estados para controlar los inputs y errores
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)

    const router = useRouter()

    // 2. Función que se ejecuta al enviar el formulario
    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        setCargando(true)

        // 3. Petición a Supabase para iniciar sesión
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email: email.trim(), // Limpiamos espacios por si acaso
            password: password,
        })

        if (authError) {
            // Si las credenciales fallan (contraseña mal, usuario no existe...)
            setError("Correo o contraseña incorrectos.")
            setCargando(false)
            return
        }

        // 4. ¡Login exitoso! Redirigimos al Home
        console.log("¡Sesión iniciada!", data)
        router.push("/home")
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/mfondo.jpg')]">

            {/* Añadimos el onSubmit al form */}
            <form onSubmit={handleLogin} className="bg-grisoscuro_fondo p-10 rounded-4xl w-full max-w-md flex flex-col shadow-2xl">

                <h2 className="font-titulo flex justify-center text-white text-3xl pb-10">Inicio de Sesión</h2>
                
                {/* Mostramos errores si los hay */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-md mb-5 text-center">
                        {error}
                    </div>
                )}

                <p className="text-xl text-white">Correo electrónico</p>
                <input 
                    type="email" 
                    placeholder="Introduce tu correo electrónico..." 
                    minLength="4" 
                    maxLength="35" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-md bg-white text-black mb-5"
                />
                
                <p className="text-xl text-white pt-5">Contraseña</p>
                <input 
                    type="password" 
                    placeholder="Introduce tu contraseña..." 
                    minLength="8" 
                    maxLength="30" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-10 p-3 rounded-md bg-white text-black"
                />

                <div className="grid grid-cols-2 gap-4 w-full px-2">
                    <Link href="/..">
                        {/* Importante: type="button" para que no intente enviar el form */}
                        <button type="button" className="cancelar w-full h-full text-2xl py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                            Volver
                        </button>
                    </Link>
                    
                    {/* Botón de enviar sin Link, disparando el submit */}
                    <button 
                        type="submit" 
                        disabled={cargando}
                        className={`confirmar w-full h-full text-2xl py-2 rounded-md text-white transition ${cargando ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {cargando ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                </div>

            </form>
        </div>
    )
}