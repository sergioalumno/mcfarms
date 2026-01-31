"use client"
import { useState } from "react"

export default function Proyectotuyo() {
    const [editar, setEditar] = useState(false)
    const [nombre, setNombre] = useState("Granja de Lava")
    const [descripcion, setDescripcion] = useState("Granja que aprovecha la mecánica de que las estalactitas cuando gotean pueden llenar calderos para generar asi lava infinita recolectable con cubos desde los calderos")
    const [dificultad, setDificutad] = useState("★☆☆☆☆")

    if (editar) {
        return(
            <div>
                <img src="Lava.jpg" />
                <img src="Lava.jpg" />
                <img src="Lava.jpg" />
                <img src="Lava.jpg" />
                <img src="Lava.jpg" />
                <button>Subir foto</button>
                <button>Subir archivo</button>
                <button>Eliminar proyecto</button>
                <br/>
                <input type="text" placeholder={nombre} onChange={(e) => setNombre(e.target.value)}/>
                <p>Creador Tú</p>
                <input type="text" placeholder={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                <button>Guardar favorito</button>
                <button onClick={cachesambiaraeditar}>Guardar cambios</button>
                
                <select defaultValue={dificultad} onChange={(e) => setDificutad(e.target.value)}>
                    <option value="★☆☆☆☆">★</option>
                    <option value="★★☆☆☆">★★</option>
                    <option value="★★★☆☆">★★★</option>
                    <option value="★★★★☆">★★★★</option>
                    <option value="★★★★★">★★★★★</option>
                </select>
                <button>Volver</button>
                <button>Descargar</button>
            </div>
        )
    }

    function cachesambiaraeditar() {
        setEditar(!editar)
    }

    return(
        <div>
            <img src="Lava.jpg" />
            <img src="Lava.jpg" />
            <img src="Lava.jpg" />
            <img src="Lava.jpg" />
            <img src="Lava.jpg" />
            <h1>{nombre}</h1>
            <p>Creador Tú</p>
            <p>{descripcion}</p>
            <button>Guardar favorito</button>
            <button onClick={cachesambiaraeditar}>Editar proyecto</button>
            
            <p>Dificultad: {dificultad}</p>
            <button>Volver</button>
            <button>Descargar</button>
        </div>
    )
}
