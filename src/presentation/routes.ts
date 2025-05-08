//COmentario de Fernando Herrera:
// A menos de que se necesite inyectar una dependencia,
// no se necesita crear una instancia y por ende no se necesita
// un constructor. Se pueden manejar static methods.
// Nota: Esto es OPINADO
import { Router } from 'express'
import { TodoRoutes } from './todos/routes';


export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        //Mandamos la referencia a la función, es lo mismo que
        router.use('/api/todos', TodoRoutes.routes);
        return router
    }

}