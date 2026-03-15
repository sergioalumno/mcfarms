import { supabase } from "@/lib/supabase"

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    const {data:proyecto, error} = await supabase.from("proyectos").select("*, usuarios!proyectos_id_usuario_fkey (nombre), imagenes_proyecto (url_imagen, portada)").eq("id",id).single()
    if (error) {
        return new Response(JSON.stringify(error), {status:400, headers:{"Content-Type":"Application/json"}})
    }
    return new Response(JSON.stringify(proyecto), {status:200, headers:{"Content-Type":"Application/json"}})
}

