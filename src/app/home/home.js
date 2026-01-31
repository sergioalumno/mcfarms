import { Navbar, Paginacion } from "@/app/layout"
import { Footer } from "@/app/layout"

export default function HomePage() {
    const ListaTarjetas = [{id:0, img:"Lava.jpg", nombre: "Granja Lava", creador: "User X"},{id:1, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"}]

    return(
        <div>
            <Navbar/>
            <h1>Inicio</h1>
            <h2>Proyectos recientes</h2>
                {ListaTarjetas.map(tarjeta => 
                    <div key={tarjeta.id}>
                    <RenderizarTarjeta objtarjeta={tarjeta} />
                    </div>) }
            <Paginacion />
            <Footer />
        </div>
    )
}

function RenderizarTarjeta({objtarjeta}) {
    return(
        <div>
            <img src={objtarjeta.img} />
            {objtarjeta.nombre}
            {objtarjeta.creador}
        </div>
    )
}