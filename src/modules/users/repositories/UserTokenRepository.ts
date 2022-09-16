import { EntityRepository, Repository } from 'typeorm';
import { UserToken } from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokenRepository extends Repository<UserToken> {
    async findByToken(token: string): Promise<UserToken | undefined> {
        return this.findOne({
            where: { token },
        });
    }

    async generate(userId: string): Promise<UserToken> {
        const userToken = this.create({ userId });

        return this.save(userToken);
    }
}
