"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
    // 1. Estados para guardar los proyectos reales y saber si está cargando
    const [proyectos, setProyectos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    // 2. Fetch a tu route.js cuando la página carga
    useEffect(() => {
        const cargarProyectos = async () => {
            try {
                // Llamamos a la API que creamos en app/api/proyectos/route.js
                const res = await fetch("/api/proyectos")
                if (!res.ok) throw new Error("Error al cargar los proyectos")
                
                const data = await res.json()
                setProyectos(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setCargando(false)
            }
        }

        cargarProyectos()
    }, [])

    return(
        <div className="min-h-screen flex flex-col items-center">
            <div className="w-[95%] mx-auto px-8 py-10">
                
                <h1 className="font-titulo text-white text-4xl pb-10">Inicio</h1>
                <h2 className="text-2xl text-white pb-10">Proyectos recientes</h2>

                {/* 3. Manejo de estados: Cargando, Error o Mostrar Tarjetas */}
                {cargando ? (
                    <p className="text-white text-xl">Cargando los últimos proyectos...</p>
                ) : error ? (
                    <p className="text-red-500 text-xl">{error}</p>
                ) : proyectos.length === 0 ? (
                    <p className="text-white text-xl">Aún no hay proyectos subidos. ¡Sé el primero!</p>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 w-full gap-y-12" >
                        {proyectos.map(tarjeta => (
                            <RenderizarTarjeta key={tarjeta.id} objtarjeta={tarjeta} />
                        ))}
                    </div>
                )}
                
            </div>
        </div>
    )
}

function RenderizarTarjeta({objtarjeta}) {
    return(
        // Añadimos el Link para que al hacer clic te lleve al proyecto concreto
        <Link href={`/proyecto/${objtarjeta.id}`} className="h-full">
            <div className="bg-grisoscuro_fondotarj text-white font-bold p-8 rounded-4xl flex flex-col items-center hover:scale-105 transition-transform cursor-pointer h-full">

                {/* Añadimos aspect-square y object-cover para que todas las fotos sean uniformes */}
                <div className="border-4 border-verde_sombra rounded-2xl overflow-hidden mb-3 w-full aspect-square bg-black flex items-center justify-center">
                    <img 
                        src={objtarjeta.img || "/mfondo.jpg"} 
                        className="w-full h-full object-cover" 
                        alt={`Portada de ${objtarjeta.nombre}`} 
                    />
                </div>
                
                <div className="text-center mt-auto pt-2">
                    <p className="text-lg line-clamp-1">{objtarjeta.nombre}</p>
                    <p className="text-sm font-normal text-gray-300">{objtarjeta.creador}</p>
                </div>
                
            </div>
        </Link>
    )
}