import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import IUsersTokenRepository from '../IUsersTokenRepository';

class FakeUsersTokenRepository implements IUsersTokenRepository {
    private usersToken: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, { id: uuid(), token: uuid(), user_id });

        this.usersToken.push(userToken);

        return userToken;
    }
}

export default FakeUsersTokenRepository;
