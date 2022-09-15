import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService';
import { ListProductService } from '../services/ListProductService';
import { RemoveProductService } from '../services/RemoveProductService';
import { ShowProductService } from '../services/ShowProductService';
import { UpdateProductService } from '../services/UpdateProductService';

export default class ProductsController {
    async list(request: Request, response: Response): Promise<Response> {
        const listProductsService = new ListProductService();

        const produts = await listProductsService.execute();

        return response.json(produts);
    }

    async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProductService = new ShowProductService();

        const product = await showProductService.execute(id);

        return response.json(product);
    }

    async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;

        const createProductService = new CreateProductService();

        const product = await createProductService.execute({
            name,
            price,
            quantity,
        });

        return response.json(product);
    }

    async remove(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const removeProductService = new RemoveProductService();

        await removeProductService.execute(id);

        return response.json([]);
    }

    async update(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, price, quantity } = request.body;

        const updateProductService = new UpdateProductService();

        const product = await updateProductService.execute({
            id,
            name,
            price,
            quantity,
        });

        return response.json(product);
    }
}
