"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
    const [proyectos, setProyectos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const cargarProyectos = async () => {
            try {
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

    const mostrar = () => {
        if (cargando) {
            return <p className="text-white text-xl">Cargando los últimos proyectos...</p>
        }

        if (error) {
            return <p className="text-red-500 text-xl">{error}</p>
        }

        if (proyectos.length === 0) {
            return <p className="text-white text-xl">Aún no hay proyectos subidos. ¡Sé el primero!</p>
        }

        return (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 w-full gap-y-12">
                {proyectos.map(tarjeta => (
                    <RenderizarTarjeta key={tarjeta.id} objtarjeta={tarjeta} />
                ))}
            </div>
        )
    }

    return(
        <div className="min-h-screen flex flex-col items-center">

                <div className="w-[95%] mx-auto px-8 py-10">
                
                    <h1 className="font-titulo text-white text-4xl pb-10">Inicio</h1>
                    <h2 className="text-2xl pb-10">Proyectos recientes</h2>

                    {mostrar()}

                </div>
        </div>
    )
}

function RenderizarTarjeta({objtarjeta}) {
    return(
        <div className="bg-grisoscuro_fondotarj text-white font-bold p-8 rounded-4xl flex flex-col items-center hover:scale-105 transition-transform">
            <Link href={`/proyecto/${objtarjeta.id}`}>

                <div className="border-4 border-verde_sombra rounded-2xl overflow-hidden mb-3">
                    <img src={objtarjeta.img} className="w-full"/>
                </div>

                <div className="text-center">
                    <p className="text-lg">{objtarjeta.nombre}</p>
                    <p className="text-sm">{objtarjeta.creador}</p>
                </div>
            </Link>
        </div>
    )
}