import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRoute = Router();

profileRoute.use(ensureAuthenticated);

profileRoute.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
        },
    }),
    ProfileController.create,
);
profileRoute.get('/', ProfileController.show);

export default profileRoute;
