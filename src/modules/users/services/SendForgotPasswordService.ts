import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/IUserRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUserRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUsersTokenRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User this not existing');
        }

        const userToken = await this.userTokensRepository.generate(user.id);

        await this.mailProvider.sendMail(
            email,
            `Pedido de recuperação de senha recebido: ${userToken.token}`,
        );
    }
}

export default SendForgotPasswordService;
