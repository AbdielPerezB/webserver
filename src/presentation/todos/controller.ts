// CFH (Comentario de Fernando Herrera): En los controladores
// no hay métodos estáticos porque USUALMENTE se inyectan 
// dependencias

import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy milk', createdAt: new Date() },
    { id: 2, text: 'Buy milk', createdAt: new Date() },
    { id: 3, text: 'Buy milk', createdAt: new Date() },
]

export class TodosController {

    constructor() { }

    //COmo son métodos para usarse en express,
    // no utilizamos la palabra get, en lugar usamos getTodos,
    // esto ahorrará muchos dolores de cabeza
    public getTodos(req: Request, res: Response) {
        res.json(todos);
    }

    public getTodoById(req: Request, res: Response): void {
        const id = +req.params.id; //Usamos el + para que se convierta de str a number

        if (isNaN(id)) {
            res.status(400).json({ error: `${id} is not a number` });
            return;
        }
        const todo = todos.find(todo => todo.id === id);

        (todo)
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` })
    }

    public createTodo(req: Request, res: Response) {
        const { text } = req.body

        if (!text) {
            res.status(400).json({ error: 'Text property is required' })
            return;
        }

        const newTodo = {
            id: todos.length + 1,
            text: text,
            createdAt: new Date()
        }

        todos.push(newTodo)
        res.json(newTodo)
    }

    public updateTodo(req: Request, res: Response) {
        const id = +req.params.id; //Usamos el + para que se convierta de str a number

        if (isNaN(id)) {
            res.status(400).json({ error: `${id} is not a number` });
            return;
        }
        const todo = todos.find(todo => todo.id === id);

        if (!todo) {
            res.status(404).json({ error: 'not found' });
            return;
        }

        const { text, createdAt } = req.body;
        if (!text) {
            res.status(404).json({ error: 'Text property is required' });
            return;
        }

        todo.text = text || todo.text; //Referencia

        res.json(todo)

    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = todos.find(todo => todo.id === id)
        if (!todo) {
            res.status(404).json({ error: 'Not found' });
            return;
        }

        todos.splice(todos.indexOf(todo), 1);

        res.json(todo)


    }

}