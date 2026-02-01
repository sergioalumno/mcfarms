"use client"

import { useState } from "react"

export default function Tuperfil() {
const [nombre, setnombre] = useState("Shio")
const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco")
const [editar, setEditar] = useState(false)

    if (editar) {
        return (
                <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]">
                    <div className="bg-grisoscuro_fondo flex w-full max-w-5xl rounded-4xl p-10 relative">
                        
                        <div className="flex flex-col items-center justify-center gap-5 w-1/3">
                        <img src="person-circle-w.png" className="w-48 h-48"/>
                        <button className="confirmar text-2xl">Subir foto de perfil</button>
                        </div>

                        <div className="flex flex-col gap-4 w-2/3 text-xl">
                            <p>Nombre:</p>
                            <input type="text" placeholder={nombre} onChange={(e)=>setnombre(e.target.value)} minLength="5" maxLength="15" className="w-full p-3 rounded-lg bg-white text-black outline-none"/>


                        <p>Biografía:</p>
                        <textarea placeholder={bio} onChange={(e)=>setBio(e.target.value)} minLength="15" maxLength="60" className="w-full p-3 h-32 rounded-lg bg-white text-black outline-none"></textarea>


                        <p>Correo electrónico:</p>
                        <input type="email" placeholder="Nuevo correo..." minLength="5" maxLength="30" className="w-full p-3 rounded-lg bg-white text-black outline-none"/>

                        <p>Contraseña:</p>
                        <input type="password" placeholder="Nueva contraseña..." minLength="5" maxLength="30" className="w-full p-3 rounded-lg bg-white text-black outline-none"/>

                        <div className="flex justify-end gap-4 mt-6">
                            <button className="cancelar w-full h-full text-2xl">Cancelar</button>
                            <button onClick={CambiaraEditar} className="confirmar w-full h-full text-2xl">Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function CambiaraEditar(e) {
        e.preventDefault()
        {setEditar(!editar)}
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]">
            <div className="bg-grisoscuro_fondo w-full max-w-5xl rounded-4xl p-10 relative">
                <div className="w-[95%] mx-auto">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
                        <div className="shrink-0 w-32 h-32 md:w-60 md:h-60 overflow-hidden">
                            <img src="pfp.png" className="w-full h-full object-cover"/>
                        </div>

                        <div className="flex-grow text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                                <h1 className="text-4xl">{nombre}</h1>
                                <button onClick={CambiaraEditar} className="absolute top-5 right-5 p-2 hover:scale-110 transition-transform">
                                    <img src="pencil-square.png" className="w-8 h-8" />
                                </button>
                            </div>
                            
                            <div className="max-w-2xl">
                                <p className="text-xl font-bold mb-1">Biografia:</p>
                                <p className="text-xl">{bio}</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center md:justify-start gap-6 mt-10">
                        <button className="confirmar max-w-md text-2xl">Proyectos subidos</button>
                        <button className="confirmar max-w-md text-2xl">Proyectos guardados</button>
                    </div>
                </div>
            </div>
        </div>
    )
}