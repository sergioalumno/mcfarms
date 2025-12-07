import { Navbar } from "@/app/layout"
import {  } from "@/app/layout"

export default function editar() {

    return(
        <div>
            <Navbar/>
            <h1>Editar proyecto</h1>
            <p>Nombre:</p>
            <input type="text" placeholder="Introduce tu nombre..." />
            <p>Dificultad:</p>
            <select>
                <option>Selecciona una dificultad</option>
                <option>⭐</option>
                <option>⭐⭐</option>
                <option>⭐⭐⭐</option>
                <option>⭐⭐⭐⭐</option>
                <option>⭐⭐⭐⭐⭐</option>
            </select>
            <p>Descricion</p>
            <textarea placeholder="Descripcion del proyecto..."></textarea>
            <p>Imágenes</p>
            <button>subir imagen</button>
            <p>Archivo</p>
            <button>subir archivo</button>
            <br/>
            <button>Eliminar proyecto</button>
            <button>Volver</button>
            <button>Guardar cambios</button>
        </div>
    )
}
