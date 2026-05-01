import { Router } from "express";
import {checkAuthenticate} from '../auth/auth.midleware.js';
import {getAllSubBymanagerId, getAllRoleByManagerId, createNewSubUser, createNewRole} from './managerUser.controller.js';


export const managerUserRouter = Router();

managerUserRouter.get('/getallsub', checkAuthenticate, getAllSubBymanagerId);
managerUserRouter.get('/getallroles', checkAuthenticate, getAllRoleByManagerId);
managerUserRouter.post('/createsub', checkAuthenticate, createNewSubUser);
managerUserRouter.post('/createrole', checkAuthenticate, createNewRole);