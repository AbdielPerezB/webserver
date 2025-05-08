import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class Server {
    private app = express();
    //Las propiedades readonly solo se puede cambiar en el constructor
    //fuera de ahí ya no se pueden cambiar
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes:Router;


    constructor(options: Options){
        const {port, routes, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = routes

    }

    async start () {
        // MOddleweares
        this.app.use(express.json()) //Para que todos los datos que lleguen al API se parseen a JSON. Raw
        this.app.use(express.urlencoded({extended: true}))//Permite el x-www-form-urlenconded

        // Public Folder
        this.app.use(express.static(this.publicPath));

        //Routes
        this.app.use(this.routes);

        //Aquí cachamos todas las rutas que no estan definidas
        //Para SPA :
            // Una SPA (Single Page Application) es una aplicación web
            // que se carga y se ejecuta completamente en la página web de un usuario,
            // en lugar de cargar nuevas páginas con cada interacción.
        this.app.get('/*splat',async (req, res) => {
            // console.log(req.url);
            // res.send('Hello world');
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            console.log(indexPath)
            res.sendFile(indexPath)
        });



        this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`)
        });
    }

}