import {Router} from 'express';
import { validateRequest } from '../../midlewares/inputValidate.js';
import {createMainUser, loginMainUser, loadAllMainUser} from './auth.controller.js';
import {createMainUserValidator, loginMainUserValidator} from './auth.validator.js';
import {checkAuthenticate} from './auth.midleware.js';


export const authRouter = Router();

authRouter.post('/manager/create', createMainUserValidator, validateRequest, createMainUser);
authRouter.post('/manager/login', loginMainUserValidator, validateRequest, loginMainUser);
authRouter.get('/manager/all', checkAuthenticate, loadAllMainUser);
