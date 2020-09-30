import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/Fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUserRepository();
        fakeStorageProvider = new FakeStorageProvider();

        updateUserAvatar = new UpdateUserAvatarService(
            fakeUserRepository,
            fakeStorageProvider,
        );
    });

    it('should be able to update avatar this user', async () => {
        const user = await fakeUserRepository.create({
            name: 'william',
            email: 'william@william.com.br',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatar_filename: 'avatar.jpg',
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar from non existing user', async () => {
        expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatar_filename: 'avatar.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const user = await fakeUserRepository.create({
            name: 'william',
            email: 'william@william.com.br',
            password: '123456',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatar_filename: 'avatar.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.id,
            avatar_filename: 'avatar2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
});
