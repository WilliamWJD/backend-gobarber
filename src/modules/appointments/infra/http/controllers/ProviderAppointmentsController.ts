import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

class ProviderAppointmentsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const { day, month, year } = req.query;
        const provider_id = req.user.id;

        const listProviderAppointments = container.resolve(
            ListProviderAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            provider_id,
        });

        return res.json(classToClass(appointments));
    }
}

export default new ProviderAppointmentsController();
