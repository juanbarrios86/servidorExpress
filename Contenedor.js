 const { error } = require('console');
const fs = require('fs');


 class Contenedor{

    constructor(ruta){
        this.ruta = ruta;
    }

    async save(articulo)
    {
        let numeroid; 

            try{
                
                const archivo =  this.getAll();
                const datos = JSON.parse(archivo);

                numeroid = datos.length + 1;
                console.log(numeroid);
                const artnuevo = {
                    title: articulo.title,
                    price: articulo.price,
                    thumbnail: articulo.thumbnail,
                    id: numeroid
                }
                
                datos.push(artnuevo);
                await fs.promises.writeFile(this.ruta,JSON.stringify(datos))

            }
            catch{
                
                throw error 
                console.log(error);
             }

             if (numeroid == undefined)
                numeroid = 1;
             return numeroid;
           
           
    }

    async getAll()
        {
            let datos = [];
            try {
                const archivo = await fs.promises.readFile(this.ruta,'utf-8');
                datos = JSON.parse(archivo);
            
                
            }
            catch{
                console.log("Error");
            }
            return datos;
        }


    async getById(id){
        let objectoEncontrado=null;
      
        try {
            const archivo = await fs.promises.readFile(this.ruta,'utf-8');
            
            
            const objeto = JSON.parse(archivo);
            let a = objeto.map( function (articulo, index, array){
                   if(articulo.id == id)
                   {
                   
                       objectoEncontrado=objeto[index];
                   }
                  
            })
        
            return objectoEncontrado;
            
        } catch (error) {
            
        }

    }

    async deleteById(id){
        try {
            const archivo = await fs.promises.readFile(this.ruta,'utf-8');
            
            const objeto = JSON.parse(archivo);
            
            const objectoEncontrado= await this.getById(id);

            let idProd = objectoEncontrado.id;
            
            objeto.splice(objeto.findIndex(function(i){
                return i.id === idProd;
            }), 1); 
            await fs.promises.writeFile(this.ruta,JSON.stringify(objeto));
        }
             
        catch (err){
            console.log("No se encontró el identificador para eliminar: "+err);
            
        }

    }

    async deleteAll(){
        try {
            let datos = [];
            await fs.promises.writeFile(this.ruta,JSON.stringify(datos))
        } catch (error) {
            console.log(error);
        }
    }

   
}


module.exports = Contenedor;
