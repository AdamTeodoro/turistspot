import { NextFunction, Response } from "express";

import { LoginSchema } from "../schemas/requests/Login.schema";

type Request = {
    body: {
        email: string,
        password: string,
    }
}

export const validateLoginMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try { console.log("LoginSchema.validate(req).error", LoginSchema.validate(req).error)
        if (LoginSchema.validate(req).error) {
            res.status(400)
            .json({ code: 'invalid-request-data' })
            .end();
            return;
        }
        next();
        return;
    } catch(error) {
        console.log("validateLoginMiddleware: ", error);
        res.status(500)
        .json({ code: 'internal-server-error' })
        .end();
        return;
    }
}
