import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordService from '@modules/users/services/SendForgotPasswordService';

class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const sendForgotPasswordService = container.resolve(
            SendForgotPasswordService,
        );

        await sendForgotPasswordService.execute({ email });

        return res.status(204).json();
    }
}

export default new ForgotPasswordController();
