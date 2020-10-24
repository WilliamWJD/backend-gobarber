import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { provider_id, date } = req.body;

        const createAppointment = container.resolve(CreateAppointmentService);

        const appointment = await createAppointment.execute({
            date,
            provider_id,
            user_id: req.user.id,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
