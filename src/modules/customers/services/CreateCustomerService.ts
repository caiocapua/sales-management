import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { CustomersRepository } from '../repositories/CustomersRepository';

interface IRequest {
    name: string;
    email: string;
}

export class CreateCustomerService {
    async execute({ name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);
        const emailExists = await customersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('User already exists', 400);
        }

        const customer = customersRepository.create({
            name,
            email,
        });

        return customersRepository.save(customer);
    }
}
