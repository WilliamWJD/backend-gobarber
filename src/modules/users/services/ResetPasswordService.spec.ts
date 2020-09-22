// import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/Fakes/FakeUsersTokenRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();

        resetPasswordService = new ResetPasswordService(
            fakeUserRepository,
            fakeUsersTokenRepository,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'william',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userToken = await fakeUsersTokenRepository.generate(user.id);

        await resetPasswordService.execute({
            token: userToken.token,
            password: '123123',
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(updatedUser?.password).toBe('123123');
    });
});
