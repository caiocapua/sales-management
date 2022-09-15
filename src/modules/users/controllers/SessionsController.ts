import { Request, Response } from 'express';
import { CreateSessionsService } from '../services/CreateSessionsService';

export class SessionsController {
    async login(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const createSessionsService = new CreateSessionsService();

        const session = await createSessionsService.execute({
            email,
            password,
        });

        return response.json(session);
    }
}
