"use client"
import { useEffect, useState, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Paginacion from "../Paginacion"

function ContenidoBusqueda() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const [resultados, setResultados] = useState([])
    const [cargando, setCargando] = useState(true)
    const [paginaActual, setPaginaActual] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    useEffect(() => {
        setPaginaActual(1);
    }, [query]);

    useEffect(() => {
        if (!query) return;
        async function buscar() {
            setCargando(true)
            try {
                // Aquí sigues usando tu archivo route (/api/buscar)
                const res = await fetch(`/api/buscar?tipo=proyectos&q=${query}&page=${paginaActual}`)
                if (res.ok) {
                    const data = await res.json()
                    setResultados(data.resultados)
                    setTotalPaginas(data.totalPaginas)
                }
            } catch (error) { 
                console.error(error) 
            } finally { 
                setCargando(false) 
            }
        }
        buscar()
    }, [query, paginaActual])

    if (!query) return <div className="min-h-screen text-white flex justify-center py-20 text-2xl">Por favor, ingresa un término de búsqueda.</div>

    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <div className="w-[95%] mx-auto">
                <h1 className="text-4xl mb-10 text-white">Resultados de proyectos para: "{query}"</h1>

                <div className="flex flex-col gap-6">
                    {resultados.length === 0 ? (
                        <p className="text-white text-2xl text-center mt-10">No se encontraron proyectos con ese nombre.</p>
                    ) : (
                        resultados.map(tarjeta => (
                            <RenderizarTarjeta key={tarjeta.id} objtarjeta={tarjeta} />
                        ))
                    )}
                </div>

                {!cargando && (
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

// --- ESTE ES EL COMPONENTE QUE EXPORTAS (El que arregla el error) ---
export default function BusquedaProyectos() {
    return (
        // El Suspense "atrapa" el hook useSearchParams() del hijo
        <Suspense fallback={<div className="text-white text-center py-20">Cargando buscador...</div>}>
            <ContenidoBusqueda />
        </Suspense>
    )
}

function RenderizarTarjeta({objtarjeta}) {
    return(
        <Link href={`/proyecto/${objtarjeta.id}`} className="block">
            <div className="bg-grisoscuro_fondotarj text-white p-5 rounded-4xl w-full flex flex-col md:flex-row items-center gap-6 hover:scale-101 transition-transform">
                <div className="shrink-0 border-4 border-verde_sombra rounded-2xl overflow-hidden w-full md:w-64 h-40">
                    <img src={objtarjeta.img} className="w-full h-full object-cover" />
                </div>

                <div className="text-xl flex flex-col ">
                    <p className="font-bold ">
                        {objtarjeta.nombre}
                    </p>
                    <p className="my-3">
                        {objtarjeta.creador}
                    </p>
                    <p className="break-all">
                        {objtarjeta.descripcion} 
                    </p>
                </div>
            </div>
        </Link>
    )
}