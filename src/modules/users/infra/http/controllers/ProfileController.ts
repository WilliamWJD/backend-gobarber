import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';

class ProfileController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, old_password, password } = req.body;
        const updateProfileService = container.resolve(UpdateProfileService);
        return null;
    }
}

export default new ProfileController();
