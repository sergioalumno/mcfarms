export default function Perfildeusuario() {

    return(
        <div>
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]">
            <div className="bg-grisoscuro_fondo w-full max-w-5xl rounded-4xl p-10 relative">
                <div className="w-[95%] mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                        <div className="shrink-0 w-32 h-32 md:w-60 md:h-60 overflow-hidden">
                            <img src="person-circle-w.png" className="w-full h-full object-cover"/>
                        </div>

                        <div className="flex-grow text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                <h1 className="text-4xl">Usuario</h1>
                            </div>
                            
                            <div className="max-w-2xl">
                                <p className="text-xl font-bold mb-1">Biografia:</p>
                                <p className="text-xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center md:justify-start gap-6 mt-10">
                        <button className="confirmar max-w-md text-2xl">Proyectos subidos</button>
                        <button className="confirmar max-w-md text-2xl">Proyectos guardados</button>
                    </div>
                </div>
            </div>
        </div>

        </div>
    )
}
