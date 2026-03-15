"use client"

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { useRouter } from "next/navigation";

export default function Publicar() {
    const router = useRouter();
    const [Nnombre, setNombre] = useState("");
    const [Ndescripcion, setDescripcion] = useState("");
    const [Ndificultad, setDificultad] = useState("");
    const [Narchivo, setArchivo] = useState(null); 
    const [imagenes, setImagenes] = useState([]); 
    const [indicePortada, setIndicePortada] = useState(0);
    const [subiendo, setSubiendo] = useState(false);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        async function cargarDatosUsuario() {
            try {
                const res = await fetch('/api/sesion');
                if (res.ok) {
                    const datos = await res.json();
                    setUsuario(datos);
                }
            } catch (error) {
                console.error("Error cargando usuario", error);
            }
        }
        cargarDatosUsuario();
    }, []);

    const handleImagenes = (e) => {
        if (e.target.files) {
            const nuevosArchivos = Array.from(e.target.files);
            setImagenes((prev) => [...prev, ...nuevosArchivos].slice(0, 10));
        }
    };

    const eliminarImagen = (indexAEliminar) => {
        setImagenes(imagenes.filter((_, index) => index !== indexAEliminar));
        
        if (indicePortada === indexAEliminar) {
            setIndicePortada(0);
        } else if (indicePortada > indexAEliminar) {
            setIndicePortada(indicePortada - 1);
        }
    };

        async function handlesubmit(e) {
        e.preventDefault(); 

        if (!usuario) { alert("Debes iniciar sesión para publicar un proyecto."); return; }
        if (!Narchivo) { alert("Por favor, selecciona el archivo del mundo (.zip, .rar)."); return; }
        if (imagenes.length === 0) { alert("Por favor, sube al menos una imagen."); return; }

        setSubiendo(true);

        try {
            const extensionMundo = Narchivo.name.split('.').pop();
            const nombreMundoUnico = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extensionMundo}`;

            const { error: errMundo } = await supabase.storage
                .from('archivos_proyectos') 
                .upload(nombreMundoUnico, Narchivo);
            if (errMundo) throw errMundo;

            const { data: { publicUrl: urlMundo } } = supabase.storage
                .from('archivos_proyectos').getPublicUrl(nombreMundoUnico);
            const response = await fetch("/api/proyectos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    proyecto: {
                        id_usuario: usuario.id,
                        nombre: Nnombre,
                        descripcion: Ndescripcion,
                        url_descarga: urlMundo,
                        dificultad: parseInt(Ndificultad)
                    },
                }),
            });

            if (!response.ok) throw new Error("Error al crear proyecto en BD");
            
            const infoProyectoCargado = await response.json();
            const idProyectoNuevo = infoProyectoCargado.id; 
            const subidaImagenesPromises = imagenes.map(async (imgFisica, index) => {
                const extImg = imgFisica.name.split('.').pop();
                const nombreImgUnica = `${Date.now()}-${Math.random().toString(36).substring(7)}.${extImg}`;
                
                const { error: errImg } = await supabase.storage
                    .from('archivos_proyectos') 
                    .upload(`imagenes/${nombreImgUnica}`, imgFisica);
                if (errImg) throw errImg;

                const { data: { publicUrl: urlImg } } = supabase.storage
                    .from('archivos_proyectos').getPublicUrl(`imagenes/${nombreImgUnica}`);

                return supabase.from("imagenes_proyecto").insert({
                    id_proyecto: idProyectoNuevo,
                    url_imagen: urlImg,
                    portada: index === indicePortada 
                });
            });

            await Promise.all(subidaImagenesPromises);
            alert("¡Proyecto publicado con éxito!");
            window.location.href = `/proyecto/${idProyectoNuevo}`; 

        } catch (error) {
            console.error("Error publicando:", error);
            alert("Hubo un error al publicar el proyecto.");
        } finally {
            setSubiendo(false);
        }
    }

    return(
        <div>
        	<div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]" >
				<div className="bg-grisoscuro_fondo w-full max-w-5xl rounded-4xl p-10 relative">
				
					<h1 className="text-white text-4xl mb-5">Publicar proyecto</h1>

					<form onSubmit={handlesubmit} className="flex flex-col md:flex-row gap-12">
						
						<div className="flex-1 flex flex-col gap-6">
							<div>
								<label className="text-xl font-bold block mb-2">Nombre:</label>
								<input type="text" placeholder="Introduce tu nombre..." minLength="5" maxLength="35" required value={Nnombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-3 rounded-lg bg-white text-black outline-none"/>
							</div>

							<div>
								<p className="text-xl font-bold block mb-2">Dificultad:</p>
								<select required  value={Ndificultad} onChange={(e) => setDificultad(e.target.value)} className="w-full p-3 rounded-lg bg-white text-black outline-none appearance-none cursor-pointer">
									<option disabled value="">Selecciona una dificultad</option>
									<option value="1">★☆☆☆☆</option>
									<option value="2">★★☆☆☆</option>
									<option value="3">★★★☆☆</option>
									<option value="4">★★★★☆</option>
									<option value="5">★★★★★</option>
								</select>
							</div>

							<div className="flex-1 flex flex-col">
								<p className="text-xl font-bold block mb-2">Descripción:</p>
								<textarea placeholder="Descripcion del proyecto..." minLength="15" maxLength="500" required value={Ndescripcion} onChange={(e) => setDescripcion(e.target.value)} className="w-full p-3 flex-1 rounded-lg bg-white text-black outline-none resize-none"></textarea>
							</div>

						</div>

						<div className="flex-1 flex flex-col gap-6">

                            <div>
                                <p className="text-xl font-bold block mb-2">Imágenes:</p>
                                <div className="bg-white rounded-xl p-4 flex flex-wrap gap-3 items-center min-h-30">
                                    
                                    {imagenes.length < 10 && (
                                        <label className="w-20 h-20 bg-gray-700 hover:scale-105 transition-transform rounded-lg flex items-center justify-center cursor-pointer shrink-0">
                                            <span className="text-white text-3xl">+</span>
                                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImagenes} />
                                        </label>
                                    )}

                                    {imagenes.map((img, index) => (
                                        <div key={index} className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all border-4 ${indicePortada === index ? 'border-morado_acentos' : 'border-transparent hover:border-morado_acentos'}`} onClick={() => setIndicePortada(index)} title={indicePortada === index ? "Esta es la portada" : "Haz clic para hacer portada"}>
                                            <img src={URL.createObjectURL(img)} className="w-full h-full object-cover" />
                                            
                                            {indicePortada === index && (
                                                <div className="absolute bottom-0 w-full bg-morado_acentos text-white text-[10px] text-center font-bold py-0.5">
                                                    PORTADA
                                                </div>
                                            )}

                                            <button type="button" onClick={(e) => { e.stopPropagation(); eliminarImagen(index); }} className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] hover:bg-red-700">
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

							<div>
								<p className="text-xl font-bold block mb-2">Archivo del Mundo/Granja:</p>
								<label className="w-full bg-white p-4 rounded-lg flex flex-col items-center justify-center hover:scale-105 transition-transform cursor-pointer text-black">
									<img src="/upload-b.png" className="h-12 mb-2" alt="Icono subir" />
									<span className="text-center font-medium overflow-hidden text-ellipsis w-full px-2 whitespace-nowrap">
										{Narchivo ? Narchivo.name : "Seleccionar .zip o .schematic"}
									</span>
									<input type="file" className="hidden" requiredaccept=".zip,.rar,.schematic,.litematic" onChange={(e) => setArchivo(e.target.files[0])}/>
								</label>
							</div>

							<div className="flex gap-4 mt-auto">
								<button type="button" onClick={() => router.push('/home')} className="cancelar w-full h-full text-2xl">Volver</button>
								<button type="submit" disabled={subiendo || !usuario} className="confirmar w-full h-full text-2xl">
									{subiendo ? "Subiendo..." : "Publicar"}
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
        </div>
    )
}
