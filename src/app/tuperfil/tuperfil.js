"use client"

import { useState } from "react"

export default function Tuperfil() {
const [nombre, setnombre] = useState("Shio")
const [bio, setBio] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco")
const [editar, setEditar] = useState(false)

    if (editar) {
        return (
            <div>
                <img src="pfp.png" />
                <button onClick={CambiaraEditar}>Guardar Cambios</button>
                <br/>
                <button>Subir foto de perfil</button>
                <br/>
                <input type="text" placeholder={nombre} onChange={(e)=>setnombre(e.target.value)}/>
                <p>Biografia</p>
                <input type="text" placeholder={bio} onChange={(e)=>setBio(e.target.value)}/>
                <br />
                <button>Proyectos subidos</button>
                <button>Proyectos guardados</button>
            </div>
        )
    }

    function CambiaraEditar(e) {
        e.preventDefault()
        {setEditar(!editar)}
    }

    return(
        <div>
            <img src="pfp.png" />
            <button onClick={CambiaraEditar}>editar perfil</button>
            <h1>{nombre}</h1>
            <p>Biografia</p>
            <p>{bio}</p>
            <button>Proyectos subidos</button>
            <button>Proyectos guardados</button>
        </div>
    )
}