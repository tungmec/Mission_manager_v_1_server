import {verifyAccessToken} from '../../utils/jwt.js';
// import jwt from 'jsonwebtoken';


export const checkAuthenticate = (req, res, next) => {
    const bearedHeader = req.headers["authorization"];
    if (!bearedHeader) {
        return res.status(401).json({
            success:false,
            msg:"No access token"
        })
    }

    const token = bearedHeader.split(" ")[1];

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        return next();
    } catch (e) {
        return res.status(401).json({
            success:false,
            msg:"Invalid token"
        })
    }
}