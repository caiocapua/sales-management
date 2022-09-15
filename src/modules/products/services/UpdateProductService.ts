import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class UpdateProductService {
    async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductsRepository);
        const productExists = await productRepository.findByName(name);
        const product = await productRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found', 404);
        }

        if (productExists) {
            throw new AppError('Product already exists');
        }

        Object.assign(product, {
            name,
            price,
            quantity,
        });

        await productRepository.save(product);

        return product;
    }
}
