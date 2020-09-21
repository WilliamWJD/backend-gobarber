import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';

import AuthenticateUserService from './AuthenticateUserService';
import FakeUserRepository from '../repositories/Fakes/IUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FaskeHashProvider';
import CreateUserService from './CreateUsersService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersRepository = new FakeUserRepository();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        const user = await createUser.execute({
            name: 'William',
            email: 'william@william.com.br',
            password: '123456',
        });

        const response = await authenticateUserService.execute({
            email: 'william@william.com.br',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
});
