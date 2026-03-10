import Proyecto from "./proyecto";
import { Navbar, Paginacion, Footer } from "@/app/layout"

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Proyecto />
    </div>
  );
}
