export default function Busquedausua() {
    const ListaUsuarios = [{id:0, img:"pfp.png", nombre: "Bobicraft", biografia:"Soy Bobicraft Youtuber de Minecraft"},
        {id:1, img:"pfp.png", nombre: "Willyrex", biografia:"Bienvenidos a mi perfil soy Willirex famoso youtuber español que juega minecraft"},
        {id:2, img:"pfp.png", nombre: "Willyrex", biografia:"Bienvenidos a mi perfil soy Willirex famoso youtuber español que juega minecraft"},
        {id:3, img:"pfp.png", nombre: "Willyrex", biografia:"Bienvenidos a mi perfil soy Willirex famoso youtuber español que juega minecraft"},
    ]

    return(
        <div className="min-h-screen flex flex-col items-center py-10">
            <div className="w-[95%] mx-auto">
            <h1 className="text-4xl mb-10">Busqueda de usuarios</h1>

            <div className="flex flex-col gap-6">
                {ListaUsuarios.map(usuario => (
                    <RenderizarUsuario key={usuario.id} objusuario={usuario} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function RenderizarUsuario({objusuario}) {
    return(
        <div className="bg-grisoscuro_fondotarj text-white p-5 rounded-4xl w-full flex flex-col md:flex-row items-center md:items-start gap-6 hover:scale-101 transition-transform">
            <div className="shrink-0 md:w-40 items-center">
                <img src={objusuario.img} className="w-full h-full object-cover sm:w-80" />
            </div>

            <div className="text-2xl font-bold text-white flex flex-col">
                <p className="mb-5">
                {objusuario.nombre}
                </p>
                <p>
                {objusuario.biografia}
                </p>
            </div>
        </div>
    )
}