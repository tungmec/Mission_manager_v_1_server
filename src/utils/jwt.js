import jwt from 'jsonwebtoken';
import {myEnv} from '../config/env.js';


export const signAccessToken = (payload) => {
    return jwt.sign(payload, myEnv.jwt.jwtSecretKey, {
        expiresIn:myEnv.jwt.jwtExpiresIn
    });

}

export const verifyAccessToken = (token) => {
   return jwt.verify(token, myEnv.jwt.jwtSecretKey)
}