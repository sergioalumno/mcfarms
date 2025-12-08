export default function IniciarSesion() {

    return (
        <div>
            <form>
                <h2>Iniciar Sesión</h2>
                <p>Correo electrónico</p>
                <input type="email" placeholder="Introduce tu correo electrónico..." minLength="4" maxLength="35" required/>
                <p>Contraseña</p>
                <input type="password" placeholder="Introduce tu contraseña..." minLength="8" maxLength="30" required />
                <button>Volver</button>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}