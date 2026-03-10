import Busquedaproy from "./busquedaproyectos";
import { Navbar, Paginacion, Footer } from "@/app/layout"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Busquedaproy />
      <Paginacion/>
      <Footer/>
    </div>
  );
}
