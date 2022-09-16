import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Customer } from '../entities/Customer';
import { CustomersRepository } from '../repositories/CustomersRepository';

interface IRequest {
    id: string;
    name?: string;
    email: string;
}

export class UpdateCustomerService {
    async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('User not found', 404);
        }

        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists && email !== customer.email) {
            throw new AppError(
                'There is already one customer with this email',
                400,
            );
        }

        Object.assign(customer, {
            name,
            email,
        });

        return customersRepository.save(customer);
    }
}
