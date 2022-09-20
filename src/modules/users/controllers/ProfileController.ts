import { Request, Response } from 'express';
import { ShowUserProfileService } from '../services/ShowProfileService';
import { UpdateProfileService } from '../services/UpdateProfileService';
import { instanceToInstance } from 'class-transformer';

export class ProfileController {
    async show(request: Request, response: Response): Promise<Response> {
        const userId = request.user.id;

        const showUserProfileService = new ShowUserProfileService();

        const profile = await showUserProfileService.execute({ userId });

        return response.json(instanceToInstance(profile));
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { name, email, password, oldPassword } = request.body;
        const userId = request.user.id;

        const updateProfileService = new UpdateProfileService();

        const user = await updateProfileService.execute({
            userId,
            name,
            email,
            password,
            oldPassword,
        });

        return response.json(instanceToInstance(user));
    }
}
