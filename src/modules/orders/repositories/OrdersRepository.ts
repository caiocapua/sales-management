import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/Order';
import { Customer } from '../../customers/entities/Customer';

interface IProduct {
    productId: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer: Customer;
    products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepository extends Repository<Order> {
    async findById(id: string): Promise<Order | undefined> {
        return this.findOne(id, {
            relations: ['customer', 'order_products'],
        });
    }

    async createOrder({ customer, products }: IRequest): Promise<Order> {
        const order = this.create({
            customer,
            order_products: products,
        });

        return this.save(order);
    }
}
