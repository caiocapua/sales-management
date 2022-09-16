import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { CustomersRepository } from '../repositories/CustomersRepository';

export class RemoveCustomerService {
    async execute(id: string): Promise<void> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findOne(id);

        if (!customer) {
            throw new AppError('Product not found', 404);
        }

        await customersRepository.softDelete(id);
    }
}
