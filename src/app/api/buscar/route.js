import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');
    const q = searchParams.get('q'); 

    if (!q || !tipo) return new Response(JSON.stringify({ error: "Faltan parámetros" }), { status: 400 });

    try {
        if (tipo === 'proyectos') {          
            const page = parseInt(searchParams.get('page') || '1');
            const limit = 6; 
            
            const from = (page - 1) * limit;
            const to = from + limit - 1;

            const { data, count, error } = await supabase
                .from("proyectos")
                .select(`
                    id, nombre, descripcion, dificultad,
                    usuarios!proyectos_id_usuario_fkey (nombre),
                    imagenes_proyecto (url_imagen, portada)
                `, { count: 'exact' }) 
                .ilike('nombre', `%${q}%`)
                .range(from, to) 
                .order("fecha_creado", { ascending: false });

            if (error) throw error;

            const proyectosFormateados = data.map(p => {
                const imgPortada = p.imagenes_proyecto?.find(img => img.portada) || p.imagenes_proyecto?.[0];
                return { 
                    id: p.id, nombre: p.nombre, descripcion: p.descripcion, 
                    creador: p.usuarios?.nombre || "Desconocido", 
                    img: imgPortada ? imgPortada.url_imagen : '/mfondo.jpg' 
                };
            });
            
            return new Response(JSON.stringify({
                resultados: proyectosFormateados,
                totalPaginas: Math.ceil(count / limit) 
            }), { status: 200, headers: { "Content-Type": "application/json" } });
        }
        
        else if (tipo === 'usuarios') {
            const page = parseInt(searchParams.get('page') || '1');
            const limit = 6; 
            const from = (page - 1) * limit;
            const to = from + limit - 1;
            const { data, count, error } = await supabase
                .from("usuarios")
                .select("id, nombre, biografia, foto_perfil", { count: 'exact' })
                .ilike('nombre', `%${q}%`)
                .range(from, to) 
                .order("nombre", { ascending: true });

            if (error) throw error;
            
            return new Response(JSON.stringify({
                resultados: data,
                totalPaginas: Math.ceil((count || 0) / limit)
            }), { status: 200, headers: { "Content-Type": "application/json" } });
        }

    } catch (error) {
        console.error("Error en búsqueda:", error);
        return new Response(JSON.stringify({ error: "Error interno" }), { status: 500 });
    }
}