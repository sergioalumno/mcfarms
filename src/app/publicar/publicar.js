import { Navbar } from "@/app/layout"

export default function Publicar() {

    return(
        <div>
            <Navbar/>
            <form>
                <h1>Publicar proyecto</h1>
                <p>Nombre:</p>
                <input type="text" placeholder="Introduce tu nombre..." minLength="5" maxLength="35" required/>
                <p>Dificultad:</p>
                <select required defaultValue="">
                    <option disabled value="">Selecciona una dificultad</option>
                    <option value="1">★</option>
                    <option value="2">★★</option>
                    <option value="3">★★★</option>
                    <option value="4">★★★★</option>
                    <option value="5">★★★★★</option>
                </select>
                <p>Descricion</p>
                <textarea placeholder="Descripcion del proyecto..." minLength="15" maxLength="60" required></textarea>
                <p>Imágenes</p>
                <button>subir imagen</button>
                <p>Archivo</p>
                <button>subir archivo</button>
                <br/>
                <button>Volver</button>
                <button type="submit">Publicar</button>
            </form>
        </div>
    )
}
