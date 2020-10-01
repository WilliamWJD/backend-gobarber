import { Router } from 'express';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRoute = Router();

profileRoute.use(ensureAuthenticated);

profileRoute.put('/', ProfileController.create);
profileRoute.get('/', ProfileController.show);

export default profileRoute;
