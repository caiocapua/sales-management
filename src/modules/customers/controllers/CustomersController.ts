import { Request, Response } from 'express';
import { CreateCustomerService } from '../services/CreateCustomerService';
import { ListCustomersService } from '../services/listCustomersService';
import { RemoveCustomerService } from '../services/RemoveCustomerService';
import { ShowCustomerService } from '../services/ShowCustomerService';
import { UpdateCustomerService } from '../services/UpdateCustomerService';

export default class CustomersController {
    async list(request: Request, response: Response): Promise<Response> {
        const listCustomersService = new ListCustomersService();

        const customers = await listCustomersService.execute();

        return response.json(customers);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCustomerService = new ShowCustomerService();

        const product = await showCustomerService.execute({ id });

        return response.json(product);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, email } = request.body;

        const createCustomerService = new CreateCustomerService();

        const customer = await createCustomerService.execute({
            name,
            email,
        });

        return response.json(customer);
    }

    async remove(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeCustomerService = new RemoveCustomerService();

        await removeCustomerService.execute(id);

        return response.json([]);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, email } = request.body;

        const updateCustomerService = new UpdateCustomerService();

        const customer = await updateCustomerService.execute({
            id,
            name,
            email,
        });

        return response.json(customer);
    }
}
