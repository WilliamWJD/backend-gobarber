import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProviderController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailabilityController';

const providersRoute = Router();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', ProviderController.index);

providersRoute.get(
    '/:provider_id/month-availability',
    ProviderMonthAvailability.index,
);

providersRoute.get(
    '/:provider_id/day-availability',
    ProviderDayAvailability.index,
);

export default providersRoute;
