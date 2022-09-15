import { getCustomRepository } from 'typeorm';
import { User } from '../entities/Users';
import { UsersRepository } from '../repositories/UsersRepository';

export class ListUsersService {
    async execute(): Promise<User[]> {
        const usersRepository = getCustomRepository(UsersRepository);

        return usersRepository.find();
    }
}
