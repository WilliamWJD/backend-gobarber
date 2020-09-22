import AppError from '@shared/errors/AppError';

import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUserRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UserProvider')
        private userRepository: IUserRepository,

        @inject('UserTokensRepository')
        private usersTokensRepository: IUsersTokenRepository,
    ) { }

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists');
        }

        const user = await this.userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists');
        }

        user.password = password;

        await this.userRepository.save(user);
    }
}

export default ResetPasswordService;
