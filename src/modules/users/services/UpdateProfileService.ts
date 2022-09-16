import { AppError } from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/Users';
import { UsersRepository } from '../repositories/UsersRepository';

interface IRequest {
    userId: string;
    name?: string;
    email: string;
    password?: string;
    oldPassword?: string;
}

export class UpdateProfileService {
    async execute({
        userId,
        name,
        email,
        password,
        oldPassword,
    }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(userId);

        if (!user) {
            throw new AppError('User not found', 404);
        }

        const userUpdateEmail = await usersRepository.findByEmail(email);

        if (userUpdateEmail && userUpdateEmail.id !== userId) {
            throw new AppError('Email already exists', 400);
        }

        if (password && !oldPassword) {
            throw new AppError('Old password is required', 400);
        }

        if (password && oldPassword) {
            const checkOldPassword = await compare(oldPassword, user.password);

            if (!checkOldPassword) {
                throw new AppError('Old password does not match', 400);
            }

            user.password = await hash(password, 10);
        }

        Object.assign(user, {
            name,
            email,
        });

        return usersRepository.save(user);
    }
}
