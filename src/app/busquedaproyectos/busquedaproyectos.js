import { Navbar, Paginacion, Footer } from "@/app/layout"

export default function Busquedaproy() {
    const ListaTarjetas = [{id:0, img:"Lava.jpg", nombre: "Granja Lava", desc:"Granja que usa la mecanica de las estalagtitas para generar lava dentro de calderos...",creador: "User X"},{id:1, img:"mobs.png", nombre: "Granja Mobs", desc:"Granja que sirve para obtener los diferentes ítems que dropean los mobs hostiles que se generan en la oscuridad, como carne podrida o pólvora...", creador: "Tú"}]

    return(
        <div>
            <Navbar/>
            <h1>Busqueda de proyectos</h1>
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
            {objtarjeta.desc}
        </div>
    )
}