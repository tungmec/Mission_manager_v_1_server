import {body} from 'express-validator';

export const authValidator = [
    // userName check:
    body('userName')
    .exists({checkFalsy: true})
    .withMessage("userName is required")
    .bail()

    .isString()
    .withMessage("userName must be a string ")
    .bail()

    .isLength({min:3, max:50})
    .withMessage("userName must be between 3 to 50 characters")
    .bail()

    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage("userName can only contain letters, numbers and underscore")
    .bail(),
// password check:
    body('password')
    .exists({checkFalsy:true})
    .withMessage("password is rewuired")
    .bail()

    .isString()
    .withMessage("password must be a string")
    .bail()

    .isLength({min:8, max:50}) 
    .withMessage("password must be between 8 to 50 characters")
    .bail()
];

