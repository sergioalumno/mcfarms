import { Navbar } from "@/app/layout"

export default function Publicar() {

    return(
        <div>
            <Navbar/>
            <h1>Publicar proyecto</h1>
            <p>Nombre:</p>
            <input type="text" placeholder="Introduce tu nombre..." />
            <p>Dificultad:</p>
            <select required>
                <option disabled selected>Selecciona una dificultad</option>
                <option>★</option>
                <option>★★</option>
                <option>★★★</option>
                <option>★★★★</option>
                <option>★★★★★</option>
            </select>
            <p>Descricion</p>
            <textarea placeholder="Descripcion del proyecto..."></textarea>
            <p>Imágenes</p>
            <button>subir imagen</button>
            <p>Archivo</p>
            <button>subir archivo</button>
            <br/>
            <button>Volver</button>
            <button>Publicar</button>
        </div>
    )
}
