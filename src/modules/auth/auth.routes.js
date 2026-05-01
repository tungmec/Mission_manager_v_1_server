import {Router} from 'express';
import { validateRequest } from '../../midlewares/inputValidate.js';
import {createMainUser, loginMainUser, loadAllMainUser, loadMe, loginSubUser} from './auth.controller.js';
import {authValidator} from './auth.validator.js';
import {checkAuthenticate} from './auth.midleware.js';


export const authRouter = Router();

authRouter.post('/manager/create', authValidator, validateRequest, createMainUser);
authRouter.post('/manager/login', authValidator, validateRequest, loginMainUser);
authRouter.post('/sub/login', authValidator, validateRequest, loginSubUser);
authRouter.get('/manager/all', checkAuthenticate, loadAllMainUser);
authRouter.get('/me', checkAuthenticate, loadMe);
