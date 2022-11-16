import CaptchaService from "@/service/captcha";
import { setRedis } from "@/utils/redis";
import {
  JsonController,
  Get,
  Params,
  ContentType,
  Body,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";

@JsonController("/common")
@Service()
export default class captchaController {
  constructor(private captchaService: CaptchaService) {}

  @Get("/get-captcha")
  @ContentType("image/svg+xml")
  async createCaptcha(@QueryParam("uuid") uuid: string) {
    const { data, text } = await this.captchaService.createCaptcha();
    setRedis(uuid, text);
    return data;
  }
}
