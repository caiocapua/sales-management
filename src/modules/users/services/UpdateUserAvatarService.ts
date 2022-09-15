import { AppError } from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
    userId: string;
    avatarFileName: string;
}

export class UpdateUserAvatarService {
    async execute({ userId, avatarFileName }: IRequest) {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;

        return usersRepository.save(user);
    }
}
