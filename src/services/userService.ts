/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { type IUser } from '../dtos/UserDTO';
import { BadRequestError, InternalServerError } from '../helpers/api-errors';
import jwt from 'jsonwebtoken';
import { hash } from 'bcrypt';
import { prisma } from '../database/prisma';

interface TokenType { id: string }

const hashPassword = async (password: string) => {
    return await hash(password, 10);
};

const generateToken = ({ id }: TokenType) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET ?? '', {
        expiresIn: '8h'
    });
    return token;
};

const findUserById = async (id: string) => {
    if (!id) throw new BadRequestError('Id is required');
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
}

const findUserByEmail = async (email: string) => {
    if (!email) throw new BadRequestError('Email is required');
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
}

const showAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            cpf: true,
            name: true,
            email: true,
            phone: true
        }
    })
        return users;
}

const findUser = async (id: string) => {
    const user = await findUserById(id);
    if (!user) throw new BadRequestError('User not found');
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

const createUser = async (user: IUser) => {
    const userExists = await findUserByEmail(user.email);
    if (userExists) throw new BadRequestError('User already exists');
    const hashedPassword = await hashPassword(user.password);
    const newUser = await prisma.user.create({
        data: {
            cpf: user.cpf,
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: hashedPassword
        }
    });
    if (!newUser) throw new InternalServerError('Error creating user');
    const { password, ...userWithoutPassword } = newUser;
    const token = generateToken({ id: user.id });
    return { user: { ...userWithoutPassword }, token };
};

const updateUser = async (id: string, userData: Partial<IUser>) => {
    const user = await findUserById(id);
    if (!user) throw new BadRequestError('User not found');
    const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            cpf: userData.cpf,
            name: userData.name,
            email: userData.email,
            phone: userData.phone
        }
    });
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
};

const deleteUser = async (id: string) => {
    const user = await findUserById(id);
    if (!user) throw new BadRequestError('User not found');
    await prisma.user.delete({ where: { id } });
};

export const userServices = { findUser, showAllUsers, createUser, updateUser, deleteUser, generateToken }