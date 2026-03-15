import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic";
export async function GET(request) {
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 16; 
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data: proyectos, count, error } = await supabase
        .from("proyectos").select(`
            id,
            nombre,
            descripcion,
            usuarios!proyectos_id_usuario_fkey (nombre),
            imagenes_proyecto (url_imagen, portada)
        `, { count: 'exact' }) 
        .order("fecha_creado", { ascending: false })
        .range(from, to); 

    if (error) {
        return new Response(JSON.stringify(error), {status: 400, headers: { "Content-Type": "application/json" }})
    }

    const proyectosFormateados = proyectos.map(proyecto => {
        const imagenPortada = proyecto.imagenes_proyecto?.find(img => img.portada === true);
        
        return {
            id: proyecto.id,
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            creador: proyecto.usuarios?.nombre || "Usuario Desconocido",
            img: imagenPortada ? imagenPortada.url_imagen : '/mfondo.jpg'
        }
    })
    
    return new Response(JSON.stringify({
        resultados: proyectosFormateados,
        totalPaginas: Math.ceil((count || 0) / limit)
    }), {status: 200, headers: { "Content-Type": "application/json" }})
}

export async function POST(request) {
    const body = await request.json();
    const Nproyecto = body.proyecto;
    const {data:dataproyecto, error} = await supabase.from("proyectos").insert(Nproyecto).select().single();

    if (error) {
        console.error("ERROR AL INSERTAR EN SUPABASE:", error);
        return new Response(JSON.stringify(error),{status:400, headers:{"Content-Type":"Application/json"}}) 
    }

    return new Response(JSON.stringify(dataproyecto),{status:200, headers:{"Content-Type":"Application/json"}}) 
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, nombre, descripcion, dificultad, fecha_act } = body;

        const { data, error } = await supabase
            .from("proyectos")
            .update({ nombre, descripcion, dificultad, fecha_act })
            .eq("id", id)
            .select();

        if (error) {
            console.error("ERROR AL ACTUALIZAR EN SUPABASE:", error);
            return new Response(JSON.stringify(error), {status: 400, headers: {"Content-Type": "application/json"}});
        }

        return new Response(JSON.stringify(data), {status: 200, headers: {"Content-Type": "application/json"}});
        
    } catch (error) {
        console.error("Error procesando la solicitud PUT:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), {status: 500, headers: {"Content-Type": "application/json"}});
    }
}

export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return new Response(JSON.stringify({ error: "Falta el ID del proyecto" }), {status: 400, headers: {"Content-Type": "application/json"}});
        }

        const { error } = await supabase
            .from("proyectos")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("ERROR AL ELIMINAR EN SUPABASE:", error);
            return new Response(JSON.stringify(error), {status: 400, headers: {"Content-Type": "application/json"}});
        }

        return new Response(JSON.stringify({ success: "Proyecto eliminado correctamente" }), {status: 200, headers: {"Content-Type": "application/json"}});

    } catch (error) {
        console.error("Error procesando la solicitud DELETE:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), {status: 500, headers: {"Content-Type": "application/json"}});
    }
}