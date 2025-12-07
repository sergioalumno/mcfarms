export default function Registro() {

    return (
        <div>
            <form>
                <h2>Registro</h2>
                <p>Nombre de usuario</p>
                <input type="text" placeholder="Introduce tu nombre de usuario..."/>
                <p>Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." />
                <p>Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." />
                <p>Confirmar contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." />
                <button>Volver</button>
                <button>Registrarse</button>
            </form>
        </div>
    )
}
