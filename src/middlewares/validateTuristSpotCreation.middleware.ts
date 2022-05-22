import { NextFunction, Response, Request } from "express";

import { TuristSpotCreationSchema } from "../schemas/requests/TuristSpotCreation.schema";

export const validateTuristSpotCreationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("ok")
        const { error, value } = TuristSpotCreationSchema.validate(req);
        console.log(error);
        if (error) {
            res.status(400)
            .json({ code: 'invalid-request-data' })
            .end();
            return;
        } else {
            next();
            return;
        }
    } catch {
        res.status(500)
        .json({ code: 'internal-server-error' })
        .end();
        return;
    }
}
