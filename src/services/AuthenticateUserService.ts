import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from '../repositories/UsersRepositories';
interface IAuthenticateRequest
{
    email: string;
    password: string;
}

class AuthenticateUserService
{
    async execute({ email, password }: IAuthenticateRequest)
    {
        const usersRepository = getCustomRepository(UsersRepositories);

        const user = await usersRepository.findOne({
            email
        });

        if (!user)
        {
            throw new Error("Email e/ou senha incorreto(s)!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch)
        {
            throw new Error("Email e/ou senha incorreto(s)!");
        }

        /**
         * fabricionodenlwvaloriza
         * dabc5252413e70830a8844c7517e3559
         */

        return sign({
            email: user.email
        }, 'dabc5252413e70830a8844c7517e3559', {
            subject: user.id,
            expiresIn: '1d'
        });
    }
}

export { AuthenticateUserService }