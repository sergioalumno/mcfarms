import { Footer, Navbar, Paginacion } from "../layout";
import HomePage from "./home";



export default function Home() {
  return (
    <div>
      <Navbar/>
      <HomePage />
      <Paginacion/>
      <Footer />
    </div>
  );
}
