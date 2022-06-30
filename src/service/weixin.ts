import { REQUEST } from "@/helpers/fetch";
import { code2Session } from "@/helpers/api";

interface ICode2SessionParams {
  appid: string;
  secret: string;
  js_code: string;
  grant_type: string;
}

interface ICode2SessionRes {
  openid: string;
  session_key: string;
  unionid: string;
  errcode: -1 | 0 | 40029 | 45011 | 20226;
  errmsg: string;
}

export const getWexinSession = async (params: ICode2SessionParams) => {
  const ret = await REQUEST<ICode2SessionRes, ICode2SessionParams>(
    code2Session,
    "get",
    params
  );
  return ret;
};
