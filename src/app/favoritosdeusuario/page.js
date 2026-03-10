import Favoritosdeusuario from "./favoritosdeusuario";
import { Navbar, Paginacion, Footer } from "@/app/layout"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Favoritosdeusuario />
      <Paginacion/>
      <Footer/>
    </div>
  );
}
