import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/Users';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    async findByEmail(email: string): Promise<User | undefined> {
        return this.findOne({
            where: { email },
        });
    }
    async findByName(name: string): Promise<User | undefined> {
        return this.findOne({
            where: { name },
        });
    }
    async findById(id: string): Promise<User | undefined> {
        return this.findOne({
            where: { id },
        });
    }
}
