import axios from "axios";

export async function GET<R, P>(url: string, params?: P): Promise<R>;
export async function GET<R, P>(url: string, params: P): Promise<R> {
  const data = await axios.get(url, params);
  return data?.data?.data;
}

export async function POST<R, P>(url: string, params?: P): Promise<R>;
export async function POST<R, P>(url: string, params: P): Promise<R> {
  const data = await axios.post(url, params);
  return data?.data?.data;
}

export async function REQUEST<R, P>(
  url: string,
  method: string,
  params?: P,
  data?: P
): Promise<R> {
  const ret = await axios[method](url, { params, data });
  return ret.data;
}
