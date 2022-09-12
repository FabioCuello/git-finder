import { RedisClient, ClientOpts } from 'redis';
import createClient from 'redis/lib/createClient';
import { REDIS_CONNECTION_STRING, REDIS_SITES_CONNECTION_STRING } from './config';
import crypto from 'crypto';
import util from 'util';

class CustomRedis extends RedisClient {
  public readonly getAsync = util.promisify(this.get).bind(this);
  public readonly setAsync = util.promisify(this.set).bind(this);
  public readonly expireAsync = util.promisify(this.expire).bind(this);
  public readonly deleteAsync = util.promisify(this.del).bind(this);

  constructor(opts: ClientOpts) {
    super(createClient.call(null, opts));
    this.connected = true;
  }

  public readonly create = async function (data: object) {
    const uuid = crypto.randomUUID();
    await this.setAsync(uuid, JSON.stringify(data));
    return uuid;
  };

  public readonly createExpire = async function (data, timeOut) {
    const uuid = crypto.randomUUID();
    await this.setAsync(uuid, JSON.stringify(data));
    if (timeOut) {
      await this.expireAsync(uuid, timeOut);
    }
    return uuid;
  };
}

const customRedisClient = new CustomRedis({
  url: REDIS_CONNECTION_STRING
});

customRedisClient.on('error', (error) => {
  customRedisClient.connected = false;
  console.error('Redis Error : ' + error);
});

const sitesRedis = new CustomRedis({
  url: REDIS_SITES_CONNECTION_STRING
});

sitesRedis.on('error', (error) => {
  customRedisClient.connected = false;
  console.error('Redis Error : ' + error);
});

export { customRedisClient, sitesRedis };
