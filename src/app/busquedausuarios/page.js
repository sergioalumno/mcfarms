import Busquedausua from "./busquedausuarios";
import { Navbar, Paginacion, Footer } from "@/app/layout"

export default function Home() {
  return (
    <div>
      <Navbar />
      <Busquedausua />
      <Paginacion />
      <Footer />
    </div>
  );
}
