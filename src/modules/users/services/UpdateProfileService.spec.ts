import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FaskeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeHashProvider = new FakeHashProvider();
        updateProfile = new UpdateProfileService(
            fakeUserRepository,
            fakeHashProvider,
        );
    });

    it('it should be able to update the profile', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@email.com',
        });

        expect(updatedUser.name).toBe('John Trê');
        expect(updatedUser.email).toBe('johntre@email.com');
    });

    it('should not able able to change to another user email', async () => {
        await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        });

        const user = await fakeUserRepository.create({
            name: 'Test',
            email: 'test@email.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johndoe@email.com',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('it should be able to update the password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        });

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: 'John Trê',
            email: 'johntre@email.com',
            old_password: '123456',
            password: '123123',
        });

        expect(updatedUser.password).toBe('123123');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@email.com',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await fakeUserRepository.create({
            name: 'John Doe',
            email: 'johndoe@email.com',
            password: '123456',
        });

        await expect(
            updateProfile.execute({
                user_id: user.id,
                name: 'John Trê',
                email: 'johntre@email.com',
                old_password: 'WrongOldPassword',
                password: '123123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
