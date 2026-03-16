"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Proyecto({ params }) {
    const [proyecto, setProyecto] = useState({})
    const [indiceSeleccionado, setIndiceSeleccionado] = useState(0) 
    const [indiceGaleria, setIndiceGaleria] = useState(0)
    const { id } = use(params);
    const [usuario, setUsuario] = useState(null)
    const [estaGuardado, setEstaGuardado] = useState(false); 
    const router = useRouter(); 
    const [isEditting, setIsEditting] = useState(false)
    const [editNombre, setEditNombre] = useState("");
    const [editDescripcion, setEditDescripcion] = useState("");
    const [editDificultad, setEditDificultad] = useState("");
    const [guardando, setGuardando] = useState(false);

    useEffect(()=>{
        cargarProyecto();
        cargarDatosUsuario();
    },[])
    
    useEffect(() => {
        if (proyecto.nombre) {
            setEditNombre(proyecto.nombre);
            setEditDescripcion(proyecto.descripcion);
            setEditDificultad(proyecto.dificultad || "");
        }
    }, [proyecto])
    
    async function cargarProyecto() {
        const response = await fetch ("/api/proyectos/proyecto_id?id="+id)
        const body = await response.json();
        setProyecto(body)
    }

    async function cargarDatosUsuario() {
        try {
            const res = await fetch('/api/sesion');
            if (res.ok) {
                const datos = await res.json();
                setUsuario(datos);
                if (datos?.id) {
                    verificarSiEstaGuardado(datos.id, id);
                }
            }
        } catch (error) {
            console.error("Error cargando usuario", error);
        }
    }

    async function verificarSiEstaGuardado(idUsuario, idProyecto) {
        try {
            const res = await fetch(`/api/proyectos/guardar?id_usuario=${idUsuario}&id_proyecto=${idProyecto}`);
            const data = await res.json();
            setEstaGuardado(data.guardado);
        } catch (error) {
            console.error("Error verificando guardado:", error);
        }
    }
    
    async function handleToggleGuardar() {
        if (!usuario) {
            alert("Inicia sesión para poder guardar proyectos.");
            return;
        }

        const estadoAnterior = estaGuardado;
        setEstaGuardado(!estaGuardado);

        try {
            if (estadoAnterior) {
                await fetch(`/api/proyectos/guardar?id_usuario=${usuario.id}&id_proyecto=${id}`, {
                    method: 'DELETE'
                });
            } else {
                await fetch('/api/proyectos/guardar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_usuario: usuario.id, id_proyecto: id })
                });
            }
        } catch (error) {
            console.error("Error al guardar/quitar de guardados:", error);
            setEstaGuardado(estadoAnterior); 
        }
    }

    async function handleGuardarCambios(e) {
        e.preventDefault();
        setGuardando(true);

        try {
            const datosActualizados = {
                id: proyecto.id,
                nombre: editNombre,
                descripcion: editDescripcion,
                dificultad: parseInt(editDificultad),
                fecha_modificacion: new Date().toISOString() 
            };

            const res = await fetch('/api/proyectos', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosActualizados)
            });

            if (!res.ok) throw new Error("Error al actualizar");
            
            cargarProyecto();
            setIsEditting(false);
            
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Hubo un error al guardar los cambios.");
        } finally {
            setGuardando(false);
        }
    }

    async function handleEliminarProyecto() {
        const confirmar = confirm("¿Estás seguro de que quieres eliminar esta publicación permanentemente? Esta acción no se puede deshacer.");
        
        if (confirmar) {
            ejecutarBorrado();
        }
    }
    
    async function handleEliminarAdmin() {
        const confirmar = confirm("ADMIN: ¿Seguro que quieres eliminar la publicación de este usuario?, Esta acción es irreversible.");
        
        if (confirmar) {
            ejecutarBorrado();
        }
    }
    
    async function ejecutarBorrado() {
        try {
            const res = await fetch(`/api/proyectos?id=${proyecto.id}`, {
                method: 'DELETE',
            });

            if (!res.ok) throw new Error("Error al eliminar");

            alert("Publicación eliminada correctamente.");
            router.push("/home"); 
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar la publicación.");
        }
    }

    const imagenesOrdenadas = proyecto?.imagenes_proyecto ? [...proyecto.imagenes_proyecto].sort((a, b) => {
        if (a.portada) return -1;
        if (b.portada) return 1;
        return 0;
    }) : [];

    const maxVisibles = 4;
    const mostrarFlechas = imagenesOrdenadas.length > maxVisibles;

    const renderEstrellas = (nivel) => {
        const estrellasActivas = nivel || 1; 
        let estrellas = "";
        for (let i = 1; i <= 5; i++) {
            estrellas += i <= estrellasActivas ? "★" : "☆";
        }
        return estrellas;
    };

    return(
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]" >
            <div className="bg-grisoscuro_fondo w-full max-w-7xl rounded-4xl p-10 relative">
                {isEditting ? (
                   
                    <div className="w-full">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-white text-4xl">Editar publicación</h1>
                            
                            <button 
                                onClick={handleEliminarProyecto}
                                title="Eliminar publicación"
                                className="hover:scale-110 transition-transform"
                            >
                                <img src="/trash.png" className="h-10" alt="Eliminar" />
                            </button>
                        </div>

                        <form onSubmit={handleGuardarCambios} className="flex flex-col gap-6">
                            
                            <div>
                                <label className="text-xl font-bold block mb-2">Nombre:</label>
                                <input type="text" minLength="5" maxLength="35" required value={editNombre} onChange={(e) => setEditNombre(e.target.value)} className="w-full p-3 rounded-lg bg-white text-black outline-none"/>
                            </div>

                            <div>
                                <p className="text-xl font-bold block mb-2">Dificultad:</p>
                                <select required value={editDificultad} onChange={(e) => setEditDificultad(e.target.value)} className="w-full p-3 rounded-lg bg-white text-black outline-none appearance-none cursor-pointer">
                                    <option disabled value="">Selecciona una dificultad</option>
                                    <option value="1">★☆☆☆☆</option>
                                    <option value="2">★★☆☆☆</option>
                                    <option value="3">★★★☆☆</option>
                                    <option value="4">★★★★☆</option>
                                    <option value="5">★★★★★</option>
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <p className="text-xl font-bold block mb-2">Descripción:</p>
                                <textarea minLength="15" maxLength="500" required value={editDescripcion} onChange={(e) => setEditDescripcion(e.target.value)} className="w-full p-3 h-48 rounded-lg bg-white text-black outline-none resize-none"></textarea>
                            </div>

                            <div className="flex justify-center gap-10 mt-2 h-14">
                                <button type="button" onClick={() => setIsEditting(false)} className="cancelar w-80 h-full text-2xl rounded-lg hover:scale-105 transition-transform">Descartar</button>
                                <button type="submit" disabled={guardando} className="confirmar w-80 h-full text-2xl rounded-lg hover:scale-105 transition-transform">
                                    {guardando ? "Guardando..." : "Guardar Cambios"}
                                </button>
                            </div>
                            
                        </form>
                    </div>

                ) : (

                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-1">
                            <div className="border-4 border-verde_sombra rounded-2xl overflow-hidden mb-4 h-96 flex items-center justify-center bg-black/50">
                                {imagenesOrdenadas.length > 0 ? (
                                    <img src={imagenesOrdenadas[indiceSeleccionado]?.url_imagen} className="w-full h-full object-cover" />
                                ) : (
                                    <p className="text-gray-400">Sin imágenes</p>
                                )}
                            </div>

                            {imagenesOrdenadas.length > 0 && (
                                <div className="flex items-center justify-center gap-2 mb-15">
                                    {mostrarFlechas && (
                                        <button onClick={() => setIndiceGaleria(prev => Math.max(0, prev - 1))} disabled={indiceGaleria === 0} className="text-white text-3xl font-bold hover:scale-125 transition-transform disabled:opacity-20 disabled:hover:scale-100 px-2 z-10">{"<"}</button>
                                    )}
                                    <div className="overflow-hidden w-91 py-4 px-1 -my-4 -mx-1"> 
                                        <div className="flex gap-3 transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${indiceGaleria * 92}px)` }}>
                                            {imagenesOrdenadas.map((img, index) => (
                                                <div key={index} className="flex-none w-20 h-20">
                                                    <img src={img.url_imagen} onClick={() => setIndiceSeleccionado(index)} className={`w-full h-full object-cover border-2 rounded-lg hover:scale-110 transition-transform cursor-pointer ${indiceSeleccionado === index ? 'border-white opacity-100' : 'border-verde_sombra opacity-70 hover:opacity-100'}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {mostrarFlechas && (
                                        <button onClick={() => setIndiceGaleria(prev => Math.min(imagenesOrdenadas.length - maxVisibles, prev + 1))} disabled={indiceGaleria >= imagenesOrdenadas.length - maxVisibles} className="text-white text-3xl font-bold hover:scale-125 transition-transform disabled:opacity-20 disabled:hover:scale-100 px-2 z-10">{">"}</button>
                                    )}
                                </div>
                            )}

                            <p className="text-4xl text-center">
                                Dificultad: <span className="text-white">{renderEstrellas(proyecto?.dificultad)}</span>
                            </p>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                            <div className="flex flex-col min-h-0">
                                <h1 className="text-white text-5xl mb-2 shrink-0">{proyecto?.nombre}</h1>
                                <p className="text-xl font-bold my-4 shrink-0">{proyecto?.usuarios?.nombre}</p>
                                <div className="flex-1 overflow-y-auto pr-4 mb-4">
                                    <p className="text-lg whitespace-pre-wrap break-all">{proyecto?.descripcion}</p>
                                </div>
                                <div className="flex items-center gap-4 mt-5 shrink-0">
                                    <button onClick={handleToggleGuardar} title={estaGuardado ? "Quitar de guardados" : "Guardar proyecto"}>
                                        <img 
                                            
                                            src={estaGuardado ? "/bookmark-fill.png" : "/bookmark.png"} 
                                            className="h-10 hover:scale-110 transition-transform" 
                                            alt="Guardar"
                                        />
                                    </button>

                                    {usuario?.id === proyecto?.id_usuario && (
                                        <button 
                                            onClick={() => setIsEditting(!isEditting)}
                                            title={isEditting ? "Cancelar edición" : "Editar publicación"}
                                        >
                                            {isEditting ? (
                                                <img src="/close.png" className="h-10 hover:scale-110 transition-transform" alt="Cancelar" />
                                            ) : (
                                                <img src="/pencil-square.png" className="h-10 hover:scale-110 transition-transform" alt="Editar" />          
                                            )}
                                        </button>
                                    )}

                                    {usuario?.admin && usuario?.id !== proyecto?.id_usuario && (
                                        <button 
                                            onClick={handleEliminarAdmin}
                                            title="[ADMIN] Eliminar publicación"
                                        >
                                            <img src="/trash.png" className="h-10 hover:scale-110 transition-transform" alt="Eliminar publicación" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-8 shrink-0 h-16">
                                <button onClick={() => window.history.back()} className="cancelar w-full h-full text-2xl flex items-center justify-center rounded-lg">Volver</button>
                                <a href={proyecto?.url_descarga} target="_blank" rel="noopener noreferrer" className="text-white border-2 bg-morado_acentos border-morado_acentos p-1 rounded-xl hover:scale-110 duration-300 w-full h-full text-2xl flex items-center justify-center">Descargar</a>
                            </div>
                        </div>
                    </div>

                )}

            </div>
        </div>
    )
}