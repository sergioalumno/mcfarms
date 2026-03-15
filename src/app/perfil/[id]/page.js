"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function Perfil() {
    const params = useParams()
    const idPerfilTarget = params.id 
    const [esMiPerfil, setEsMiPerfil] = useState(false)
    const [datosPerfil, setDatosPerfil] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [nombre, setnombre] = useState("")
    const [bio, setBio] = useState("")
    const [correo, setCorreo] = useState("")
    const [pfp, setPfp] = useState("")
    const [password, setPassword] = useState("")
    const [archivoFoto, setArchivoFoto] = useState(null)
    const [editar, setEditar] = useState(false)
    const [guardando, setGuardando] = useState(false)
    const [cerrandoSesion, setCerrandoSesion] = useState(false)
    const [miUsuario, setMiUsuario] = useState(null)

    useEffect(() => {
        if (!idPerfilTarget) return;

        async function cargarTodo() {
            try {
                const resSesion = await fetch('/api/sesion')
                let datosMiUsuario = null; 

                if (resSesion.ok) {
                    datosMiUsuario = await resSesion.json();
                    setMiUsuario(datosMiUsuario); 
                }
                
                const soyYo = (datosMiUsuario && datosMiUsuario.id === idPerfilTarget);
                setEsMiPerfil(soyYo);

                if (soyYo) {
                    setDatosPerfil(datosMiUsuario)
                    setnombre(datosMiUsuario.nombre || "")
                    setBio(datosMiUsuario.biografia || "")
                    setCorreo(datosMiUsuario.email || "")
                    setPfp(datosMiUsuario.foto_perfil || "")
                } else {
                    const resPublica = await fetch(`/api/usuarios?id=${idPerfilTarget}`)
                    if (resPublica.ok) {
                        setDatosPerfil(await resPublica.json())
                    } else {
                        console.error("Usuario no encontrado")
                    }
                }
            } catch (error) {
                console.error("Error al cargar la página de perfil:", error)
            } finally {
                setCargando(false)
            }
        }
        cargarTodo()
    }, [idPerfilTarget])
    
    function CambiaraEditar(e) {
        if(e) e.preventDefault()
        setEditar(!editar)
        setArchivoFoto(null)
    }

    function manejarSubidaFoto(e) {
        const archivo = e.target.files[0]
        if (!archivo) return
        setArchivoFoto(archivo) 
        setPfp(URL.createObjectURL(archivo)) 
    }

    async function guardarCambios(e) {
        e.preventDefault()
        setGuardando(true)

        try {
            const formData = new FormData()
            formData.append("nombre", nombre)
            formData.append("biografia", bio)
            formData.append("email", correo)
            if (password) formData.append("password", password)
            if (datosPerfil?.foto_perfil) formData.append("foto_url_actual", datosPerfil.foto_perfil) 
            if (archivoFoto) formData.append("foto_perfil", archivoFoto)

            const res = await fetch('/api/usuarios', { method: 'PUT', body: formData })
            const data = await res.json()

            if (!res.ok) throw new Error(data.error || "Error al guardar")

            const nuevaUrlPfp = data.foto_perfil || pfp
            setDatosPerfil({ ...datosPerfil, nombre, biografia: bio, email: correo, foto_perfil: nuevaUrlPfp })
            setPfp(nuevaUrlPfp)
            
            setTimeout(() => {
                setEditar(false)
                setGuardando(false)
                setPassword("")
                setArchivoFoto(null)
            }, 1500)

        } catch (error) {
            console.error(error)
            setGuardando(false)
        }
    }

    async function handleCerrarSesion() {
        if (window.confirm("¿Seguro que deseas cerrar sesión?")) {
            setCerrandoSesion(true)
            try {
                const res = await fetch('/api/sesion', { method: 'POST' })
                if (res.ok) window.location.href = '/home' 
                else {
                    alert("Hubo un problema al cerrar sesión.")
                    setCerrandoSesion(false)
                }
            } catch (error) {
                console.error("Error al cerrar sesión", error)
                setCerrandoSesion(false)
            }
        }
    }

    async function manejarBan() {
        const estaActivo = datosPerfil?.estado !== false; 
        const accion = estaActivo ? "banear" : "desbanear";
        
        if (window.confirm(`ATENCIÓN ADMIN: ¿Seguro que deseas ${accion} a este usuario?`)) {
            try {
                const nuevoEstado = !estaActivo;
                const res = await fetch('/api/usuarios/admin', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_usuario: idPerfilTarget, nuevo_estado: nuevoEstado })
                });

                if (res.ok) {
                    setDatosPerfil({ ...datosPerfil, estado: nuevoEstado });
                    alert(`Usuario ${accion}do correctamente.`);
                } else {
                    alert("Hubo un problema al intentar cambiar el estado.");
                }
            } catch (error) {
                console.error("Error al cambiar estado:", error);
            }
        }
    }
    
    if (cargando) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/mfondo.jpg')]">
                <p className="text-white text-2xl font-titulo">Cargando perfil...</p>
            </div>
        )
    }

    if (editar && esMiPerfil) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]">
                <div className="bg-grisoscuro_fondo flex flex-col md:flex-row w-full max-w-5xl rounded-4xl p-6 md:p-10 relative gap-8 md:gap-0">
                    
                    <div className="flex flex-col items-center justify-center gap-5 w-full md:w-1/3">
                        <img src={pfp} className="rounded-full w-48 h-48 object-cover"/>
                        <label className="text-white border-2 bg-morado_acentos border-morado_acentos p-1 px-5 rounded-2xl hover:scale-110 duration-300 text-2xl cursor-pointer text-center">
                            Subir foto
                            <input type="file" accept="image/*" className="hidden" onChange={manejarSubidaFoto} />
                        </label>
                    </div>
                    
                    <div className="flex flex-col gap-4 w-full md:w-2/3 text-xl text-white">
                        <p>Nombre:</p>
                        <input type="text" value={nombre} onChange={(e)=>setnombre(e.target.value)} minLength="5" maxLength="15" className="w-full p-3 rounded-lg bg-white text-black outline-none"/>
                        
                        <p>Biografía:</p>
                        <textarea value={bio} onChange={(e)=>setBio(e.target.value)} minLength="15" maxLength="60" className="w-full p-3 h-32 rounded-lg bg-white text-black outline-none resize-none"></textarea>
                        
                        <p>Correo electrónico:</p>
                        <input type="email" value={correo} onChange={(e)=>setCorreo(e.target.value)} minLength="5" maxLength="30" className="w-full p-3 rounded-lg bg-white text-black outline-none"/>
                        
                        <p>Contraseña:</p>
                        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Nueva contraseña..." minLength="5" maxLength="30" className="w-full p-3 rounded-lg bg-white text-black outline-none"/>
                        
                        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
                            <button onClick={CambiaraEditar} disabled={guardando} className="cancelar w-full text-2xl rounded-lg hover:scale-105 transition-transform py-2">
                                Cancelar
                            </button>
                            <button onClick={guardarCambios} disabled={guardando} className="confirmar w-full text-2xl rounded-lg hover:scale-105 transition-transform py-2">
                                {guardando ? "Guardando..." : "Guardar Cambios"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]">
            <div className="bg-grisoscuro_fondo w-full max-w-5xl rounded-4xl p-10 relative">
                <div className="w-[95%] mx-auto">
                    
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12 relative">
                        <div className="shrink-0 w-32 h-32 md:w-60 md:h-60 overflow-hidden border-4 border-verde_sombra rounded-full">
                            <img src={datosPerfil?.foto_perfil || '/person-circle-w.png'} className="w-full h-full object-cover"/>
                        </div>

                        <div className="flex-grow text-center md:text-left w-full mt-4 md:mt-0">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <h1 className="text-4xl text-white font-bold">{datosPerfil?.nombre || "Usuario"}</h1>
                                
                                {esMiPerfil && (
                                    <button onClick={CambiaraEditar} className="p-2 hover:scale-110 transition-transform absolute top-0 right-0 md:relative">
                                        <img src="/pencil-square.png" className="w-8 h-8 drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
                                    </button>
                                )}
                            </div>
                            
                            <div className="max-w-2xl mt-6">
                                <p className="text-xl font-bold mb-1 text-gray-200">Biografía:</p>
                                <p className="text-xl text-gray-300 break-all">{datosPerfil?.biografia || "Este usuario aún no tiene biografía."}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mt-10 w-full">
                        
                        <Link href={`/proyectosdeusuario?id=${datosPerfil?.id}`} className="text-white border-2 bg-morado_acentos border-morado_acentos p-1 rounded-2xl hover:scale-105 duration-300 w-full max-w-md text-2xl text-center py-2">
                            Proyectos subidos por {datosPerfil?.nombre}
                        </Link>

                        {esMiPerfil && (
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 w-full">
                                <Link href={`/favoritosdeusuario?id=${datosPerfil?.id}`} className="text-white border-2 bg-morado_acentos border-morado_acentos p-1 rounded-2xl hover:scale-105 duration-300 w-full max-w-md text-2xl text-center py-2">
                                    Mis proyectos guardados
                                </Link>

                                <button onClick={handleCerrarSesion} disabled={cerrandoSesion} className="cancelar px-6 py-2 text-2xl text-center rounded-2xl hover:scale-105 duration-300 w-full md:w-auto">
                                    {cerrandoSesion ? "Cerrando..." : "Cerrar sesión"}
                                </button>
                            </div>
                        )}

                        {!esMiPerfil && miUsuario?.admin === true && (
                            <button 
                                onClick={manejarBan} 
                                className={`w-full max-w-md mt-4 px-6 py-2 text-xl font-bold text-center rounded-2xl hover:scale-105 transition-transform text-white ${datosPerfil?.estado !== false ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {datosPerfil?.estado !== false ? "Banear Usuario" : "Desbanear Usuario"}
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}