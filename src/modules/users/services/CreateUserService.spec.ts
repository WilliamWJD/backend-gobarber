import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FaskeHashProvider';
import CreateUserService from './CreateUsersService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();

        createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('should be able to create a new user', async () => {
        const user = await createUserService.execute({
            name: 'william',
            email: 'william@william.com.br',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email from another', async () => {
        createUserService = new CreateUserService(
            fakeUserRepository,
            fakeHashProvider,
        );

        await createUserService.execute({
            name: 'william',
            email: 'william@william.com.br',
            password: '123456',
        });

        await expect(
            createUserService.execute({
                name: 'william',
                email: 'william@william.com.br',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
