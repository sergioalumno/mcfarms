import { supabase } from "@/lib/supabase"

export const dynamic = "force-dynamic";

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id_usuario, nuevo_estado } = body;

        if (!id_usuario) {
            return new Response(JSON.stringify({ error: "Falta el ID del usuario" }), { status: 400 });
        }

        const { data, error } = await supabase
            .from("usuarios")
            .update({ estado: nuevo_estado })
            .eq("id", id_usuario)
            .select();

        if (error) throw error;

        return new Response(JSON.stringify(data[0]), { status: 200, headers: { "Content-Type": "application/json" } });
        
    } catch (error) {
        console.error("Error baneando usuario:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), { status: 500 });
    }
}