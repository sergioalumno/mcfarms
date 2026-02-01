export default function Favoritosdeusuario() {
    const ListaTarjetas = [{id:0, img:"Lava.png", nombre: "Granja Lava", desc:"Granja que usa la mecanica de las estalagtitas para generar lava dentro de calderos...",creador: "Willyrex"},
        {id:1, img:"mobs.png", nombre: "Granja Mobs", desc:"Granja que sirve para obtener los diferentes ítems que dropean los mobs hostiles que se generan en la oscuridad, como carne podrida o pólvora...", creador: "Willyrex"},
        {id:2, img:"mobs.png", nombre: "Granja Mobs", desc:"Granja que sirve para obtener los diferentes ítems que dropean los mobs hostiles que se generan en la oscuridad, como carne podrida o pólvora...", creador: "Willyrex"},
        {id:3, img:"mobs.png", nombre: "Granja Mobs", desc:"Granja que sirve para obtener los diferentes ítems que dropean los mobs hostiles que se generan en la oscuridad, como carne podrida o pólvora...", creador: "Willyrex"}
    ]

    return(
        <div className="min-h-screen flex flex-col items-center py-10">
            <div className="w-[95%] mx-auto">

                <div className="flex items-center justify-between mb-10">
                    <div className="w-20 items-center aspect-square md:w-full gap-8 md:h-24 flex">
                        <img src="pfp.png" className="md:h-30"/>
                    
                    <h1 className="text-white text-3xl">Proyectos de Willyrex</h1>
                    </div>
                    <button className="cancelar w-[20%] h-full text-2xl">Volver</button>
                </div>

                <div className="flex flex-col gap-6">
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
        <div className="bg-grisoscuro_fondotarj text-white p-5 rounded-4xl w-full flex flex-col md:flex-row items-center md:items-start gap-6 hover:scale-101 transition-transform">
            <div className="shrink-0 border-4 border-verde_sombra rounded-2xl overflow-hidden w-full md:w-64 h-40">
                <img src={objtarjeta.img} className="w-full h-full object-cover" />
            </div>

            <div className="text-xl font-bold text-white flex flex-col ">
                <p>
                    {objtarjeta.nombre}
                </p>
                <p className="my-3">
                    {objtarjeta.creador}
                </p>
                <p>
                    {objtarjeta.desc}
                </p>
            </div>
        </div>
    )
}