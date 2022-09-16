import { getCustomRepository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { CustomersRepository } from '../repositories/CustomersRepository';

export class ListCustomersService {
    async execute(): Promise<Customer[]> {
        const customersRepository = getCustomRepository(CustomersRepository);

        return customersRepository.find();
    }
}
