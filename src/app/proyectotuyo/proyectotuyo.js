"use client"
import { useState } from "react"

export default function Proyectotuyo() {
    const [editar, setEditar] = useState(false)
    const [nombre, setNombre] = useState("Granja de Lava")
    const [descripcion, setDescripcion] = useState("Granja que aprovecha la mecánica de que las estalactitas cuando gotean pueden llenar calderos para generar asi lava infinita recolectable con cubos desde los calderos")
    const [dificultad, setDificutad] = useState("★☆☆☆☆")

    if (editar) {
        return(
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]" >
                <div className="bg-grisoscuro_fondo w-full max-w-5xl rounded-4xl p-10 relative">
        
                    <h1 className="text-white text-4xl mb-5">
                    Editar proyecto
                    </h1>

                    <div className="flex flex-col md:flex-row gap-12">
                    
                    <div className="flex-1 flex flex-col gap-6">
                        <div>
                        <p className="text-xl font-bold block mb-2">Nombre:</p>
                        <input type="text" placeholder={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-3 rounded-lg bg-white text-black outline-none"/>
                        </div>

                        <div>
                        <p className="text-xl font-bold block mb-2">Dificultad:</p>
                        <select defaultValue={dificultad} onChange={(e) => setDificutad(e.target.value)}className="w-full p-3 rounded-lg bg-white text-black outline-none appearance-none cursor-pointer">
                            <option value="★☆☆☆☆">★☆☆☆☆</option>
                            <option value="★★☆☆☆">★★☆☆☆</option>
                            <option value="★★★☆☆">★★★☆☆</option>
                            <option value="★★★★☆">★★★★☆</option>
                            <option value="★★★★★">★★★★★</option>
                        </select>
                        </div>

                        <div>
                        <p className="text-xl font-bold block mb-2">Descripción:</p>
                        <textarea placeholder={descripcion} onChange={(e) => setDescripcion(e.target.value)}className="w-full p-3 h-32 rounded-lg bg-white text-black outline-none"/>
                        </div>

                        <button className="w-fit hover:scale-110 transition-transform">
                        <img src="trash.png" alt="Eliminar" className="h-10 w-10" />
                        </button>
                    </div>

                    <div className="flex-1 flex flex-col gap-6">
                        <div>
                        <p className="text-xl font-bold block mb-2">Imágenes:</p>
                        <div className="bg-white rounded-xl aspect-video flex items-center justify-center hover:scale-105 overflow-hidden transition-transform">
                            <img src="image.png" className="w-30" />
                        </div>
                        </div>

                        <div>
                        <p className="text-xl font-bold block mb-2">Archivo:</p>
                        <button className="w-full bg-white p-4 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
                            <img src="upload-b.png" className="h-12" />
                        </button>
                        </div>

                        <div className="flex gap-4 mt-auto">
                        <button className="cancelar w-full h-full text-2xl">Volver</button>
                        <button onClick={cachesambiaraeditar}className="confirmar w-full h-full text-2xl">Guardar cambios</button>
                        </div>

                    </div>

                    </div>
                </div>
            </div>
        )
    }

    function cachesambiaraeditar() {
        setEditar(!editar)
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]">
            <div className="bg-grisoscuro_fondo w-full max-w-7xl rounded-4xl p-10 flex flex-col md:flex-row gap-10">
                <div className="flex-1">
                    <div className="border-4 border-verde_sombra rounded-2xl overflow-hidden mb-4">
                        <img src="Lava.png" className="w-full h-auto"/>
                    </div>

                    <div className="flex gap-3 mb-15 justify-center">
                        <img src="Lava.png"  className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                        <img src="Lava.png"  className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                        <img src="Lava.png"  className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                        <img src="Lava.png"  className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                    </div>

                    <p className="text-4xl">
                        Dificultad:<span className="text-white">{dificultad}</span>
                    </p>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-white text-5xl mb-2">{nombre}</h1>
                        <p className="text-xl font-bold my-4">Creador Tú</p>
                        <p className="text-lg ">{descripcion}</p>

                        <button>
                            <img src="bookmark.png" className="mt-5 h-10 hover:scale-110 transition-transform"/>
                        </button>
                        
                        <button onClick={cachesambiaraeditar}>
                            <img src="pencil-square.png" className="mt-5 ml-4 h-10 hover:scale-110 transition-transform"/>
                        </button>
                    </div>
                    
                    <div className="flex justify-end gap-4 mt-8">
                        <button className="cancelar w-full h-full text-2xl">Volver</button>
                        <button className="confirmar w-full h-full text-2xl">Descargar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
