export default function Publicar() {

    return(
        <div>
            
            <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 bg-[url('/mfondo.jpg')]" >
      
      <div className="bg-grisoscuro_fondo w-full max-w-5xl rounded-4xl p-10 relative">
        
        <h1 className="text-white text-4xl mb-5">Publicar proyecto</h1>

        <form className="flex flex-col md:flex-row gap-12">
          
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <label className="text-xl font-bold block mb-2">Nombre:</label>
              <input type="text" placeholder="Introduce tu nombre..." minLength="5" maxLength="35" required className="w-full p-3 rounded-lg bg-white text-black outline-none"/>
            </div>

            <div>
              <p className="text-xl font-bold block mb-2">Dificultad:</p>
              <select required defaultValue="" className="w-full p-3 rounded-lg bg-white text-black outline-none appearance-none cursor-pointer">
                <option disabled value="">Selecciona una dificultad</option>
                    <option value="1">★☆☆☆☆</option>
                    <option value="2">★★☆☆☆</option>
                    <option value="3">★★★☆☆</option>
                    <option value="4">★★★★☆</option>
                    <option value="5">★★★★★</option>
              </select>
            </div>

            <div>
              <p className="text-xl font-bold block mb-2">Descripción:</p>
              <textarea placeholder="Descripcion del proyecto..." minLength="15" maxLength="60" required className="w-full p-3 h-32 rounded-lg bg-white text-black outline-none"></textarea>
            </div>

          </div>

          <div className="flex-1 flex flex-col gap-6">
            <div>
              <p className="text-xl font-bold block mb-2">Imágenes:</p>
              <div className="bg-white rounded-xl aspect-video flex items-center justify-center hover:scale-105 overflow-hidden transition-transform">
                <img src="image.png" className="w-30" />
              </div>
            </div>

            <div>
              <p className="text-xl font-bold block mb-2">Archivo:</p>
              <button className="w-full bg-white p-4 rounded-lg flex items-center justify-center hover:scale-105 transition-transform">
                <img src="upload-b.png" className="h-12" />
              </button>
            </div>

            <div className="flex gap-4 mt-auto">
              <button className="cancelar w-full h-full text-2xl">Volver</button>
              <button type="submit" className="confirmar w-full h-full text-2xl">Publicar</button>
            </div>

          </div>

        </form>
      </div>
    </div>

        </div>
    )
}
