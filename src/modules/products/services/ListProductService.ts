import { getCustomRepository } from 'typeorm';
import { Product } from '../entities/Product';
import { ProductsRepository } from '../repositories/ProductsRepository';
import { RedisCache } from '@shared/cache/RedisCache';

export class ListProductService {
    async execute(): Promise<Product[]> {
        const productRepository = getCustomRepository(ProductsRepository);

        const redisCache = new RedisCache();

        let products = await redisCache.recover<Product[]>(
            'api-vendas-PRODUCT_LIST',
        );

        if (!products) {
            products = await productRepository.find();

            await redisCache.save('api-vendas-PRODUCT_LIST', products);
        }

        await redisCache.save('teste', 'value');

        return products;
    }
}
