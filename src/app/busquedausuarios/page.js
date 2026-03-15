"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Paginacion from "../Paginacion" 

export default function BusquedaUsua() {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const [usuarios, setUsuarios] = useState([])
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
                const res = await fetch(`/api/buscar?tipo=usuarios&q=${query}&page=${paginaActual}`)
                if (res.ok) {
                    const data = await res.json()
                    
                    setUsuarios(data.resultados || [])
                    setTotalPaginas(data.totalPaginas || 1)
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

    return(
        <div className="min-h-screen flex flex-col items-center py-10">
            <div className="w-[95%] mx-auto">
                <h1 className="text-4xl mb-10">Resultados de usuarios para: "{query}"</h1>

                {cargando ? (
                    <div className="text-white flex justify-center py-20 text-2xl">Buscando usuarios...</div>
                ) : (
                    <>
                        <div className="flex flex-col gap-6">
                            {usuarios.length === 0 ? (
                                <p className="text-white text-2xl text-center mt-10">No se encontraron usuarios con ese nombre.</p>
                            ) : (
                                usuarios.map(usuario => (
                                    <RenderizarUsuario key={usuario.id} objusuario={usuario} />
                                ))
                            )}
                        </div>

                        {usuarios.length > 0 && (
                            <Paginacion 
                                paginaActual={paginaActual} 
                                totalPaginas={totalPaginas} 
                                cambiarPagina={setPaginaActual} 
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

function RenderizarUsuario({objusuario}) {
    return(
        <Link href={`/perfil/${objusuario.id}`} className="block">
            <div className="bg-grisoscuro_fondotarj text-white p-5 rounded-4xl w-full flex flex-col md:flex-row items-center md:items-start gap-6 hover:scale-101 transition-transform">
                <div className="shrink-0 md:w-40 items-center">
                    <img src={objusuario.foto_perfil || '/person-circle-w.png'} className="w-full h-full rounded-full object-cover sm:w-80" />
                </div>

                <div className="text-2xl font-bold text-white flex flex-col">
                    <p className="mb-5">
                        {objusuario.nombre}
                    </p>
                    <p>
                        {objusuario.biografia || "Sin biografía..."}
                    </p>
                </div>
            </div>
        </Link>
    )
}