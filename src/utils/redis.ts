import { createClient } from "redis";

const client = createClient();

export async function createRedis() {
  client.on("error", (err) => console.log("redis client error", err));
  await client.connect();
}

// 设置 redis 缓存。缓存有效期 60秒
export async function setRedis(key, value) {
  await client.set(key, value, {
    EX: 60,
  });
}

export async function getRedis(key) {
  const data = await client.get(key);
  return data;
}
