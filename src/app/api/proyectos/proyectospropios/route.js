import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id_usuario = searchParams.get('id_usuario');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 6;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    if (!id_usuario) return new Response(JSON.stringify({ error: "Falta id_usuario" }), { status: 400 });

    try {
        const { data: proyectos, count, error } = await supabase
            .from("proyectos")
            .select(`
                id,
                nombre,
                descripcion,
                usuarios!proyectos_id_usuario_fkey (nombre),
                imagenes_proyecto (url_imagen, portada)
            `, { count: 'exact' })
            .eq('id_usuario', id_usuario)
            .order("fecha_creado", { ascending: false })
            .range(from, to);

        if (error) throw error;

        const proyectosFormateados = proyectos.map(proyecto => {
            const imagenPortada = proyecto.imagenes_proyecto?.find(img => img.portada === true);
            
            return {
                id: proyecto.id,
                nombre: proyecto.nombre,
                descripcion: proyecto.descripcion,
                creador: proyecto.usuarios?.nombre || "Usuario Desconocido",
                img: imagenPortada ? imagenPortada.url_imagen : '/mfondo.jpg'
            }
        });

        return new Response(JSON.stringify({
            resultados: proyectosFormateados,
            totalPaginas: Math.ceil((count || 0) / limit)
        }), {status: 200, headers: { "Content-Type": "application/json" }});

    } catch (error) {
        console.error("Error cargando proyectos del usuario:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
}