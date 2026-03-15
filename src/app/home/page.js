"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import Paginacion from "../Paginacion" 

export default function HomePage() {
    const [proyectos, setProyectos] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    
    useEffect(() => {
        async function cargarDatosUsuario() {
            try {
                const res = await fetch('/api/sesion')
                if (res.ok) {
                    const datos = await res.json()
                    setUsuario(datos) 
                }
            } catch (error) {
                console.error("Error en la petición de usuario", error)
            }
        }
        cargarDatosUsuario()
    }, [])
    
    useEffect(() => {
        const cargarProyectos = async () => {
            setCargando(true)
            try {
                
                const res = await fetch(`/api/proyectos?page=${paginaActual}`)
                if (!res.ok) throw new Error("Error al cargar los proyectos")
                
                const data = await res.json()
                setProyectos(data.resultados || [])
                setTotalPaginas(data.totalPaginas || 1)
            } catch (err) {
                setError(err.message)
            } finally {
                setCargando(false)
            }
        }
        cargarProyectos()
    }, [paginaActual]) 

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
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch xl:grid-cols-4 mx-auto gap-x-8 w-full gap-y-12">
                {proyectos.map(tarjeta => (
                    <RenderizarTarjeta key={tarjeta.id} objtarjeta={tarjeta} />
                ))}
            </div>
        )
    }

    return(
        <div className="min-h-screen flex flex-col items-center">
                <div className="w-[95%] mx-auto px-8 py-10">
                    <h1 className="font-titulo text-white text-4xl pb-5">Inicio</h1>
                    <h1 className="font-titulo text-white text-2xl pb-5">Bienvenido/a {usuario?.nombre}</h1>
                    <h2 className="text-2xl pb-10">Proyectos recientes</h2>

                    {mostrar()}

                    {!cargando && proyectos.length > 0 && (
                        <Paginacion 
                            paginaActual={paginaActual} 
                            totalPaginas={totalPaginas} 
                            cambiarPagina={setPaginaActual} 
                        />
                    )}

                </div>
        </div>
    )
}

function RenderizarTarjeta({objtarjeta}) {
    return(
        <div className="bg-grisoscuro_fondotarj text-white font-bold p-8 rounded-4xl flex flex-col items-center hover:scale-105 h-full transition-transform">
            <Link href={`/proyecto/${objtarjeta.id}`}>
            
                <div className="border-4 border-verde_sombra rounded-2xl overflow-hidden mb-3 mx-auto w-full aspect-square flex items-center justify-center">
                    <img src={objtarjeta.img} className="w-full h-full object-cover object-center" />
                </div>

                <div className="text-center">
                    <p className="text-lg">{objtarjeta.nombre}</p>
                    <p className="text-sm">{objtarjeta.creador}</p>
                </div>

            </Link>
        </div>
    )
}