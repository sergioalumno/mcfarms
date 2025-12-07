import { Navbar } from "@/app/layout"

export default function Proyecto() {

    return(
        <div>
            <Navbar/>
            <img src="mobs.png" />
            <img src="mobs.png" />
            <img src="mobs.png" />
            <img src="mobs.png" />
            <img src="mobs.png" />
            <h1>Granja de Mobs</h1>
            <p>Creador</p>
            <p>Granja que sirve para obtener los diferentes items que dropean los mobs hostiles que se generan en la oscuridad como carne podrida o polvora (No funciona para endermans ya que se teletransportan)</p>
            <button>Guardar favorito</button>
            
            <p>Dificultad: ★★★☆☆</p>
            <button>Volver</button>
            <button>Descargar</button>
        </div>
    )
}
