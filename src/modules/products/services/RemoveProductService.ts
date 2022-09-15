import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../repositories/ProductsRepository';

export class RemoveProductService {
    async execute(id: string): Promise<void> {
        const productRepository = getCustomRepository(ProductsRepository);

        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        await productRepository.softDelete(id);
    }
}
