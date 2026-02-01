export default function Proyecto() {

    return(
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]" >
            
            <div className="bg-grisoscuro_fondo w-full max-w-7xl rounded-4xl p-10 flex flex-col md:flex-row gap-10">
                
                <div className="flex-1">
                    <div className="border-4 border-verde_sombra rounded-2xl overflow-hidden mb-4">
                        <img src="mobs.png" className="w-full h-auto" />
                    </div>

                    <div className="flex gap-3 mb-15 justify-center">
                        <img src="mobs.png" className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                        <img src="mobs.png" className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                        <img src="mobs.png" className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                        <img src="mobs.png" className="w-20 border-2 border-verde_sombra rounded-lg hover:scale-110 transition-transform" />
                    </div>

                    <p className="text-4xl">
                        Dificultad: <span className="text-white">★★★☆☆</span>
                    </p>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h1 className="text-white text-5xl mb-2">Granja de Mobs</h1>
                        <p className="text-xl font-bold my-4">Creador</p>
                        <p className="text-lg ">
                            Granja que sirve para obtener los diferentes items que dropean los mobs hostiles que se generan en la oscuridad como carne podrida o polvora (No funciona para endermans ya que se teletransportan)
                        </p>
                        <button>
                            <img src="bookmark.png" className="mt-5 h-10 hover:scale-110 transition-transform"/>
                        </button>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button className="cancelar w-full h-full text-2xl">Volver</button>
                        <button className="confirmar w-full h-full text-2xl">Descargar</button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}
