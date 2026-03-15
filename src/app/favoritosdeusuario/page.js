"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import Paginacion from "../Paginacion" 

export default function Favoritosdeusuario() {
    const searchParams = useSearchParams()
    const targetUserId = searchParams.get('id')
    const [favoritos, setFavoritos] = useState([])
    const [perfilUsuario, setPerfilUsuario] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [paginaActual, setPaginaActual] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)
    
    useEffect(() => {
        if (!targetUserId) return;
        async function cargarPerfil() {
            try {
                const resUser = await fetch(`/api/usuarios?id=${targetUserId}`)
                if (resUser.ok) setPerfilUsuario(await resUser.json())
            } catch (error) { console.error(error) }
        }
        cargarPerfil()
    }, [targetUserId])

    
    useEffect(() => {
        if (!targetUserId) return;
        async function cargarFavoritos() {
            setCargando(true)
            try {
                const res = await fetch(`/api/usuarios/favoritos?id_usuario=${targetUserId}&page=${paginaActual}`)
                if (res.ok) {
                    const data = await res.json()
                    setFavoritos(data.resultados || [])
                    setTotalPaginas(data.totalPaginas || 1)
                }
            } catch (error) { 
                console.error(error) 
            } finally { 
                setCargando(false) 
            }
        }
        cargarFavoritos()
    }, [targetUserId, paginaActual])

    if (!targetUserId) return <div className="min-h-screen text-white flex justify-center py-20 text-2xl">Error: Usuario no especificado.</div>

    return(
        <div className="min-h-screen flex flex-col items-center py-10">
            <div className="w-[95%] mx-auto">

                <div className="flex items-center justify-between mb-10">
                    <div className="w-20 items-center aspect-square md:w-full gap-8 md:h-24 flex">
                        <img src={perfilUsuario?.foto_perfil || '/person-circle-w.png'} className="rounded-full md:h-30"/>
                        <h1 className="text-white text-3xl">Guardados de {perfilUsuario?.nombre}</h1>
                    </div>
                    <button onClick={() => window.history.back()} className="cancelar w-[20%] h-full text-2xl">Volver</button>
                </div>

                {cargando ? (
                    <div className="text-white flex justify-center py-20 text-2xl">Cargando favoritos...</div>
                ) : (
                    <>
                        <div className="flex flex-col gap-6">
                            {favoritos.length === 0 ? (
                                <p className="text-white text-2xl text-center mt-10">No hay proyectos guardados en favoritos.</p>
                            ) : (
                                favoritos.map(tarjeta => (
                                    <RenderizarTarjeta key={tarjeta.id} objtarjeta={tarjeta} creador={tarjeta.creador} />
                                ))
                            )}
                        </div>

                        {favoritos.length > 0 && (
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

function RenderizarTarjeta({objtarjeta, creador}) {
    return(
        <Link href={`/proyecto/${objtarjeta.id}`} className="block">
            <div className="bg-grisoscuro_fondotarj text-white p-5 rounded-4xl w-full flex flex-col md:flex-row items-center  gap-6 hover:scale-101 transition-transform">
                <div className="shrink-0 border-4 border-verde_sombra rounded-2xl overflow-hidden w-full md:w-64 h-40 ">
                    <img src={objtarjeta.img} className="w-full h-full object-cover" />
                </div>

                <div className="text-xl flex flex-col ">
                    <p className="font-bold ">
                        {objtarjeta.nombre}
                    </p>
                    <p className="my-3">
                        {creador}
                    </p>
                    <p className="break-all">
                        {objtarjeta.descripcion}
                    </p>
                </div>
            </div>
        </Link>
    )
}