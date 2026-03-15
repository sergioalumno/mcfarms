"use client"
import { usePathname } from "next/navigation"

export default function FooterComp() {
    const location = usePathname();

    if (
        location === "/iniciarsesion" ||
        location === "/registro" ||
        location === "/publicar" ||
        location === "/" ||
        location.startsWith("/perfil/") ||
        location.startsWith("/proyecto/")
    ) {
        return null;
    }

    return (
        <footer className="bg-grisoscuro_fondotarj w-full text-white py-6 md:py-4 px-8 mt-10 flex flex-col md:flex-row items-center justify-center md:justify-between relative gap-4 md:gap-0">
            <h3 className="font-bold text-lg md:absolute md:left-1/2 md:-translate-x-1/2 text-center w-full md:w-auto">
                MC Farms© - 2026
            </h3>

            <div className="flex items-center md:ml-auto z-10">
                <a href="https://www.instagram.com/" className="hover:scale-110 hover:opacity-80 transition-all duration-300 cursor-pointer flex items-center">
                    <img src="ig.png" width="50px" className="hover:opacity-80 transition-opacity"/>
                </a>
                <a href="https://x.com/" className="hover:scale-110 hover:opacity-80 transition-all duration-300 cursor-pointer flex items-center h-10 w-18">
                    <img src="x.png" width="50px" className="hover:opacity-80 transition-opacity h-10 w-18"/>
                </a>
            </div>
        </footer>
    );
}