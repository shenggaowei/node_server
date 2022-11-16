import { createClient } from "redis";

const client = createClient();

export async function createRedis() {
  client.on("error", (err) => console.log("redis client error", err));
  await client.connect();
}

export async function setRedis(key, value) {
  await client.set(key, value);
}

export async function getRedis(key) {
  const data = await client.get(key);
  return data;
}
