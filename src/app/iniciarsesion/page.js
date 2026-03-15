"use client"

import { useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

export default function IniciarSesion() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [cargando, setCargando] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError("")
        setCargando(true)
        
        const { data, error: authError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password: password,
        })

        if (authError) {
            setError("Correo o contraseña incorrectos.")
            setCargando(false)
            return
        }
        
        const userId = data.user.id;
        const { data: datosUsuario, error: dbError } = await supabase
            .from("usuarios")
            .select("estado")
            .eq("id", userId)
            .single();
        
        if (dbError || datosUsuario?.estado === false) {
            await supabase.auth.signOut();
            setError("Tu cuenta ha sido suspendida por un administrador.");
            setCargando(false);
            return;
        }

        console.log("¡Sesión iniciada!", data)
        window.location.href = '/home';
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/mfondo.jpg')]">
            <form onSubmit={handleLogin} className="bg-grisoscuro_fondo p-10 rounded-4xl w-full max-w-md flex flex-col shadow-2xl">
                <h2 className="font-titulo flex justify-center text-white text-3xl pb-10">Inicio de Sesión</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-white p-3 rounded-md mb-5 text-center">
                        {error}
                    </div>
                )}

                <p className="text-xl text-white">Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." minLength="4" maxLength="35" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-md bg-white text-black"/>
                
                <p className="text-xl pt-5 text-white">Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full mb-10 p-3 rounded-md bg-white text-black"/>

                <div className="grid grid-cols-2 gap-4 w-full px-2">
                    <Link href="/..">
                        <button type="button" className="cancelar w-full h-full text-2xl">Volver</button>
                    </Link>

                    <button type="submit" disabled={cargando} className={"confirmar w-full h-full text-2xl"} >
                        {cargando ? "Cargando..." : "Iniciar Sesión"}
                    </button>

                </div>

            </form>
        </div>
    )
}