import { supabase } from "@/lib/supabase"
export const dynamic = "force-dynamic";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id_usuario = searchParams.get('id_usuario');
    const id_proyecto = searchParams.get('id_proyecto');

    if (!id_usuario || !id_proyecto) return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });

    const { data, error } = await supabase
        .from('favoritos') 
        .select('*')
        .eq('id_usuario', id_usuario)
        .eq('id_proyecto', id_proyecto)
        .single(); 

    if (error && error.code === 'PGRST116') {
        return new Response(JSON.stringify({ guardado: false }), { status: 200 });
    }

    return new Response(JSON.stringify({ guardado: !!data }), { status: 200 });
}


export async function POST(request) {
    const { id_usuario, id_proyecto } = await request.json();
    const { error } = await supabase
        .from('favoritos') 
        .insert({ id_usuario, id_proyecto });
    if (error) {
        console.error("ERROR AL AÑADIR A FAVORITOS:", error);
        return new Response(JSON.stringify(error), { status: 400 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id_usuario = searchParams.get('id_usuario');
    const id_proyecto = searchParams.get('id_proyecto');

    const { error } = await supabase
        .from('favoritos') 
        .delete()
        .eq('id_usuario', id_usuario)
        .eq('id_proyecto', id_proyecto);

    if (error) {
        console.error("ERROR AL QUITAR DE FAVORITOS:", error);
        return new Response(JSON.stringify(error), { status: 400 });
    }
    return new Response(JSON.stringify({ success: true }), { status: 200 });
}