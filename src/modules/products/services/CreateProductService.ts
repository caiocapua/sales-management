import { ProductsRepository } from '../repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import { AppError } from '@shared/errors/AppError';
import { Product } from '../entities/Product';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

export class CreateProductService {
    async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productRepository = getCustomRepository(ProductsRepository);
        const productExists = await productRepository.findByName(name);

        if (productExists) {
            throw new AppError('Product already exists');
        }

        const product = productRepository.create({
            name,
            price,
            quantity,
        });

        return productRepository.save(product);
    }
}
