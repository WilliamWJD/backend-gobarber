import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

class ProfileController {
    public async show(req: Request, res: Response): Promise<Response> {
        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute({ user_id: req.user.id });

        return res.json(classToClass(user));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, old_password, password } = req.body;
        const updateProfileService = container.resolve(UpdateProfileService);

        const user = await updateProfileService.execute({
            user_id: req.user.id,
            name,
            email,
            old_password,
            password,
        });

        return res.json(classToClass(user));
    }
}

export default new ProfileController();
