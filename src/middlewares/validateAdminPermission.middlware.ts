import { Response, NextFunction } from "express";
import { rmSync } from "fs";

import jwt from "jsonwebtoken";

import { permissionService } from "../services/PermissionService";
import { UserData } from "../services/UserService";

type Request = {
    query: {
        authorization: string,
        idPermission: number,
    }
    body: {
        user: UserData,
        password: string
    }
}

export const validateAdminPermission = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization, idPermission } = req.query;
        //get permission
        const permission = await permissionService.getById(idPermission);
        //verify with jwt if authorization is valid
        if (permission) {
            //validate expiration time from permission
            if (Date.now() > permission.expiration.getTime()) {
                //update permission status
                await permission.update({ isActive: false });
                res.status(401)
                .json({ code: 'permission-expired' })
                .end();
                return;
            }
            //verify if authorization is valid
            jwt.verify(
                authorization,
                permission.token,
                async (error, decoded) => {
                    if (error) {
                        res.status(400)
                        .json({ code: 'invalid-authorization'})
                        .end();
                        return;
                    }
                    //inactive permission if valid
                    await permission.update({ isActive: false });
                    next();
                    return;
                }
            );
        } else {
            res.status(400)
            .json({ code: 'invalid-permission' })
            .end();
            return;
        }
    } catch {
        res.status(400)
        .json({ code: 'invalid-credencials' })
        .end();
        return;
    }
}
