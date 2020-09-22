import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersTokenRepository from '../repositories/Fakes/FakeUsersTokenRepository';
import SendForgotPassword from './SendForgotPasswordService';
import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPassword: SendForgotPassword;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeMailProvider = new FakeMailProvider();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();

        sendForgotPassword = new SendForgotPassword(
            fakeUserRepository,
            fakeMailProvider,
            fakeUsersTokenRepository,
        );
    });

    it('should be able to recover the password using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
        await fakeUserRepository.create({
            name: 'william',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendForgotPassword.execute({
            email: 'johndoe@example.com',
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
        await expect(
            sendForgotPassword.execute({
                email: 'johndoe@example.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await sendForgotPassword.execute({
            email: 'johndoe@example.com',
        });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
