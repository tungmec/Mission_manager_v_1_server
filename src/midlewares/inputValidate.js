import {validationResult} from 'express-validator';


export const validateRequest = (req, res, next) => {
    const faults = validationResult(req);
    
    if (!faults.isEmpty()) {
       return res.status(400).json({
            success:false,
            message: "Invalid input",
            faults: faults.array().map((fault) => {
                return {
                    location: fault.location,
                    field: fault.fields,
                    type:fault.type,
                    value: fault.value,
                    msg: fault.msg
                }
            })
       })
    }

    return next();
}