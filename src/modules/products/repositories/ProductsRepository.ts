import { EntityRepository, In, Repository } from 'typeorm';
import { Product } from '../entities/Product';

interface IFindProducts {
    id: string;
}
@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
    async findByName(name: string): Promise<Product | undefined> {
        return this.findOne({
            where: { name },
        });
    }

    async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productsIds = products.map(product => product.id);

        return this.find({
            where: {
                id: In(productsIds),
            },
        });
    }
}
