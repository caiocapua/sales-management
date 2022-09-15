import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';
import { ListUsersService } from '../services/ListUsersService';

export class UsersController {
    async list(request: Request, response: Response): Promise<Response> {
        const listUsersService = new ListUsersService();

        const users = await listUsersService.execute();

        return response.json(users);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({ name, email, password });

        return response.json(user);
    }
}
