"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function Navbarcomp() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [usuario, setUsuario] = useState();
  const [cargando, setCargando] = useState(true);
  const [tipoBusqueda, setTipoBusqueda] = useState("proyectos");
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const location = usePathname();
  const router = useRouter(); 

  useEffect(() => {
    async function cargarDatosUsuario() {
      try {
        const res = await fetch('/api/sesion')
        if (res.ok) {
          const datos = await res.json()
          setUsuario(datos)
        }
      } catch (error) {
        console.error("Error en la petición de usuario", error)
      } finally {
        setCargando(false)
      }
    }
    cargarDatosUsuario()
  }, [])

  const cerrarMenu = () => setMenuAbierto(false);
  const manejarBusqueda = (e) => {
    e.preventDefault(); 
    if (!textoBusqueda.trim()) return; 

    cerrarMenu(); 

    if (tipoBusqueda === "proyectos") {
      router.push(`/busquedaproyectos?q=${textoBusqueda}`);
    } else {
      router.push(`/busquedausuarios?q=${textoBusqueda}`);
    }
  };

  if (
    location === "/iniciarsesion" ||
    location === "/registro" ||
    location === "/"
  ) {
    return null;
  }

  return (
    <nav className="bg-grisoscuro_fondotarj text-white relative z-50 w-full h-20 shadow-lg">
      <div className="px-6 py-3 flex items-center justify-between h-full">
        
        <Link href="/home" onClick={cerrarMenu}>
          <div className="flex items-center gap-3 hover:scale-105 transition-transform">
            <img src="/logo.png" width="50px" alt="MC Farms Logo" />
            <h1 className="text-2xl font-titulo">MC Farms</h1>
          </div>
        </Link>

        <button 
          className="md:hidden block p-2 hover:text-verde_sombra transition-colors"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="hidden md:flex items-center gap-6">
          
          <form onSubmit={manejarBusqueda} className="flex items-stretch rounded-md overflow-hidden bg-white">
            <select 
              value={tipoBusqueda}
              onChange={(e) => setTipoBusqueda(e.target.value)}
              className="bg-white text-black px-2 py-2 border-r border-gray-300 outline-none cursor-pointer"
            >
              <option value="proyectos">Proyectos</option>
              <option value="usuarios">Usuarios</option>
            </select>
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
              className="bg-white px-3 py-2 w-64 text-black text-sm outline-none"
            />
            <button type="submit" className="bg-white px-3 py-2 hover:bg-gray-200 transition-colors">
              <img src="/search.png" alt="Buscar" className="w-5 h-5 opacity-60" />
            </button>
          </form>

          <Link href="/publicar">
            <button className="hover:scale-110 transition-transform" title="Subir Proyecto">
              <img src="/upload.png" alt="Subir" className="w-8 h-8" />
            </button>
          </Link>
          
          <Link href={usuario?.id ? `/perfil/${usuario.id}` : '#'}>
            <button className="hover:scale-110 transition-transform" title="Tu Perfil">
              <img src={cargando? "/person-circle.png" : usuario?.foto_perfil } alt="Perfil" className="rounded-full w-10 h-10 object-cover" />
            </button>
          </Link>
        </div>
      </div>

      {menuAbierto && (
        <div className="md:hidden absolute top-full left-0 w-full bg-grisoscuro_fondotarj border-t border-gray-700 flex flex-col px-6 py-6 gap-6 shadow-xl">
          
          <form onSubmit={manejarBusqueda} className="flex items-stretch rounded-md overflow-hidden w-full bg-white">
            <select 
              value={tipoBusqueda}
              onChange={(e) => setTipoBusqueda(e.target.value)}
              className="bg-white text-black px-2 py-3 border-r border-gray-300 outline-none text-sm w-1/3"
            >
              <option value="proyectos">Proyectos</option>
              <option value="usuarios">Usuarios</option>
            </select>
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
              className="bg-white px-3 py-3 w-full text-black text-sm outline-none"
            />
            <button type="submit" className="bg-white px-3 py-3 hover:bg-gray-200">
              <img src="/search.png" alt="Buscar" className="w-5 h-5 opacity-60" />
            </button>
          </form>

          <div className="flex justify-around border-t border-gray-700 pt-6">
            <Link href="/publicar" onClick={cerrarMenu} className="flex flex-col items-center gap-2">
              <img src="/upload.png" alt="Subir" className="w-10 h-10" />
              <span className="text-sm">Publicar</span>
            </Link>

            <Link href={usuario?.id ? `/perfil/${usuario.id}` : '#'} onClick={cerrarMenu} className="flex flex-col items-center gap-2">
              <img src={cargando? "/person-circle.png" : usuario?.foto_perfil } alt="Perfil" className="rounded-full w-10 h-10 object-cover" />
              <span className="text-sm">Perfil</span>
            </Link>
          </div>

        </div>
      )}
    </nav>
  );
}