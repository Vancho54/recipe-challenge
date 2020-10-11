import jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { User } from '../../entity/User'


export const verifyUser = async (req: any) => {
    try {
        req.user = null;
        const bearerHeader = req.headers.authorization;
        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || 'secretkey');
            const user = await getRepository(User).findOne({where: {email: (<any>payload).email}, select: ['id', 'name', 'email']});
            req.user = user;
        };
    } catch (error) {
        console.log(error);
        throw error;
    };
}