Entregable 4 Sergio López Gil

MCFarms
DESCRIPCION
MCFarms es un proyecto que es un repositorio de granjas de minecraft tecnico para que los usuarios puedan guardar en la nube y compartir sus creaciones con otros jugadores

ARQUITECTURA
FRONTEND
usando React y Tailwind he desarrollado una interfaz funcional con estilos y responsive que permita que el usuario interactue con la pagina 

BACKEND
es el intermediario al que el frontend llama y se conecta a la base de datos, he creado la carpeta api en la que esta todo el backend separado en carpetas

BASE DE DATOS
he usado supabase y gestiona la informacion de todo el proyecto

ENDPOINTS
/api/buscar 
    GET sirve para buscar usuarios o proyectos en la base de datos filtrando por lo que coincida en la busqueda lo uso en la Navbar


/api/proyectos
    GET sirve para mostrar los proyectos en el home y tambien se encarga de dividir los proyectos para la paginacion
    POST sirve para publicar un proyecto nuevo
    PUT sirve para editar un proyecto existente
    DELETE sirve para eliminar un proyecto

/api/proyectos/guardar
    GET sirve para ver si un proyecto esta o no marcado como favorito
    POST sirve para añadir un proyecto a favoritos
    DELETE sirve para quitar un proyecto de favoritos

/api/proyectos/propios
    GET sirve para obtener los proyectos de un usuario especifico y tambien los divide para la paginacion

/api/proyectos/proyecto_id
    GET sirve para obtener todos los datos de un proyecto para poder cargar su vista detallada


/api/sesion
    GET mira las cookies del navegador y gestiona la sesion activa 
    POST sirve para cerrar sesion 


/api/usuarios
    GET obtiene los datos de un usuario sirve para obtener los datos para ver el perfil
    PUT sirve para que los usuarios puedan modificar su perfil

/api/usuarios/admin
    PUT sirve para marcar si un usuario esta baneado o no

/api/usuarios/favoritos
    GET sirve para obtener todos los proyectos favoritos de un usuario y tambien los divide para la paginacion 

VARIABLES DE ENTORNO
    NEXT_PUBLIC_SUPABASE_URL=https://giqsuhlpsjmaibgkdhjx.supabase.co
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_PQR0YbkehKmnz-es_oiXqA_8Kv6eXxo

ESTRUCTURA BASE DE DATOS
    auth.users.id
        Tabla que crea supabase que se usa para gestionar el inicio de sesion y registro
    usuarios
        Tabla de todos los usuarios existentes que contiene mas informacion como nombre biografia foto etc
    proyectos
        Tabla que guarda la informacion de los proyectos publicados
    imagenes_proyecto
        Como los proyectos pueden tener mas de 1 foto necesito esta tabla que se encarga de guardar las fotos de cada proyecto
    favoritos
        tabla que guarda los proyectos favoritos de los usuarios

INSTRUCCIONES
El proyecto se lanza de la siguiente manera:
Instalar Node.js
Instalar un IDE yo he usado Visual Studio

Cuando clones el repositorio tienes que ejecutar en la terminal del proyecto "npm install" y despues "npm run dev"

crea el archivo env.local em la raiz del proyecto y copia las variables de entorno que puse arriba 

Despues el npm run dev te mostrara en la terminal la direccion de localhost a la que si accedes podras ver la landing del proyecto. 
Para acceder a las distintas paginas necesitas registrarte y iniciar sesion con tu usuario

INFO
TECNOLOGIAS DE ESTILOS USADAS
    - Tailwind
    - CSS

PALETA DE COLORES
#FFFFFF (Blanco): Iconos de la interfaz y algunos textos
#EFDAAC (Arena): Iconos de la Barra superior
#3C8527 (Verde): Sombra de las imágenes
#8B8A8A (Gris claro): Color de la fuente
#6B6562 (Gris oscuro): Fondo de las tarjetas
#171615 (Gris fondo): Fondo de la pagina
#E833C2 (Morado): Color de acento

---------------------------------------------------

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
