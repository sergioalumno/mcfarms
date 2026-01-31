import { Navbar, Paginacion } from "@/app/layout"
import { Footer } from "@/app/layout"
import Link from "next/link"

export default function HomePage() {
    const ListaTarjetas = [{id:0, img:"Lava.png", nombre: "Granja Lava", creador: "User X"},{id:1, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"}]

    return(
        <div>
            <Navbar/>
            <h1 className="font-titulo text-white text-3xl pb-10">Inicio</h1>
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
        <div className="bg-[#3d3a3a] p-4 rounded-[2rem] border-b-4 border-r-4 border-black/50 w-64 flex flex-col items-center hover:scale-105 transition-transform cursor-pointer">
            <div className="border-4 border-[#5da048] rounded-2xl overflow-hidden mb-3">
                <img src={objtarjeta.img} className="w-full h-32 object-cover"/>
            </div>
            <div className="text-center">
                <p className="font-bold text-lg leading-tight">{objtarjeta.nombre}</p>
                <p className="text-gray-300 text-sm">{objtarjeta.creador}</p>
            </div>

        </div>

        
    )
}