import Redis, { Redis as RedisClient } from 'ioredis';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
    private client: RedisClient;

    constructor() {
        this.client = new Redis();
    }

    public async save(key: string, value: string): Promise<void> {
        return null;
    }

    public async invalidate(key: string): Promise<void> {
        return null;
    }

    public async recover(key: string): Promise<string> {
        return '';
    }
}

export default RedisCacheProvider;
