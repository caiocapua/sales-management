import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import { isAuthenticated } from '../../../shared/http/middlewares/isAuthenticated';
import { ProfileController } from '../controllers/ProfileController';

const profileRouter = Router();
const profileControlle = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileControlle.show);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().optional(),
            oldPassword: Joi.string(),
            passwordConfirmation: Joi.string()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        },
    }),
    profileControlle.update,
);

export default profileRouter;
