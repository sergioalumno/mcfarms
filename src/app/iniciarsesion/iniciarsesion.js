import Link from "next/link"

export default function IniciarSesion() {

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-[url('/mfondo.jpg')]">

            <form className="bg-grisoscuro_fondo p-10 rounded-4xl w-full max-w-md flex flex-col shadow-2xl">

                <h2 className="font-titulo flex justify-center text-white text-3xl pb-10">Inicio de Sesión</h2>
                <p className="text-xl">Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." minLength="4" maxLength="35" required className="w-full p-3 rounded-md bg-white text-black"/>
                
                <p className="text-xl pt-5">Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required className="w-full mb-10 p-3 rounded-md bg-white text-black"/>

                <div className="grid grid-cols-2 gap-4 w-full px-2">
                    <Link href="/..">
                    <button className="cancelar w-full h-full text-2xl">Volver</button>
                    </Link>
                    <Link href="/home">
                    <button type="submit" className="confirmar w-full h-full text-2xl">Iniciar Sesión</button>
                    </Link>
                </div>

            </form>
        </div>
    )
}