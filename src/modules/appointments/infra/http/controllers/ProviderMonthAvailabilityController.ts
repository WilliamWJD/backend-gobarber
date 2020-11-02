import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListMonthAvailabilityService from '@modules/appointments/services/ListMonthAvailabilityService';

class ProviderMonthAvailabilityController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { year, month } = req.query;
        const { provider_id } = req.params;

        const listProvidersMonthAvailability = container.resolve(
            ListMonthAvailabilityService,
        );

        const availability = await listProvidersMonthAvailability.execute({
            year: Number(year),
            month: Number(month),
            provider_id,
        });

        return res.json(availability);
    }
}

export default new ProviderMonthAvailabilityController();
