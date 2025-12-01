export default function IniciarSesion() {

    return (
        <div>
            <form>
                <h2>Iniciar Sesión</h2>
                <p>Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." />
                <p>Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." />
                <button>Volver</button>
                <button>Registrarse</button>
            </form>
        </div>
    )
}