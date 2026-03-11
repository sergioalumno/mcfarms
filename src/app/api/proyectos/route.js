import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic";

export async function GET(request) {
    const { data: proyectos, error } = await supabase
        .from("proyectos").select(`
            id,
            nombre,
            usuarios!proyectos_id_usuario_fkey (nombre),
            imagenes_proyecto (url_imagen, portada)
        `).order("fecha_creado", { ascending: false })

    if (error) {
        return new Response(JSON.stringify(error), {status: 400, headers: { "Content-Type": "application/json" }})
    }

    const proyectosFormateados = proyectos.map(proyecto => {
        const imagenPortada = proyecto.imagenes_proyecto?.find(img => img.portada === true);
        
        return {
            id: proyecto.id,
            nombre: proyecto.nombre,
            creador: proyecto.usuarios?.nombre || "Usuario Desconocido",
            img: imagenPortada ? imagenPortada.url_imagen : '/mfondo.jpg'
        }
    })

    return new Response(JSON.stringify(proyectosFormateados), {status: 200, headers: { "Content-Type": "application/json" }})
}