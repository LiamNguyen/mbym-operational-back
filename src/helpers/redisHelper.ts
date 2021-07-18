import redis from 'redis';
const client = redis.createClient();

export const saveJWT = (key:string, value:string) => {
  client.set(key, value, redis.print);
};
export const getJWT = (key: string) => {
  return client.get(key, redis.print);
};
