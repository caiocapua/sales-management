import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';

export class ShowProductService {
    async execute(id: string): Promise<Product> {
        const productRepository = getCustomRepository(ProductsRepository);

        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        return product;
    }
}
