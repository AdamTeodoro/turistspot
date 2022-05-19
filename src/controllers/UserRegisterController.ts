import { Response } from "express";

import { IUser } from '../interfaces/IUser';

import { UserData, userService } from "../services/UserService";
import { simpleUserService } from '../services/SimpleUserService';
import { keyService } from "../services/KeyService";

type Request = {
    body: {
        user: UserData,
        password: string
    }
}

export async function UserRegisterController(req: Request, res: Response) {
    try {
        const { password, user } = req.body;
        //create User
        const userCreated: IUser = await userService.create(user);
        await simpleUserService.create({
            id: userCreated.id,
            isActive: true
        });
        //create User Key
        await keyService.create({
            id: userCreated.id,
            email: userCreated.email,
            passwordHash: password
        });
        //send user created
        res.status(200)
        .json({ code: 'success-to-create-user', userCreated })
        .end();
        return;
    } catch(error) {
        console.log(error);
        res.status(400)
        .json({ code: 'fail-to-create-user' })
        .end();
        return;
    }
}
