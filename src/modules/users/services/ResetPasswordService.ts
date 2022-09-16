import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { UsersRepository } from '../repositories/UsersRepository';
import { UserTokenRepository } from '../repositories/UserTokenRepository';
import { hash } from 'bcrypt';

interface IRequest {
    token: string;
    password: string;
}

export class ResetPasswordService {
    async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists', 400);
        }

        const user = await usersRepository.findOne(userToken.userId);

        if (!user) {
            throw new AppError('User does not exists', 400);
        }

        const tokenCreatedAt = userToken.createdAt;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired', 400);
        }

        user.password = await hash(password, 10);

        await usersRepository.save(user);
    }
}
