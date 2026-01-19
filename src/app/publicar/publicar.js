import { Navbar, Paginacion } from "@/app/layout"
import { Footer } from "@/app/layout"

export default function Publicar() {
    const ListaTarjetas = [{id:0, img:"Lava.jpg", nombre: "Granja Lava", creador: "User X"},{id:1, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"}]

    return(
        <div>
            <Navbar/>
            <h1>Publicar proyecto</h1>
            <p>Nombre:</p>
            <input type="email" placeholder="Introduce tu correo electrónico..." />
            <p>Dificultad:</p>
            <input type="password" placeholder="Introduce tu contraseña..." />
            <Paginacion />
            <Footer />
        </div>
    )
}
