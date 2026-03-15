import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase';

export const dynamic = "force-dynamic";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return new Response(JSON.stringify({ error: "Falta ID" }), { status: 400 });

    const { data, error } = await supabase
        .from('usuarios')
        .select('id, nombre, foto_perfil, biografia, estado')
        .eq('id', id)
        .single();

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function PUT(request) {
    try {
        const formData = await request.formData()
        const nombre = formData.get('nombre')?.trim()
        const biografia = formData.get('biografia')?.trim()
        const email = formData.get('email')?.trim() 
        const password = formData.get('password')?.trim() 
        const archivoFoto = formData.get('foto_perfil') 
        let foto_url_final = formData.get('foto_url_actual') 
        
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
            {
                cookies: {
                    getAll() { return cookieStore.getAll() },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) => {
                                cookieStore.set(name, value, options)
                            })
                        } catch (error) {}
                    },
                },
            }
        )
        
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) return NextResponse.json({ error: "No autorizado" }, { status: 401 })
        
        if (archivoFoto && typeof archivoFoto === 'object') {
            const extension = archivoFoto.name.split('.').pop()
            const nombreArchivo = `${user.id}-${Date.now()}.${extension}`
            
            const { error: uploadError } = await supabase.storage
                .from('pfps')
                .upload(nombreArchivo, archivoFoto)

            if (uploadError) {
                console.error("Error al subir foto:", uploadError)
                return NextResponse.json({ error: "No se pudo subir la foto." }, { status: 500 })
            }

            const { data: publicUrlData } = supabase.storage.from('pfps').getPublicUrl(nombreArchivo)
            foto_url_final = publicUrlData.publicUrl 

            const fotoAntigua = formData.get('foto_url_actual');
            console.log("URL Antigua recibida:", fotoAntigua);

            if (fotoAntigua && fotoAntigua.includes('supabase.co') && !fotoAntigua.includes('default-pfp.png')) {
                const urlSinParametros = fotoAntigua.split('?')[0];
                const partes = urlSinParametros.split('/');
                const nombreArchivoAntiguo = partes[partes.length - 1].trim(); 
                
                if (nombreArchivoAntiguo) {
                    console.log("Intentando borrar de Supabase (limpio):", nombreArchivoAntiguo);
                    
                    const { data: delData, error: delError } = await supabase.storage
                        .from('pfps')
                        .remove([nombreArchivoAntiguo]);
                    
                    if (delError) {
                        console.error("ERROR REAL AL BORRAR:", delError);
                    } else if (delData && delData.length > 0) {
                        console.log("¡BORRADO CONFIRMADO!", delData);
                    } else {
                        console.log("Supabase dice que el archivo no existe en el bucket pfps:", nombreArchivoAntiguo);
                    }
                }
            }
        }

        const { error: dbError } = await supabase
            .from('usuarios')
            .update({ nombre, biografia, foto_perfil: foto_url_final })
            .eq('id', user.id)

        if (dbError) {
            console.error("Error DB:", dbError)
            return NextResponse.json({ error: "No se pudo actualizar el perfil" }, { status: 500 })
        }

        if (email && email !== user.email) {
            
            const { data, error: emailError } = await supabase.auth.updateUser({ 
                email: email,
                data: { email: email } 
            })
            
            if (emailError) {
                console.error("Error Email:", emailError)
                return NextResponse.json({ error: "Error al cambiar correo" }, { status: 400 })
            }
        }

        
        if (password && password.length >= 6) {
            const { error: passError } = await supabase.auth.updateUser({ password: password })
            if (passError) return NextResponse.json({ error: "Perfil guardado, pero falló la contraseña." }, { status: 400 })
        }

        return NextResponse.json({ 
            mensaje: "Perfil actualizado correctamente",
            foto_perfil: foto_url_final 
        }, { status: 200 })

    } catch (error) {
        console.error("Error General:", error)
        return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
    }
}