import Link from "next/link"

export default function HomePage() {
    const ListaTarjetas = [{id:0, img:"Lava.png", nombre: "Granja Lava", creador: "User X"},
        {id:1, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"},
        {id:2, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"},
        {id:3, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"},
        {id:4, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"},
        {id:5, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"},
        {id:6, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"},
        {id:7, img:"mobs.png", nombre: "Granja Mobs", creador: "Tú"}
    ]

    return(
        <div className="min-h-screen flex flex-col items-center">

                <div className="w-[95%] mx-auto px-8 py-10">
                
                <h1 className="font-titulo text-white text-4xl pb-10">Inicio</h1>
                <h2 className="text-2xl pb-10">Proyectos recientes</h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 w-full gap-y-12" >
                    {ListaTarjetas.map(tarjeta => (
                    <RenderizarTarjeta key={tarjeta.id} objtarjeta={tarjeta} />
                    ))}

                    </div>
                </div>
        </div>
    )
}

function RenderizarTarjeta({objtarjeta}) {
    return(
        <div className="bg-grisoscuro_fondotarj text-white font-bold p-8 rounded-4xl flex flex-col items-center hover:scale-105 transition-transform">

            <div className="border-4 border-verde_sombra rounded-2xl overflow-hidden mb-3">
                <img src={objtarjeta.img} className="w-full object-cover"/>
            </div>
            <div className="text-center">
                <p className="text-lg">{objtarjeta.nombre}</p>
                <p className="text-sm">{objtarjeta.creador}</p>
            </div>
        </div>
    )
}