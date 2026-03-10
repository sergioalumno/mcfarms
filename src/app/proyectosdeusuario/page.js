import Proyectosdeusuario from "./proyectosdeusuarios";
import { Navbar, Paginacion, Footer } from "@/app/layout"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Proyectosdeusuario/>
      <Paginacion/>
      <Footer/>
    </div>
  );
}
