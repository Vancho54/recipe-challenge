import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'
import { IResolvers } from 'apollo-server-express';
import { ILogSign } from '../interfaces/interfaces';


export const userResolver: IResolvers = {

    Mutation: {
        signUp: async(_: any, { input }: ILogSign): Promise<Object> => {
            try {
                const userExist = await getRepository(User).findOne({where: {email: input.email}})
                if (userExist) {
                    throw new Error('Email taken')
                }
                const hashedPass = await bcrypt.hash(input.password, 12);
                const newUser = getRepository(User).create({... input, password: hashedPass});
                return await getRepository(User).save(newUser)
            } catch (error) {
                console.log(error);
                throw error;
            };
        },
        login: async(_:any, { input }: ILogSign): Promise<Object> => {
            try {
                const user = await getRepository(User).findOne({ email: input.email });
                if(!user) {
                    throw new Error('User not found');
                };
                const isPasswordValid = await bcrypt.compare(input.password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Invalid password');
                };
                const secret = process.env.JWT_SECRET_KEY || 'secretkey';
                const token = jwt.sign({email: user.email}, secret, {expiresIn: '30d'});
                console.log(token)
                return { token };
            } catch (error) {
                console.log(error);
                throw error;
            };
        }
    }
}