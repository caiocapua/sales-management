import { AppError } from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { UserTokenRepository } from '../repositories/UserTokenRepository';
import { EtherealMail } from '@config/mail/EtherealMail';

interface IRequest {
    email: string;
}

export class SendForgotPasswordEmailService {
    async execute({ email }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const user = await usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exists', 400);
        }

        const { token } = await userTokenRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            '..',
            'views',
            'forgot_password.hbs',
        );

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[API Vendas] Recuperacao de Senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`,
                },
            },
        });
    }
}
