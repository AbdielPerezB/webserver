import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class Server {
    private app = express();
    //Las propiedades readonly solo se puede cambiar en el constructor
    //fuera de ahí ya no se pueden cambiar
    private readonly port: number;
    private readonly publicPath: string;


    constructor(options: Options){
        const {port, public_path = 'public'} = options;
        this.port = port;
        this.publicPath = public_path;

    }

    async start () {
        // MOddleweares

        // Public Folder
        this.app.use(express.static(this.publicPath));

        //Aquí cachamos todas las rutas que no estan definidas
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