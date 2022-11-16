import { Service } from "typedi";
import { createCaptcha } from "@/utils/captcha";

@Service()
export default class CaptchaService {
  constructor() {}

  async createCaptcha() {
    return createCaptcha();
  }
}
