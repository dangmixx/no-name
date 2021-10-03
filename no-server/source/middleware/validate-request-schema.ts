import { NextFunction, Response, Request } from "express";
import { validationResult } from 'express-validator';
export function validateRequestSchema(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array().map(message => {
                return {
                    message: message.msg,
                    Param: message.param
                }
            })
        })
    }
    next();
}
