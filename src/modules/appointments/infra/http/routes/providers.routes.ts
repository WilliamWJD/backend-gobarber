import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProviderController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailabilityController';

const providersRoute = Router();

providersRoute.use(ensureAuthenticated);

providersRoute.get('/', ProviderController.index);

providersRoute.get(
    '/:provider_id/month-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    ProviderMonthAvailability.index,
);

providersRoute.get(
    '/:provider_id/day-availability',
    celebrate({
        [Segments.PARAMS]: {
            provider_id: Joi.string().uuid().required(),
        },
    }),
    ProviderDayAvailability.index,
);

export default providersRoute;
