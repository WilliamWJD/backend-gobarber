import FakeUserRepository from '@modules/users/repositories/Fakes/FakeUsersRepository';
import ListProvidersServices from './ListProvidersServices';

let listProviders: ListProvidersServices;
let fakeUsersRepository: FakeUserRepository;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUserRepository();
        listProviders = new ListProvidersServices(fakeUsersRepository);
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'william',
            email: 'william@william.com.br',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John tre',
            email: 'johntre@email.com.br',
            password: '123456',
        });

        const loggedUser = await fakeUsersRepository.create({
            name: 'John Qua',
            email: 'johnqua@email.com.br',
            password: '123456',
        });

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([user1, user2]);
    });
});
