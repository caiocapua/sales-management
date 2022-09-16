import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
    async findByEmail(email: string): Promise<Customer | undefined> {
        return this.findOne({
            where: { email },
        });
    }
    async findByName(name: string): Promise<Customer | undefined> {
        return this.findOne({
            where: { name },
        });
    }
    async findById(id: string): Promise<Customer | undefined> {
        return this.findOne({
            where: { id },
        });
    }
}
