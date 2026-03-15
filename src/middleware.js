import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // --- LA PUERTA BLINDADA ---
  
  // 1. Define aquí las páginas donde SÍ pueden entrar los que no han iniciado sesión
  // (Normalmente tu página principal de login/registro)
  const rutasPublicas = ['/','/iniciarsesion','/registro'] // Si tu login está en otra ruta, añádela como '/login'
  const esRutaPublica = rutasPublicas.includes(request.nextUrl.pathname)

  // 2. Si NO está logueado y quiere entrar a una ruta privada (ej: /home) -> Echarlo a '/'
  if (!user && !esRutaPublica) {
    const url = request.nextUrl.clone()
    url.pathname = '/' 
    return NextResponse.redirect(url)
  }

  // 3. (Opcional pero genial) Si YA está logueado y va al login -> Mandarlo a /home directamente
  if (user && esRutaPublica) {
    const url = request.nextUrl.clone()
    url.pathname = '/home'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|api|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}