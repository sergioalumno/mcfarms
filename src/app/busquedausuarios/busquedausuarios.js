import { Navbar, Paginacion, Footer } from "@/app/layout"

export default function Busquedausua() {
    const ListaUsuarios = [{id:0, img:"pfp.png", nombre: "Bobicraft", biografia:"Soy Bobicraft Youtuber de Minecraft"},{id:1, img:"pfp.png", nombre: "Willyrex", biografia:"Bienvenidos a mi perfil soy Willirex famoso youtuber español que juega minecraft"}]

    return(
        <div>
            <Navbar/>
            <h1>Busqueda de usuarios</h1>
                {ListaUsuarios.map(usuario => 
                    <div key={usuario.id}>
                    <RenderizarUsuario objusuario={usuario} />
                    </div>) }
            <Paginacion />
            <Footer />
        </div>
    )
}

function RenderizarUsuario({objusuario}) {
    return(
        <div>
            <img src={objusuario.img} />
            {objusuario.nombre}
            {objusuario.biografia}
        </div>
    )
}