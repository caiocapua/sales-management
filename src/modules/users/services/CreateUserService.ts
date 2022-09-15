import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcrypt';
import { getCustomRepository } from 'typeorm';
import { User } from '../entities/Users';
import { UsersRepository } from '../repositories/UsersRepository';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export class CreateUserService {
    async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('User already exists', 400);
        }

        const hashedPassword = await hash(password, 10);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return usersRepository.save(user);
    }
}
