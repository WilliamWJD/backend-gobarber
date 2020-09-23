import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeUsersTokenRepository from '../repositories/Fakes/FakeUsersTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FaskeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('SendResetPasswordService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUserRepository,
            fakeUsersTokenRepository,
            fakeHashProvider,
        );
    });

    it('should be able to reset the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'william',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const userToken = await fakeUsersTokenRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            token: userToken.token,
            password: '123123',
        });

        const updatedUser = await fakeUserRepository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('123123');
        expect(updatedUser?.password).toBe('123123');
    });

    it('should not be able to reset the password with non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset the password with non-existing token', async () => {
        const { token } = await fakeUsersTokenRepository.generate(
            'non-existing-user',
        );

        await expect(
            resetPasswordService.execute({
                token,
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password if passed more then 2 hours', async () => {
        const user = await fakeUserRepository.create({
            name: 'william',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const { token } = await fakeUsersTokenRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();
            return customDate.setHours(customDate.getHours() + 3);
        });

        await expect(
            resetPasswordService.execute({ password: '123123', token }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
