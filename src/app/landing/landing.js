export default function Landing() {

    return (
        <div className="flex flex-col">
            <h1 className="font-titulo flex justify-center text-5xl py-10">MC Farms</h1>
            <img src="portada_landing.png" className="max-w-[90vw] max-h-[70vh] mx-auto object-contain"/>
           
            <div className="fixed bottom-6 right-6 text-right text-2xl">
                <p className="font-titulo py-5">Todo esto y mas aquí ¡Empieza ahora!</p>
                <button className="cancelar mx-2 text-3xl">Iniciar Sesión</button>
                <button className="confirmar mx-2 text-3xl">Registrase</button>
            </div>
        </div>
    )
}
