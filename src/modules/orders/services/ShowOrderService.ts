import { AppError } from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { Order } from '../entities/Order';
import { OrdersRepository } from '../repositories/OrdersRepository';

interface IRequest {
    id: string;
}

export class ShowOrderService {
    async execute({ id }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.findById(id);

        if (!order) {
            throw new AppError(`Order ${id} not found`, 404);
        }

        return order;
    }
}
