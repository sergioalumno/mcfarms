export default function PaginacionComp({ paginaActual, totalPaginas, cambiarPagina }) {
    
    if (totalPaginas <= 1) return null; 

    return (
        <div className="flex justify-center items-center gap-6 mt-12 w-full">
            <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className="bg-morado_acentos text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform text-xl font-bold"
            >
                Anterior
            </button>
            
            <span className="text-white text-xl">
                Página {paginaActual} de {totalPaginas}
            </span>
            
            <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
                className="bg-morado_acentos text-white px-6 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform text-xl font-bold"
            >
                Siguiente
            </button>
        </div>
    )
}