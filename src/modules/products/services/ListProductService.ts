import { getCustomRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';

export class ListProductService {
    async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductsRepository);

        return productRepository.find();
    }
}
