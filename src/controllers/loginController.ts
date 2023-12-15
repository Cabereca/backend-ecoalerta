/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type Request, type Response } from 'express';
import { NotFoundError, UnauthorizedError } from '../helpers/api-errors';
import bcrypt from 'bcrypt';
import client from '../database/redis';
import { userServices } from '../services/userService';

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    let user;

    const cache = await client.get(email);
    if (cache) {
        user = JSON.parse(cache);
    } else {
        user = await userServices.findUserByEmail(email);
        if (!user) {
            throw new NotFoundError('User not Found');
        }
        await client.set(email, JSON.stringify(user));
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
        throw new UnauthorizedError('Usuário ou senha incorretos');
    }
    const token = userServices.generateToken({ email: user.email });
    const { password: _, ...userWithoutPassword } = user;

    return res.send({
        user: {
            ...userWithoutPassword
        },
        token
    });
};

export { login };