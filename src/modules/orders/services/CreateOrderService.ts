import { CustomersRepository } from '@modules/customers/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/repositories/ProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Order } from '../entities/Order';
import { OrdersRepository } from '../repositories/OrdersRepository';

interface IProduct {
    id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customerId: string;
    products: IProduct[];
}

export class CreateOrderService {
    async execute({ customerId, products }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository);

        const customerExists = await customersRepository.findById(customerId);

        if (!customerExists) {
            throw new AppError(
                'Could not find any customer with the given id',
                404,
            );
        }

        const existsProducts = await productsRepository.findAllByIds(products);

        if (!existsProducts.length) {
            throw new AppError(
                'Could not find any products with the given ids',
                404,
            );
        }

        const existsProductsIds = existsProducts.map(product => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id),
        );

        if (checkInexistentProducts.length) {
            throw new AppError(
                `Could not find product with id ${checkInexistentProducts[0].id}`,
                404,
            );
        }

        const quantityAvailable = products.filter(
            product =>
                existsProducts.filter(p => p.id === product.id)[0].quantity <
                product.quantity,
        );

        if (quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
                404,
            );
        }

        const serializedProducts = products.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            price: existsProducts.filter(
                existsProduct => existsProduct.id === product.id,
            )[0].price,
        }));

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductsQuantity = order_products.map(product => ({
            id: product.productId,
            quantity:
                existsProducts.filter(p => p.id === product.productId)[0]
                    .quantity - product.quantity,
        }));

        await productsRepository.save(updatedProductsQuantity);

        return order;
    }
}
