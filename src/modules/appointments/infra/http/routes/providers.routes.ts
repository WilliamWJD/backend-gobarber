import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';

const providersRoute = Router();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', ProviderController.index);

export default providersRoute;
