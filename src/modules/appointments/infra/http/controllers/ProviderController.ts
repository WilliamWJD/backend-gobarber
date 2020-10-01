import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProvidersServices from '@modules/appointments/services/ListProvidersServices';

class ProviderController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listProviders = container.resolve(ListProvidersServices);
        const providers = await listProviders.execute({ user_id: req.user.id });
        return res.json(providers);
    }
}

export default new ProviderController();
