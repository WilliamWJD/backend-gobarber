import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

class ProviderDayAvailabilityController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { day, month, year } = req.query;
        const { provider_id } = req.params;

        const listProvidersDayAvailability = container.resolve(
            ListDayAvailabilityService,
        );

        const availability = await listProvidersDayAvailability.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            provider_id,
        });

        return res.json(availability);
    }
}

export default new ProviderDayAvailabilityController();
