import { Request, Response } from 'express';
import { CreateOrderService } from '../services/CreateOrderService';
import { ShowOrderService } from '../services/ShowOrderService';

export class OrdersController {
    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showOrderService = new ShowOrderService();

        const order = await showOrderService.execute({ id });

        return response.json(order);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { customerId, products } = request.body;

        const createOrderService = new CreateOrderService();

        const order = await createOrderService.execute({
            customerId,
            products,
        });

        return response.json(order);
    }
}
